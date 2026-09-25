import videoParticles from "../../../assets/videos/particles.mp4";

import particles0 from "../../../assets/images/projects/particles/particles-0.webp";
import particles1 from "../../../assets/images/projects/particles/particles-1.webp";
import particles2 from "../../../assets/images/projects/particles/particles-2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Project Delta",
  theme: "dark",
  tags: ["ogl", "javascript", "glsl"],
  live: "#",
  videoBorder: false,
  description:
    "WebGL experiment placeholder. Replace this text with your own project overview, role, process and results.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoParticles,
        caption: "Animated Particle System",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles0,
        alt: "Knot Shape",
        caption: "Knot Shape",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles1,
        alt: "Donut Shape",
        caption: "Donut Shape",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles2,
        alt: "Sphere Shape",
        caption: "Sphere Shape",
      },
    },
  ],
} as const satisfies ProjectContent;
