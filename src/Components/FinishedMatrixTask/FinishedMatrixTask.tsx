import { useContext } from "react";
import "./FinishedMatrixTask.css";
import { Droppable } from "react-beautiful-dnd";
import { MdDoneOutline } from "react-icons/md";
import { MatrixTasksContext } from "../../Context/MatrixTaskContext";

function FinishedMatrixTask() {
  const { state } = useContext(MatrixTasksContext);
  if (!state) return null;
  return (
    <Droppable droppableId={"done"}>
      {(provided) => (
        <div
          className="trash--containter"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <p className="length--left" style={{ bottom: ".2rem" }}>
            {state.checkedMatrixTasks.length !== 0
              ? state.checkedMatrixTasks.length
              : ""}
          </p>
          <div className="trash--pic">
            <MdDoneOutline size="50" />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default FinishedMatrixTask;
