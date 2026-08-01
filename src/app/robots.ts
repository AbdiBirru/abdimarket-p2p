import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL ?? "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/my-listings", "/saved", "/sell", "/admin", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
