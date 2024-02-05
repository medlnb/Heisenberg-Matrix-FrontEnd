import "./DroppableContainer.css";
import { Droppable } from "react-beautiful-dnd";
import Note from "../MatrixTask/MatrixTask";
import { MatrixTask } from "../../Models/Models";

interface props {
  catigory: MatrixTask[];
  id: string;
}
function DroppableContainer({ catigory, id }: props) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="big--container">
          <p
            className={
              id === "ImportUrgant" || id === "NotImportUrgant"
                ? "length--left"
                : "length--right"
            }
          >
            {catigory.length !== 0 ? catigory.length : ""}
          </p>
          <div
            className="grade"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {catigory.map((note: MatrixTask, index: number) => (
              <Note
                key={note._id}
                index={index}
                _id={note._id}
                title={note.title}
                content={note.content}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default DroppableContainer;
