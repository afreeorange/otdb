import Annotation from "../../../components/Annotation";
import { AnnotationMRNA } from "../../../types";

const Component = ({ data }: { data: AnnotationMRNA[] }) => (
  <table class="table min-w-fit rounded-none border-b bg-base-100">
    <thead>
      <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
        <th>Accession</th>
        <th>Source</th>
        <th>Description</th>
        <th class="text-right">Score</th>
        <th class="text-right">Coverage</th>
        <th class="text-center" colSpan={2}>
          Direct / Possible Probes
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map((_) => (
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
          <td>
            <Annotation uri="https://nikhil.io">{_.accession}</Annotation>
          </td>
          <td>{_.source}</td>
          <td>{_.description}</td>
          <td class="text-right">{_.score}</td>
          <td class="text-right">{_.coverage}</td>
          <td class="text-right">{_.probesDirect}</td>
          <td>{_.probesPossible}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Component;
