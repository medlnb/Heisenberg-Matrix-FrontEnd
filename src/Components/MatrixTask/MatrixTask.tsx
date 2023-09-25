import { Draggable } from 'react-beautiful-dnd'
import './MatrixTask.css'

interface props {
  title: string,
  content: string,
  index: number,
  _id: string
}

function Note({ title, content, index, _id }: props) {
  return (

    < Draggable draggableId={_id} index={index} >
      {(provided) => (
        <div className={`note--container ${index > 1 ? "dark" : ""}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
          <div className="note">
            <h4>{title}:</h4>
            <p>{content}</p>
          </div>
        </div>
      )
      }
    </Draggable >
  )
}

export default Note