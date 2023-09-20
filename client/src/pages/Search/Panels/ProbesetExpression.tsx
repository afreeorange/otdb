import { Chromosome } from "../../../components";
import { TissueAnnotation } from "../../../types";

const Component = ({ data }: { data: TissueAnnotation[] }) => (
  <>
    <hr />
    <table class="table min-w-fit border text-xs">
      <thead>
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1">
          <th>Probe ID</th>
          <th class="text-right" colSpan={2}>
            DABG / <span class="badge badge-outline badge-sm">Glaucoma</span>
          </th>
          <th class="text-right" colSpan={2}>
            PLIER / <span class="badge badge-outline badge-sm">Glaucoma</span>
          </th>
          <th class="text-right" colSpan={2}>
            RMA / <span class="badge badge-outline badge-sm">Glaucoma</span>
          </th>
          <th class="text-right">Exon ID</th>
          <th class="text-right">PSR ID</th>
          <th>Accessions</th>
          <th>Genes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((_) => (
          <>
            <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1">
              <td>{_.probesetId}</td>
              <td class="text-right">{_.dabg}</td>
              <td class="text-right">{_.dabgGlaucoma}</td>
              <td class="text-right">{_.plier}</td>
              <td class="text-right">{_.plierGlaucoma}</td>
              <td class="text-right">{_.rma}</td>
              <td class="text-right">{_.rmaGlaucoma}</td>
              <td class="text-right">{_.exonId}</td>
              <td class="text-right">{_.psrId}</td>
              <td>
                {_.geneAccessions.map((__: string) => (
                  <span class="badge badge-outline badge-sm mr-1">{__}</span>
                ))}
              </td>
              <td>
                {_.geneSymbols.map((__: string) => (
                  <span class="badge badge-outline badge-sm mr-1">{__}</span>
                ))}
              </td>
            </tr>
            <tr>
              <td class="border-r"></td>
              <td class="p-2" colSpan={8}>
                <Chromosome chr={_.chromosome} />
              </td>
              <td class="p-2" colSpan={2}>
                Probes: Count / Independent / Non-Overlapping: {_.probes.count}{" "}
                / {_.probes.independent} / {_.probes.nonOverlapping}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  </>
);

export default Component;
