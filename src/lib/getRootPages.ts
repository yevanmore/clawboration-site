import type { AllContent } from "../types/content";
import { getCollection } from "astro:content";

function getEntrySlug(entry: AllContent) {
  if (entry.collection === "directory") {
    return `${entry.data.section}/${entry.id}`;
  }

  return entry.id;
}

export async function getRootPages(remapIndex: boolean = true) {
  const allListings = await getCollection("directory");
  const allPages = await getCollection("pages");

  // Combine listings and pages
  const combinedEntries: Array<AllContent> = allListings.concat(allPages as never);

  // Return paths based on slugs
  return combinedEntries.map((entry) => {
    let mySlug: string = getEntrySlug(entry);

    if (mySlug === "index" && remapIndex) {
      mySlug = "/";
    }

    return {
      params: { slug: mySlug },
      props: { entry },
    };
  });
}
