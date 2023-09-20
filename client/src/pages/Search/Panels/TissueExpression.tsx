import Annotation from "../../../components/Annotation";
import Chromosome from "../../../components/Chromosome";
import { TissueAnnotation } from "../../../types";

const Component = ({ data }: { data: TissueAnnotation[] }) => (
  <>
    <table class="table border bg-base-100">
      <thead>
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1">
          <th class="w-[5rem]">Probe ID</th>
          <th class="w-[7rem] text-center" colSpan={2}>
            DABG / <span class="badge badge-outline badge-sm">Glaucoma</span>
          </th>
          <th class="w-[7rem] text-center" colSpan={2}>
            PLIER / <span class="badge badge-outline badge-sm">Glaucoma</span>
          </th>
          <th class="w-[7rem] text-center" colSpan={2}>
            RMA / <span class="badge badge-outline badge-sm">Glaucoma</span>
          </th>
          <th class="w-16 text-right">Exon ID</th>
          <th class="w-16 text-right">PSR ID</th>
          <th class="w-72 text-center">Locus</th>
          <th>Genes</th>
          <th>Accessions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((_) => (
          <>
            <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1 [&>*]:align-top">
              <td>{_.probesetId}</td>
              <td class="text-right">{_.dabg}</td>
              <td class="text-right">{_.dabgGlaucoma}</td>
              <td class="text-right">{_.plier}</td>
              <td class="text-right">{_.plierGlaucoma}</td>
              <td class="text-right">{_.rma}</td>
              <td class="text-right">{_.rmaGlaucoma}</td>
              <td class="text-right">{_.exonId}</td>
              <td class="text-right">{_.psrId}</td>
              <td class="text-center">
                <Chromosome chr={_.chromosome} />
              </td>
              <td class="space-y-1">
                {_.geneSymbols.map((__) => (
                  <>{__}</>
                ))}
              </td>
              <td>
                {_.geneAccessions.map((__) => (
                  <>
                    <Annotation
                      uri={`http://ensembl.org/Homo_sapiens/Transcript/Summary?t=${__}`}
                      className="mr-1"
                    >
                      {__}
                    </Annotation>
                  </>
                ))}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  </>
);

export default Component;
