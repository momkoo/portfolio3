# Next.js + Prisma + Supabase + Netlify 배포 가이드

> 이 가이드는 Next.js 15+ 프로젝트를 Netlify에 배포할 때 발생하는 일반적인 문제와 해결책을 정리한 문서입니다.

---

## 목차

1. [Netlify 환경변수 설정 (필수!)](#netlify-환경변수-설정-필수)
2. [사전 체크리스트](#사전-체크리스트)
3. [netlify.toml 설정](#netlifytom-설정)
4. [Next.js 15+ 필수 변경사항](#nextjs-15-필수-변경사항)
5. [TypeScript 엄격 모드 대응](#typescript-엄격-모드-대응)
6. [Prisma 설정](#prisma-설정)
7. [Supabase 연결](#supabase-연결)
8. [일반적인 오류와 해결책](#일반적인-오류와-해결책)
9. [배포 체크리스트](#배포-체크리스트)

---

## Netlify 환경변수 설정 (필수!)

> ⚠️ **중요:** 환경변수를 설정하지 않으면 500 Server Error 발생!

### 설정 방법

1. **Netlify Dashboard** 접속
2. 해당 사이트 선택
3. **Site configuration** (또는 Site settings) 클릭
4. 좌측 메뉴에서 **Environment variables** 클릭
5. **Add a variable** 버튼으로 아래 변수들 추가

### 필수 환경변수 목록

아래 **4개 변수는 반드시 설정**해야 합니다:

| Key | Value | 설명 |
|-----|-------|------|
| `DATABASE_URL` | `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true` | Supabase Transaction Pooler 연결 문자열 |
| `DIRECT_URL` | `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres` | Supabase Direct 연결 문자열 |
| `NEXTAUTH_URL` | `https://your-site.netlify.app` | 배포된 사이트의 전체 URL |
| `NEXTAUTH_SECRET` | `K7gNx2Qm9pLwYv...` (32자 이상) | 랜덤 시크릿 키 |

### NEXTAUTH_SECRET 생성 방법

터미널에서 실행:
```bash
openssl rand -base64 32
```

또는 온라인 생성기: https://generate-secret.vercel.app/32

### Supabase 연결 문자열 가져오기

1. **Supabase Dashboard** → 프로젝트 선택
2. **Settings** → **Database**
3. **Connection string** 섹션
4. **URI** 탭 선택
5. 복사할 것:
   - **Transaction pooler** (Port 6543) → `DATABASE_URL`
   - **Session pooler** 또는 **Direct** (Port 5432) → `DIRECT_URL`

### 환경변수 설정 화면 예시

```
┌─────────────────────────────────────────────────────────────┐
│  Environment variables                                       │
├─────────────────────────────────────────────────────────────┤
│  Key                  │ Value                                │
├───────────────────────┼─────────────────────────────────────┤
│  DATABASE_URL         │ postgresql://postgres.abc...         │
│  DIRECT_URL           │ postgresql://postgres.abc...         │
│  NEXTAUTH_URL         │ https://mysite.netlify.app           │
│  NEXTAUTH_SECRET      │ K7gNx2Qm9pLwYvZ8BfTc...              │
└───────────────────────┴─────────────────────────────────────┘
```

### 선택적 환경변수 (Supabase Storage 사용시)

| Key | Value | 설명 |
|-----|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[PROJECT-REF].supabase.co` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1...` | Supabase 익명 키 |

### 설정 후 재배포

환경변수 추가/수정 후 반드시:

1. **Deploys** 탭으로 이동
2. **Trigger deploy** 클릭
3. **Clear cache and deploy** 선택

---

## 사전 체크리스트

배포 전 반드시 확인:

- [ ] Node.js 20 이상 사용
- [ ] Next.js 15+ API Route params를 Promise로 변경
- [ ] 모든 변수에 명시적 TypeScript 타입 지정
- [ ] Prisma 타입 import 확인
- [ ] 환경변수 설정 완료

---

## netlify.toml 설정

프로젝트 루트에 `netlify.toml` 파일 생성:

```toml
[build]
  command = "npx prisma generate && npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  # 중요: Node.js 20 이상 필수 (Next.js 15+ 요구사항)
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 주요 포인트:
- `NODE_VERSION = "20"`: Next.js 15+는 Node.js 20.9.0 이상 필요
- `npx prisma generate`: 빌드 전 Prisma 클라이언트 생성 필수
- `@netlify/plugin-nextjs`: Next.js 전용 플러그인

---

## Next.js 15+ 필수 변경사항

### API Route Handler의 params 변경

Next.js 15부터 `params`가 **Promise**로 변경됨.

#### ❌ 잘못된 코드 (Next.js 14 이하)
```typescript
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id; // 직접 접근
}
```

#### ✅ 올바른 코드 (Next.js 15+)
```typescript
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Promise await 필수
}
```

### Page 컴포넌트의 params 변경

#### ❌ 잘못된 코드
```typescript
export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(`/api/items/${params.id}`);
}
```

#### ✅ 올바른 코드
```typescript
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetch(`/api/items/${id}`);
}
```

---

## TypeScript 엄격 모드 대응

Netlify 빌드는 TypeScript 엄격 모드로 실행됨. 암시적 `any` 타입 불가.

### 배열 변수 선언

#### ❌ 잘못된 코드
```typescript
let items = []; // Error: implicitly has type 'any[]'
let error = null;
```

#### ✅ 올바른 코드
```typescript
import { Item } from '@prisma/client';

let items: Item[] = [];
let error: string | null = null;
```

### 관계가 포함된 타입

```typescript
import { Project, Category } from '@prisma/client';

// 관계를 포함한 커스텀 타입 정의
type ProjectWithCategory = Project & { category: Category | null };

let projects: ProjectWithCategory[] = [];
```

### map 콜백에서 any 제거

#### ❌ 잘못된 코드
```typescript
{items.map((item: any) => (
  <div key={item.id}>{item.name}</div>
))}
```

#### ✅ 올바른 코드
```typescript
// 배열에 타입이 지정되어 있으면 자동 추론됨
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

---

## Prisma 설정

### schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Prisma 클라이언트 싱글톤 (src/lib/prisma.ts)

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

### 타입 Import 패턴

```typescript
// 모델 타입 import
import { PrismaClient, Project, Category, Journal } from '@prisma/client';

// 또는 Prisma namespace 사용
import { Prisma } from '@prisma/client';
type ProjectWithCategory = Prisma.ProjectGetPayload<{
  include: { category: true }
}>;
```

---

## 환경변수 설정

### 필수 환경변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DATABASE_URL` | Supabase Transaction Pooler | `postgresql://postgres.[ref]:[pw]@...pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Supabase Direct Connection | `postgresql://postgres.[ref]:[pw]@...pooler.supabase.com:5432/postgres` |
| `NEXTAUTH_URL` | 사이트 URL | `https://your-site.netlify.app` |
| `NEXTAUTH_SECRET` | 랜덤 시크릿 키 | `openssl rand -base64 32`로 생성 |

### Supabase 전용 (선택)

| 변수명 | 설명 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 |

### 로컬 vs 프로덕션

```bash
# .env.local (로컬 개발용 - Git에 포함 안됨)
DATABASE_URL="prisma+postgres://localhost:51213/..."  # 로컬 Prisma

# Netlify 환경변수 (프로덕션용)
DATABASE_URL="postgresql://postgres.[ref]:[pw]@...supabase.com:6543/postgres"
```

---

## Supabase 연결

### 1. Connection String 가져오기

1. Supabase Dashboard 접속
2. Settings → Database
3. Connection string 섹션

### 2. 올바른 연결 문자열 선택

| 용도 | 포트 | 환경변수 |
|------|------|----------|
| Transaction Pooler (권장) | 6543 | `DATABASE_URL` |
| Session Pooler | 5432 | `DIRECT_URL` |
| Direct Connection | 5432 | 마이그레이션용 |

### 3. 연결 문자열 형식

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 4. 비밀번호 특수문자 인코딩

비밀번호에 특수문자가 있으면 URL 인코딩 필요:

| 문자 | 인코딩 |
|------|--------|
| `@` | `%40` |
| `#` | `%23` |
| `!` | `%21` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `/` | `%2F` |
| `=` | `%3D` |
| `?` | `%3F` |

예: `p@ssw0rd!` → `p%40ssw0rd%21`

---

## 일반적인 오류와 해결책

### 오류 1: Node.js version 에러

```
You are using Node.js 18.x. For Next.js, Node.js version ">=20.9.0" is required.
```

**해결:** `netlify.toml`에서 `NODE_VERSION = "20"` 설정

---

### 오류 2: params 타입 에러

```
Type '{ params: Promise<{ id: string }> }' is not assignable to type '{ params: { id: string } }'
```

**해결:** params를 Promise로 변경하고 await

```typescript
// Before
{ params }: { params: { id: string } }
params.id

// After
{ params }: { params: Promise<{ id: string }> }
const { id } = await params;
```

---

### 오류 3: 암시적 any 타입 에러

```
Variable 'items' implicitly has type 'any[]'
```

**해결:** 명시적 타입 추가

```typescript
import { Item } from '@prisma/client';
let items: Item[] = [];
```

---

### 오류 4: 500 Server Error (런타임)

**가능한 원인:**
1. 환경변수 미설정
2. 데이터베이스 연결 실패
3. Supabase 프로젝트 일시정지됨

**해결:**
1. Netlify Dashboard → Site settings → Environment variables 확인
2. Supabase Dashboard에서 프로젝트 상태 확인
3. 연결 문자열 형식 확인
4. Netlify Functions 로그 확인

---

### 오류 5: Prisma Client 생성 실패

```
Prisma has detected that this project was built on Vercel/Netlify...
```

**해결:** `netlify.toml` 빌드 명령에 `npx prisma generate` 추가

```toml
command = "npx prisma generate && npm run build"
```

---

## 배포 체크리스트

### 코드 준비

- [ ] `netlify.toml` 파일 생성 및 설정
- [ ] `NODE_VERSION = "20"` 설정
- [ ] 모든 API Route의 params를 Promise로 변경
- [ ] 모든 Page 컴포넌트의 params를 Promise로 변경
- [ ] 모든 변수에 명시적 TypeScript 타입 지정
- [ ] Prisma 타입 import 확인
- [ ] `npx prisma generate` 빌드 명령에 포함

### 환경변수 (Netlify Dashboard)

- [ ] `DATABASE_URL` 설정 (Supabase Transaction Pooler)
- [ ] `DIRECT_URL` 설정 (Supabase Direct)
- [ ] `NEXTAUTH_URL` 설정 (배포된 사이트 URL)
- [ ] `NEXTAUTH_SECRET` 설정 (32자 이상 랜덤 문자열)

### 배포 후

- [ ] Clear cache and deploy 실행
- [ ] 메인 페이지 접속 테스트
- [ ] API 엔드포인트 테스트
- [ ] 관리자 로그인 테스트

---

## 빠른 참조: 파일별 수정 패턴

### API Route (src/app/api/[resource]/[id]/route.ts)

```typescript
import { NextResponse } from 'next/server';
import { PrismaClient, ModelName } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const item = await prisma.modelName.findUnique({
      where: { id },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Page 컴포넌트 (src/app/[resource]/[id]/page.tsx)

```typescript
import { PrismaClient, ModelName } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  let item: ModelName | null = null;
  let error: string | null = null;

  try {
    item = await prisma.modelName.findUnique({
      where: { id },
    });
  } catch (e) {
    error = 'Failed to fetch';
  }

  // ... render
}
```

### 리스트 페이지 (src/app/admin/[resource]/page.tsx)

```typescript
import { PrismaClient, ModelName } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function ListPage() {
  let items: ModelName[] = [];
  let error: string | null = null;

  try {
    items = await prisma.modelName.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    error = 'Failed to fetch';
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

---

## 문서 버전

- **작성일:** 2026-01-02
- **Next.js 버전:** 15+
- **Prisma 버전:** 5+
- **Node.js 버전:** 20+

---

> 이 가이드를 따라 설정하면 Netlify 배포 시 발생하는 대부분의 문제를 사전에 방지할 수 있습니다.
