import { ParentComponent } from "solid-js";

const Annotation: ParentComponent<{
  uri?: string;
  className?: string;
}> = ({ uri, className, children }) => (
  <span
    class={`border-1 border-1 badge badge-sm inline-block border-primary text-primary transition-all ${
      children ? "hover:bg-primary hover:text-white" : null
    } ${className}`}
  >
    {uri ? <a href={uri}>{children}</a> : <>{children}</>}
  </span>
);

export default Annotation;
