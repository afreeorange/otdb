import Glaucoma from "../../../components/Glaucoma";
import { SearchResult } from "../../../types";
// import TissueExpression from "./TissueExpression";

// import sampleData from "../../../data/sample/search";

const Component = ({ result }: { result: SearchResult }) => (
  <table class="table min-w-fit">
    <thead>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:w-1/6 [&>*]:p-1">
        <th>Tissue</th>
        <th class="text-right">RMA</th>
        <th class="text-right">
          RMA <Glaucoma />
        </th>
        <th class="text-right">PLIER</th>
        <th class="text-right">
          PLIER <Glaucoma />
        </th>
        <th class="text-center">Alternate Splicing</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-red-50 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Choroid
          </span>
        </td>
        <td class="text-right">{result.expression.CHOROID.rma}</td>
        <td class="text-right">{result.expression.CHOROID.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.CHOROID.plier}</td>
        <td class="text-right">{result.expression.CHOROID.plierGlaucoma}</td>
        <td></td>
      </tr>
      {/* <tr>
        <td class=" p-2" colSpan={6}>
          <TissueExpression data={sampleData.data[0].expression} />
        </td>
      </tr> */}
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Ciliary Body
          </span>
        </td>
        <td class="text-right">{result.expression.CILIARY_BODY.rma}</td>
        <td class="text-right">{result.expression.CILIARY_BODY.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.CILIARY_BODY.plier}</td>
        <td class="text-right">
          {result.expression.CILIARY_BODY.plierGlaucoma}
        </td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Cornea
          </span>
        </td>
        <td class="text-right">{result.expression.CORNEA.rma}</td>
        <td class="text-right">{result.expression.CORNEA.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.CORNEA.plier}</td>
        <td class="text-right">{result.expression.CORNEA.plierGlaucoma}</td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Iris
          </span>
        </td>
        <td class="text-right">{result.expression.IRIS.rma}</td>
        <td class="text-right">{result.expression.IRIS.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.IRIS.plier}</td>
        <td class="text-right">{result.expression.IRIS.plierGlaucoma}</td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Lens
          </span>
        </td>
        <td class="text-right">{result.expression.LENS.rma}</td>
        <td class="text-right">{result.expression.LENS.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.LENS.plier}</td>
        <td class="text-right">{result.expression.LENS.plierGlaucoma}</td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Optic Nerve
          </span>
        </td>
        <td class="text-right">{result.expression.OPTIC_NERVE.rma}</td>
        <td class="text-right">{result.expression.OPTIC_NERVE.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.OPTIC_NERVE.plier}</td>
        <td class="text-right">
          {result.expression.OPTIC_NERVE.plierGlaucoma}
        </td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Optic Nerve Head
          </span>
        </td>
        <td class="text-right">{result.expression.OPTIC_NERVE_HEAD.rma}</td>
        <td class="text-right">
          {result.expression.OPTIC_NERVE_HEAD.rmaGlaucoma}
        </td>
        <td class="text-right">{result.expression.OPTIC_NERVE_HEAD.plier}</td>
        <td class="text-right">
          {result.expression.OPTIC_NERVE_HEAD.plierGlaucoma}
        </td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Retina
          </span>
        </td>
        <td class="text-right">{result.expression.RETINA.rma}</td>
        <td class="text-right">{result.expression.RETINA.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.RETINA.plier}</td>
        <td class="text-right">{result.expression.RETINA.plierGlaucoma}</td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Sclera
          </span>
        </td>
        <td class="text-right">{result.expression.SCLERA.rma}</td>
        <td class="text-right">{result.expression.SCLERA.rmaGlaucoma}</td>
        <td class="text-right">{result.expression.SCLERA.plier}</td>
        <td class="text-right">{result.expression.SCLERA.plierGlaucoma}</td>
        <td></td>
      </tr>
      <tr class="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:border-b-base-200 [&>*]:p-1">
        <td>
          <span class="cursor-pointer underline decoration-primary underline-offset-4 transition-all hover:text-primary">
            Trabecular Meshwork
          </span>
        </td>
        <td class="text-right">{result.expression.TRABECULAR_MESHWORK.rma}</td>
        <td class="text-right">
          {result.expression.TRABECULAR_MESHWORK.rmaGlaucoma}
        </td>
        <td class="text-right">
          {result.expression.TRABECULAR_MESHWORK.plier}
        </td>
        <td class="text-right">
          {result.expression.TRABECULAR_MESHWORK.plierGlaucoma}
        </td>
        <td class="border-b border-b-base-200"></td>
      </tr>
    </tbody>
  </table>
);

export default Component;
