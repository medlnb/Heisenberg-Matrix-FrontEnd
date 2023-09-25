import './FinishedMatrixTask.css'
import { Droppable } from 'react-beautiful-dnd'
import { MdDoneOutline } from "react-icons/md"

function FinishedMatrixTask() {
  return (
    <Droppable droppableId={"done"}>
      {(provided) => (
        <div className='trash--containter' ref={provided.innerRef} {...provided.droppableProps}>
          <div className='trash--pic'>
            <MdDoneOutline size="50" />
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default FinishedMatrixTask