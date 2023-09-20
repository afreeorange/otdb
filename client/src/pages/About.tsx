import { Component, ParentComponent } from "solid-js";
import { A } from "@solidjs/router";
import { Title } from "@solidjs/meta";
import { TbBrandSolidjs } from "solid-icons/tb";
import {
  SiCircleci,
  SiDaisyui,
  SiPnpm,
  SiPostgresql,
  SiTailwindcss,
  SiTrpc,
  SiVite,
} from "solid-icons/si";
import { AiOutlineFire } from "solid-icons/ai";
import { VsGithubAlt } from "solid-icons/vs";

import { SITE_NAME } from "../constants";
import { Header, PageBody } from "../components";

const Section: ParentComponent = ({ children }) => (
  <section class="[&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>p]:my-2 ">
    {children}
  </section>
);

type Tech = {
  text: string;
  uri: string;
  icon: any; // TODO: Lol...
};

const stack: Tech[] = [
  {
    icon: <TbBrandSolidjs class="text-primary group-hover:text-base-100" />,
    text: "SolidJS",
    uri: "https://www.solidjs.com/",
  },

  {
    icon: <SiVite class="fill-primary group-hover:fill-base-100" />,
    text: "Vite",
    uri: "https://vitejs.dev/",
  },
  {
    icon: <SiTailwindcss class="fill-primary group-hover:fill-base-100" />,
    text: "Tailwind",
    uri: "https://tailwindcss.com/",
  },
  {
    icon: <SiDaisyui class="fill-primary group-hover:fill-base-100" />,
    text: "daisyUI",
    uri: "https://daisyui.com/",
  },
  {
    icon: <SiTrpc class="fill-primary group-hover:fill-base-100" />,
    text: "tRPC",
    uri: "https://trpc.io/",
  },
  {
    icon: <AiOutlineFire class="fill-primary group-hover:fill-base-100" />,
    text: "Hono",
    uri: "https://hono.dev/",
  },
  {
    icon: <SiPostgresql class="fill-primary group-hover:fill-base-100" />,
    text: "Postgres",
    uri: "https://www.postgresql.org/",
  },
  {
    icon: <SiCircleci class="fill-primary group-hover:fill-base-100" />,
    text: "CircleCI",
    uri: "https://circleci.com/",
  },
  {
    icon: <VsGithubAlt class="fill-primary group-hover:fill-base-100" />,
    text: "Github",
    uri: "https://github.com/",
  },
  {
    icon: <SiPnpm class="fill-primary group-hover:fill-base-100" />,
    text: "pnpm",
    uri: "https://pnpm.io/",
  },
];

const TechTile: Component<Tech> = ({ icon, text, uri }) => (
  <A
    href={`${uri}`}
    class="group card min-w-[8em] cursor-pointer border p-3 pb-2 transition-all hover:border-solid hover:border-primary hover:bg-primary  [&>*]:hover:text-primary"
  >
    <div class="mb-2 [&>*]:h-8 [&>*]:w-8">{icon}</div>
    <span class="group-hover:text-base-100">{text}</span>
  </A>
);

const About = () => (
  <>
    <Title>About &ndash; {SITE_NAME}</Title>
    <Header />
    <PageBody>
      <h1 class="text-3xl font-bold">About the OTDB</h1>

      <Section>
        <p>
          This is a modern port of an old 2013 application that was developed at
          The University of Iowa and exists both as an historical artifact and a
          means for its author to tinker with technologies that animate the
          modern web. Its utility has been superceded by resources such as{" "}
          <a
            href="https://www.eye-transcriptome.com/"
            title="Link to the Human Eye Transcriptome Atlas"
            class="border-b border-b-primary hover:text-primary"
          >
            the <em>Human Eye Transcriptome Atlas</em>
          </a>
          , which may be interrogated as a refined superset of the data
          presented here.
        </p>

        <blockquote
          cite="https://link.springer.com/article/10.1007/s00347-022-01721-4"
          class="my-6 border-l pl-4"
        >
          <p>
            The microarray profiles of a variety of healthy ocular tissues are
            included in the <em>Ocular Tissue Database</em>. The{" "}
            <em>Human Eye Transcriptome Atlas</em> provides the largest
            collection of different ocular tissue types, contains the highest
            number of ocular diseases and is characterized by a high level of
            quality achieved by methodological consistency.
          </p>
          <footer class="mt-2 text-sm opacity-50">
            Julian Wolf <em>et al</em>, &#8220;
            <a
              href="https://link.springer.com/article/10.1007/s00347-022-01721-4"
              title="Link to a paper on the Human Eye Transcriptome Atlas"
              class="border-b border-b-primary hover:text-primary"
            >
              Web-based gene expression analysis &ndash; paving the way to
              decode healthy and diseased ocular tissue
            </a>
            &#8221;,
            <br />
            <em>Die Ophthalmologie</em> (2022)
          </footer>
        </blockquote>

        <p>
          Annotations for transcript clusters and probesets are based on the
          Human Exon 1.0 ST array from{" "}
          <a
            href="https://www.thermofisher.com/us/en/home/life-science/microarray-analysis.html"
            class="border-b border-b-primary hover:text-primary"
          >
            Affymetrix
          </a>{" "}
          (HuEx-1_0-st-v2, v32, released 2009-Nov-16).
        </p>
      </Section>

      <Section>
        <h2>Code + Stack</h2>
        <p>
          All code necessary to run this site is available in a monorepo{" "}
          <a
            href="https://github.com/afreeorange/otdb"
            title="Source code to this website"
            class="border-b border-b-primary hover:text-primary"
          >
            on Github
          </a>{" "}
          under an MIT License. The Postgres instance is hosted by NeonDB under
          their very generous free-tier.
        </p>

        <div class="my-4 flex flex-wrap gap-4">
          {stack.map((_) => (
            <TechTile {..._} />
          ))}
        </div>
      </Section>

      <Section>
        <h2>Colophon</h2>
        <p>
          This website is typeset in{" "}
          <a
            href="https://en.wikipedia.org/wiki/FF_DIN"
            title="Wikipedia article on the typeface used on this site"
            class="border-b border-b-primary hover:text-primary"
          >
            FF DIN
          </a>
          . Background patterns were generated using{" "}
          <a
            href="https://www.magicpattern.design/tools/css-backgrounds"
            title="MagicPattern's CSS background pattern generator"
            class="border-b border-b-primary hover:text-primary"
          >
            <em>MagicPattern</em>
          </a>{" "}
          and{" "}
          <a
            href="https://css-pattern.com/"
            title="Temanu Afif's CSS background pattern generator"
            class="border-b border-b-primary hover:text-primary"
          >
            Temani Afif's lovely <em>CSS Pattern</em>
          </a>
          . All iconography is from the{" "}
          <a
            href="https://solid-icons.vercel.app"
            title="Iconography source"
            class="border-b border-b-primary hover:text-primary"
          >
            Solid Icons
          </a>{" "}
          package. The (old) logo in the footer is &copy;{" "}
          <a
            href="https://brand.uiowa.edu/"
            title="University of Iowa Brand Center"
            class="border-b border-b-primary hover:text-primary"
          >
            The University of Iowa
          </a>
          .
        </p>
      </Section>
    </PageBody>
  </>
);

export default About;
