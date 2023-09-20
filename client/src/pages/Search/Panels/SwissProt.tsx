import Annotation from "../../../components/Annotation";
import { AnnotationSwissprot } from "../../../types";

const Component = ({ data }: { data: AnnotationSwissprot[] }) => (
  <table class="table min-w-fit rounded-none border-b bg-base-100">
    <thead>
      <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
        <th class="w-1/12">SwissProt ID</th>
        <th>Accessions</th>
        <th>Expression</th>
      </tr>
    </thead>
    <tbody>
      {data.map((_) => (
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
          <td>
            <Annotation
              uri={`http://www.uniprot.org/uniprot/${_.id}`}
              className="mr-1"
            >
              {_.id}
            </Annotation>
          </td>
          <td class="space-y-1">
            {_.accessions.map((__) => (
              <span class="badge badge-ghost badge-sm mr-1">{__}</span>
            ))}
          </td>
          <td class="space-y-1">
            {_.swissprots.map((__) => (
              <span class="badge badge-ghost badge-sm mr-1">{__}</span>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Component;
