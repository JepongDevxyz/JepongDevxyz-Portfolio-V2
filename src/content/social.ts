export const social = [
  { url: "mailto:businessdevgithubjepong@gmail.com", name: "mail" },
  { url: "https://github.com/JepongDevxyz", name: "github" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
