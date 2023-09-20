import { BiRegularGlasses } from "solid-icons/bi";
import { Title } from "@solidjs/meta";

import { Header, PageBody } from "../components";
import { SITE_NAME } from "../constants";

export default () => (
  <>
    <Title>Paper &ndash; {SITE_NAME}</Title>
    <Header />
    <PageBody>
      <h1 class="mb-2 text-3xl font-bold">
        Exon-level Expression Profiling of Ocular Tissues
      </h1>

      <h2 class="mb-2 text-xl">
        Alex H Wagner, V Nikhil Anand, Wan-Heng Wang, Jon E Chatterton, Duo Sun,
        Allan R Shepard, Nasreen Jacobson, Iok-Hou Pang, Adam P Deluca, Thomas L
        Casavant, Todd E Scheetz, Robert F Mullins, Terry A Braun, Abbot F Clark
      </h2>

      <p class="mb-8 text-sm">
        <span class="opacity-50">
          <em>Exp Eye Res</em>. 2013 June ; 0: 105–111.
        </span>{" "}
        <a
          href="https://pubmed.ncbi.nlm.nih.gov/23500522/"
          class="border-b border-b-primary opacity-50 hover:text-primary hover:opacity-100"
        >
          doi:10.1016/j.exer.2013.03.004
        </a>
      </p>

      <h3 class="mb-2 text-xl font-bold uppercase">Abstract</h3>

      <p>
        The normal gene expression profiles of the tissues in the eye are a
        valuable resource for considering genes likely to be involved with
        disease processes. We profiled gene expression in ten ocular tissues
        from human donor eyes using Affymetrix Human Exon 1.0 ST arrays. Ten
        different tissues were obtained from six different individuals and RNA
        was pooled. The tissues included: retina, optic nerve head (ONH), optic
        nerve (ON), ciliary body (CB), trabecular meshwork (TM), sclera, lens,
        cornea, choroid/retinal pigment epithelium (RPE) and iris. Expression
        values were compared with publically available Expressed Sequence Tag
        (EST) and RNA-sequencing resources. Known tissue-specific genes were
        examined and they demonstrated correspondence of expression with the
        representative ocular tissues. The estimated gene and exon level
        abundances are available online at the Ocular Tissue Database.
      </p>

      <button
        onclick={() => (window.location.href = "/paper.pdf")}
        class="group btn btn-outline btn-block my-8 flex text-primary hover:border-primary hover:bg-primary"
      >
        <BiRegularGlasses class="mr-2 h-5 w-5 fill-primary group-hover:fill-base-100" />
        Read the Paper
      </button>
    </PageBody>
  </>
);
