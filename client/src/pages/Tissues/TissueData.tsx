import { Accessor, createResource, createSignal } from "solid-js";
import { Title } from "@solidjs/meta";
import numeral from "numeral";

import { Glaucoma } from "../../components";
import { Dataset, Tissue, TissueExpression } from "../../types";
import { SITE_NAME } from "../../constants";

const getData = async ({
  tissue,
  dataset,
}: {
  tissue: Tissue;
  dataset: Dataset;
}): Promise<TissueExpression[]> => {
  const { default: expressionData } = await import(
    `../../data/top-100.${dataset.toLowerCase()}.${tissue}.json`
  );

  return expressionData;
};

const Loading = () => (
  <div class="flex h-full justify-center align-middle">
    <div class="loading loading-infinity loading-lg text-primary"></div>
  </div>
);

/**
 * NOTE: You cannot destructure props in Solid if you want any reactivity!
 * https://www.solidjs.com/guides/rendering#props
 */
const Table = (props: { data: TissueExpression[] }) => (
  <table class="table table-sm">
    <thead>
      <tr>
        <th>Gene</th>
        <th class="text-right">PLIER</th>
        <th class="text-right">
          <Glaucoma />
        </th>
        <th class="text-right">Transcript</th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((_) => (
        <tr>
          <td class="w-6/12 pb-0 pt-1.5">
            {_.gene}
            <small class="block opacity-50">{_.geneDescription}</small>
          </td>
          <td class="w-2/12 pb-0 pt-1.5 text-right align-middle">
            {numeral(_.plier).format("0,00.000")}
          </td>
          <td class="w-2/12 pb-0 pt-1.5 text-right align-middle">
            {numeral(_.plierGlaucoma).format("0,00.000")}
          </td>
          <td class="w-2/12 pb-0 pt-1.5 text-right align-middle">
            {_.transcriptId}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default (props: { tissue: Accessor<Tissue> }) => {
  const [dataset, setDataset] = createSignal<Dataset>("CORE");
  const [data] = createResource(
    () => ({
      tissue: props.tissue(),
      dataset: dataset(),
    }),
    getData,
  );

  return (
    <div class="w-full">
      <Title>Expression by Tissue &ndash; {SITE_NAME}</Title>

      <div class="tabs mb-1.5">
        <div class="flex-1 border-b"></div>
        <a
          classList={{
            "tab tab-lifted text-primary": true,
            "tab-active": dataset() === "CORE",
            " opacity-50 hover:opacity-100": dataset() !== "CORE",
          }}
          onclick={() => setDataset("CORE")}
        >
          Core Dataset
        </a>
        <a
          classList={{
            "tab tab-lifted text-primary": true,
            "tab-active": dataset() === "EXTENDED",
            "opacity-50 hover:opacity-100": dataset() !== "EXTENDED",
          }}
          onclick={() => setDataset("EXTENDED")}
        >
          Extended Dataset
        </a>
      </div>

      {data.loading && <Loading />}
      {data() && <Table data={data() as TissueExpression[]} />}
    </div>
  );
};
