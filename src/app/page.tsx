import { prisma } from "@/lib/prisma";
import {
  HeroSection,
  MarqueeSection,
  WorkSection,
  AboutSection,
  JournalSection,
  ContactSection,
} from "@/components";
import { Project, Category, Journal } from "@prisma/client";

// Ensure the page updates when data changes in Admin
export const dynamic = 'force-dynamic';

type ProjectWithCategory = Project & { category: Category | null };

export default async function Home() {
  let projects: ProjectWithCategory[] = [];
  let journals: Journal[] = [];
  let dbError = false;

  try {
    // Fetch Projects with Category
    projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
      include: {
        category: true,
      },
    });

    // Fetch Journals
    journals = await prisma.journal.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
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
        <ContactSection />
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <WorkSection projects={projects} />
      <AboutSection />
      <JournalSection journals={journals} />
      <ContactSection />
    </>
  );
}
