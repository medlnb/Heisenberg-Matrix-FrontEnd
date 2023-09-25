import './Trash.css'
import { Droppable } from 'react-beautiful-dnd'

function Trash() {
  return (
    <Droppable droppableId={"trash"}>
      {(provided, snapshot) => (
        <div className='trash--containter' ref={provided.innerRef} {...provided.droppableProps}>
          <div className='trash--pic'>
            <img src={'https://i.imgur.com/f6pKuZt.png'} className={`trashcap ${snapshot.isDraggingOver ? "open--trashcan" : ""}`} />
            <img src={'https://i.imgur.com/WsLbphf.png'} className='trashcan' />
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Trash