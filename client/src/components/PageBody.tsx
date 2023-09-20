// @ts-ignore
import { Motion } from "@motionone/solid";
import { ParentComponent } from "solid-js";

import { PageFooter } from ".";

const PageBody: ParentComponent = ({ children }) => (
  <Motion.div
    animate={{ opacity: [0, 1] }}
    transition={{ duration: 0.25, easing: "ease-in-out" }}
  >
    <div class="mx-auto mb-4 mt-8 max-w-4xl px-2">{children}</div>
    <PageFooter />
  </Motion.div>
);

export default PageBody;
