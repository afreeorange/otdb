import Annotation from "../../../components/Annotation";
import { AnnotationGene } from "../../../types";

const Component = ({ data }: { data: AnnotationGene[] }) => (
  <table class="table min-w-fit rounded-none border-b bg-base-100">
    <thead>
      <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
        <th class="w-1/12">Accession</th>
        <th class="w-1/12">Symbol</th>
        <th>Title</th>
        <th class="w-1/12 text-right">CytoBand</th>
        <th class="w-1/12 text-right">Entrez ID</th>
      </tr>
    </thead>
    <tbody>
      {data.map((_) => (
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
          <td>
            <Annotation uri="https://nikhil.io">{_.accession}</Annotation>
          </td>
          <td>{_.symbol}</td>
          <td>{_.title}</td>
          <td class="text-right">{_.cytoband}</td>
          <td class="text-right">{_.entrez}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Component;
