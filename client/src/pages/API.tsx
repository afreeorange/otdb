import { ParentComponent } from "solid-js";
import { Title } from "@solidjs/meta";

import { SITE_NAME } from "../constants";
import { Header, PageBody } from "../components";

const Section: ParentComponent = ({ children }) => (
  <section class="[&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>p]:my-2 ">
    {children}
  </section>
);

const About = () => (
  <>
    <Title>API &ndash; {SITE_NAME}</Title>
    <Header />
    <PageBody>
      <h1 class="text-3xl font-bold">Consuming OTDB Data</h1>

      <Section>
        <p></p>
      </Section>
    </PageBody>
  </>
);

export default About;
