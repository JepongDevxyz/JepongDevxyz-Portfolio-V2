import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.webp";
import thumbnailQuibbo from "../../../assets/thumbnails/quibbo.webp";
import thumbnailParticles from "../../../assets/thumbnails/particles.webp";
import thumbnailPokedex from "../../../assets/thumbnails/pokedex.webp";
import thumbnailSharkie from "../../../assets/thumbnails/sharkie.webp";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Project Alpha",
    slug: "cubewar",
    thumbnail: thumbnailCubeWar,
    description: "Interactive experience placeholder",
  },
  {
    title: "Project Beta",
    slug: "quibbo",
    thumbnail: thumbnailQuibbo,
    description: "Product platform placeholder",
  },
  {
    title: "Project Gamma",
    slug: "sharkie",
    thumbnail: thumbnailSharkie,
    description: "Creative application placeholder",
  },
  {
    title: "Project Delta",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "WebGL experiment placeholder",
  },
  {
    title: "Project Epsilon",
    slug: "pokedex",
    thumbnail: thumbnailPokedex,
    description: "Learning project placeholder",
  },
] as const satisfies ProjectPreview[];
