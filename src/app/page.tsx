import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import {
  HeroSection,
  MarqueeSection,
  WorkSection,
  AboutSection,
  JournalSection,
  LocationSection,
  ContactSection,
} from "@/components";
import { Project, Category, Journal } from "@prisma/client";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

type ProjectWithCategory = Project & { category: Category | null };

// Cached database queries
const getProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      orderBy: { order: 'asc' },
      include: { category: true },
    });
  },
  ['projects'],
  { revalidate: 60, tags: ['projects'] }
);

const getJournals = unstable_cache(
  async () => {
    return prisma.journal.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  },
  ['journals'],
  { revalidate: 60, tags: ['journals'] }
);

export default async function Home() {
  let projects: ProjectWithCategory[] = [];
  let journals: Journal[] = [];
  let dbError = false;

  try {
    // Fetch with caching
    [projects, journals] = await Promise.all([
      getProjects(),
      getJournals(),
    ]);
  } catch (error) {
    console.error("Database connection error:", error);
    dbError = true;
  }

  if (dbError) {
    return (
      <>
        <HeroSection />
        <MarqueeSection />
        <section className="py-20 text-center">
          <p className="text-gray-500">Unable to load content. Please try again later.</p>
        </section>
        <AboutSection />
        <LocationSection />
        <ContactSection />
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      {/* Work Section with Dynamic Data */}
      <WorkSection projects={projects} />
      <AboutSection />
      {/* Journal Section with Dynamic Data */}
      <JournalSection journals={journals} />
      <LocationSection />
      <ContactSection />
    </>
  );
}
