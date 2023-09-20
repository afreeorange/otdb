import Annotation from "../../../components/Annotation";
import { AnnotationProteinDomain } from "../../../types";

const Component = ({ data }: { data: AnnotationProteinDomain[] }) => (
  <table class="table min-w-fit rounded-none border-b bg-base-100">
    <thead>
      <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
        <th class="w-1/6">Accession</th>
        <th class="w-1/6">Pfam Accession</th>
        <th class="w-1/6">Source</th>
        <th>Domain Description</th>
      </tr>
    </thead>
    <tbody>
      {data.map((_) => (
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
          <td>
            <Annotation
              uri={`https://www.genome.ucsc.edu/cgi-bin/hgGene?hgg_gene=${_.accession}`}
            >
              {_.accession}
            </Annotation>
          </td>
          <td>
            <Annotation
              uri={`http://www.ebi.ac.uk/interpro/IEntry?ac=${_.pfamAccession}`}
            >
              {_.pfamAccession}
            </Annotation>
          </td>
          <td>{_.source}</td>
          <td>{_.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Component;
