import Annotation from "../../../components/Annotation";
import { AnnotationPathway } from "../../../types";

const Component = ({ data }: { data: AnnotationPathway[] }) => (
  <table class="table min-w-fit rounded-none border-b bg-base-100">
    <thead>
      <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
        <th class="w-1/6">Accession</th>
        <th class="w-1/6">Source</th>
        <th>Pathway</th>
      </tr>
    </thead>
    <tbody>
      {data.map((_) => (
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
          <td>
            <Annotation
              uri={`https://www.ncbi.nlm.nih.gov/nuccore/${_.accession}`}
              className="mr-1"
            >
              {_.accession}
            </Annotation>
          </td>
          <td>{_.source}</td>
          <td>{_.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Component;
