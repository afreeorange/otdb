import Annotation from "../../../components/Annotation";
import { AnnotationGO } from "../../../types";

const Nope = () => (
  <div class="w-full text-center text-sm opacity-50">No Annotations</div>
);

const DataTable = ({ data }: { data: AnnotationGO[keyof AnnotationGO] }) => (
  <table class="bg table min-w-fit">
    <thead>
      <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1">
        <th class="w-2/12">ID</th>
        <th class="w-4/12">Term</th>
        <th class="w-6/12">Evidence</th>
      </tr>
    </thead>
    <tbody>
      {data.map((_) => (
        <tr class="[&>*:not(:last-child)]:border-r [&>*]:p-1">
          <td>
            <Annotation
              uri={`https://www.ebi.ac.uk/QuickGO/GTerm?id=${_.id}`}
              className="mr-1"
            >
              {_.id}
            </Annotation>
          </td>
          <td>{_.term}</td>
          <td>{_.evidence}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const GOData = ({ data }: { data: AnnotationGO }) => (
  <div class="[&>*]:bg-base-100">
    <div class="flex border-b">
      <div class="w-1/5 self-center px-2 text-sm">Biological Processes</div>
      <div class="w-4/5 border-l">
        {data.BIOLOGICAL_PROCESS.length === 0 ? (
          <Nope />
        ) : (
          <DataTable data={data.BIOLOGICAL_PROCESS} />
        )}
      </div>
    </div>
    <div class="flex border-b">
      <div class="w-1/5 self-center px-2 text-sm">Cellular Components</div>
      <div class="w-4/5 border-l">
        {data.CELLULAR_COMPONENT.length === 0 ? (
          <Nope />
        ) : (
          <DataTable data={data.CELLULAR_COMPONENT} />
        )}
      </div>
    </div>
    <div class="flex">
      <div class="w-1/5 self-center px-2 text-sm">Molecular Functions</div>
      <div class="w-4/5 border-l">
        {data.MOLECULAR_FUNCTION.length === 0 ? (
          <Nope />
        ) : (
          <DataTable data={data.MOLECULAR_FUNCTION} />
        )}
      </div>
    </div>
  </div>
);

export default GOData;
