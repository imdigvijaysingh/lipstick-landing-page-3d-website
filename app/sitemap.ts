import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://maisonrouge.example", lastModified: new Date(), priority: 1 },
    { url: "https://maisonrouge.example/shop", lastModified: new Date(), priority: 0.8 },
  ];
}
