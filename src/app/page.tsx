import { prisma } from "@/lib/prisma";
import {
  HeroSection,
  MarqueeSection,
  WorkSection,
  AboutSection,
  JournalSection,
  ContactSection,
} from "@/components";

// Ensure the page updates when data changes in Admin
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch Projects with Category
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: {
      category: true,
    },
  });

  // Fetch Journals
  const journals = await prisma.journal.findMany({
    orderBy: { createdAt: 'desc' }, // Sort by creation or date string if preferred
    take: 3, // Show only latest 3 in home
  });

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
