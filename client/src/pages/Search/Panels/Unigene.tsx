import Annotation from "../../../components/Annotation";
import { AnnotationUnigene } from "../../../types";

const Component = ({ data }: { data: AnnotationUnigene[] }) => (
  <table class="table rounded-none border-b bg-base-100">
    <thead>
      <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
        <th class="w-1/12">Unigene ID</th>
        <th>Accessions</th>
        <th>Expression</th>
      </tr>
    </thead>
    <tbody>
      {data.map((_) => (
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
          <td>{_.id}</td>
          <td class="space-y-1">
            {_.accessions.map((__) => (
              <Annotation uri="https://nikhil.io" className="mr-1">
                {__}
              </Annotation>
            ))}
          </td>
          <td class="space-y-1">
            {_.expression.map((__) => (
              <span class="badge badge-ghost badge-sm mr-1 inline-block">
                {__}
              </span>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Component;
