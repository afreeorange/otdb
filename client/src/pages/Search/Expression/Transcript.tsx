import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import numeral from "numeral";
import NiceModal from "@ebay/nice-modal-react";
import {
  type Expression,
  type ExpressionByTissue,
  type Tissue,
  type TranscriptID,
  TISSUE_NAMES,
  VALID_TISSUES,
} from "definitions";
import { GraphModal, Sparkline } from "../../../components/Graphs";
import ProbesetExpression from "./Probeset";
import clsx from "clsx";
import MissingData from "../../../components/MissingData";

const Component = ({
  expression,
  tissueResults,
  transcriptId,
}: {
  expression: Expression;
  tissueResults: ExpressionByTissue;
  transcriptId: TranscriptID;
}) => {
  if (!expression) {
    return <MissingData message="No Expression data available" />;
  }

  const [panelState, setPanelState] = useState(
    Object.fromEntries(VALID_TISSUES.map((_) => [_, false]))
  );

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:w-1/6 [&>*]:p-1">
          <th className="text-left">Tissue</th>
          <th className="text-right">RMA</th>
          <th className="text-right">RMA Glaucoma</th>
          <th className="text-right">PLIER</th>
          <th className="text-right">PLIER Glaucoma</th>
          <th className="text-center">Alternate Splicing</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(expression).map((_: Tissue) => (
          <Fragment key={`expression-${transcriptId}-${_}`}>
            <tr className="bg-base-100 [&>*:not(:last-child)]:border-r [&>*]:p-1">
              <td className="border-t">
                <button
                  type="button"
                  className={clsx({
                    "cursor-pointer underline underline-offset-4 transition-all":
                      true,
                    "font-semibold": panelState[_],
                  })}
                  onClick={() =>
                    setPanelState((previous) => ({
                      ...previous,
                      [_]: !previous[_],
                    }))
                  }
                >
                  {TISSUE_NAMES[_]}
                </button>
              </td>
              <td className="text-right border-t">
                {numeral(expression[_].rma).format("0,0.0000")}
              </td>
              <td className="text-right border-t">
                {numeral(expression[_].rma_glaucoma).format("0,0.0000")}
              </td>
              <td className="text-right border-t">
                {numeral(expression[_].plier).format("0,0.0000")}
              </td>
              <td className="text-right border-t">
                {numeral(expression[_].plier_glaucoma).format("0,0.0000")}
              </td>
              <td className="text-center border-t">
                {tissueResults[transcriptId] && (
                  <Sparkline
                    data={tissueResults[transcriptId][_]}
                    onClick={() =>
                      NiceModal.show(GraphModal, {
                        probesetData: tissueResults[transcriptId][_],
                        transcriptId,
                        tissue: _,
                      })
                    }
                  />
                )}
              </td>
            </tr>
            {panelState[_] && (
              <tr>
                <td colSpan={6}>
                  {tissueResults[transcriptId] && (
                    <ProbesetExpression data={tissueResults[transcriptId][_]} />
                  )}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Component;
