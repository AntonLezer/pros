import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Центр Плоскирів — Стоматологія у Хмельницькому",
    short_name: "Плоскирів",
    description:
      "Стоматологічна клініка «Центр Плоскирів» у Хмельницькому: лікування, імплантація, брекети, відбілювання, дитяча стоматологія.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#E07B39",
    lang: "uk-UA",
    icons: [
      {
        src: "/logo/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["medical", "health", "lifestyle"],
  };
}
