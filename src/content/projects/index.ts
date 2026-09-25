import type { Locale } from "../../i18n/types";

export const projectIds = ["cubewar", "quibbo", "sharkie", "particles", "pokedex"];
//export const projectIds = ["streakon", "cubewar", "quibbo", "sharkie", "pokedex"];

function simplifyModules(glob: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [path, mod] of Object.entries(glob)) {
    const match = path.match(/\/([a-z0-9_-]+)\.ts$/i);
    if (match) result[match[1] as string] = mod;
  }
  return result;
}

const englishProjectModules = simplifyModules(import.meta.glob("./en/*.ts", { eager: true }));

export const projectModules = {
  en: englishProjectModules,
  // Project placeholders are currently shared until real portfolio projects
  // are added; never fall back to the removed German content.
  fil: englishProjectModules,
} as const satisfies Record<Locale, Record<string, any>>;
