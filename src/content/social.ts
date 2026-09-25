export const social = [
  { url: "mailto:hello@example.com", name: "mail" },
  { url: "https://github.com/placeholder", name: "github" },
  { url: "https://www.linkedin.com/in/placeholder", name: "linkedin" },
  { url: "https://x.com/placeholder", name: "x" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
