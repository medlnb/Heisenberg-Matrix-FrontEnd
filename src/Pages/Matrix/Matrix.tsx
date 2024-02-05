import { useContext } from "react";
import { MatrixTasksContext } from "../../Context/MatrixTaskContext";
import DroppableContainer from "../../Components/DroppableContainer/DroppableContainer";
import CreateNote from "../../Components/CreateMatrixTask/CreateMatrixTask";

function Matrix() {
  const { state } = useContext(MatrixTasksContext);

  if (!state) {
    return null;
  }

  return (
    <div className="grades--container">
      <div className="separator">
        <p>Urgent</p>
        <p>Less Urgent</p>
      </div>
      <div className="separator sepa">
        <p>Important</p>
        <p>Less Important </p>
      </div>
      <DroppableContainer
        catigory={state.MatrixTasks.ImportUrgant}
        id="ImportUrgant"
      />
      <DroppableContainer
        catigory={state.MatrixTasks.ImportNotUrgant}
        id="ImportNotUrgant"
      />
      <DroppableContainer
        catigory={state.MatrixTasks.NotImportUrgant}
        id="NotImportUrgant"
      />
      <DroppableContainer
        catigory={state.MatrixTasks.NotImportNotUrgant}
        id="NotImportNotUrgant"
      />

      <CreateNote />
    </div>
  );
}
export default Matrix;
