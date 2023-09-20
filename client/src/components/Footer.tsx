const BaseFooter = () => (
  <footer class="flex gap-4 text-sm">
    <div>
      <img src="/iowa.gif" alt="The University of Iowa" class="w-8" />
    </div>
    <div>
      <p class="mt-[1.125em]">
        by{" "}
        <a
          href="https://genome.uiowa.edu/"
          title="Link to the CBCB's Homepage"
          class="text-primary transition-all hover:text-primary"
        >
          The Center for Bioinformatics & Computational Biology
        </a>{" "}
        at{" "}
        <a
          href="https://uiowa.edu/"
          title="Link to The University of Iowa's homepage"
          class="text-primary transition-all hover:text-primary"
        >
          The University of Iowa
        </a>
      </p>
      <p>
        Please{" "}
        <a
          href="mailto:nikhil-anand@uiowa.edu"
          title="Email this site's author"
          class="text-primary transition-all hover:text-primary"
        >
          email Nikhil Anand
        </a>{" "}
        with any issues or suggestions
      </p>
    </div>
  </footer>
);

export const PageFooter = () => (
  <div class="border-t py-4 px-2">
    <div class="m-auto max-w-4xl">
      <BaseFooter />
    </div>
  </div>
);

export default BaseFooter;
