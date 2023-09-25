import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import MatrixSideBar from '../../Components/MatrixSideBar/MatrixSideBar'
import { MatrixTasksContext } from '../../Context/MatrixTaskContext'
import Matrix from '../Matrix/Matrix'
import './MatrixP.css'
import { useContext } from 'react'
import { AuthContext } from '../../Context/UserContext'
import { MatrixTasksType } from '../../Models/Models'
import { CheckMatrixTask, DeleteMatrixTask, MoveMatrixTask } from '../../Data/MatrixNotesData'

function MatrixP() {
  const { user } = useContext(AuthContext)
  const { state, dispatch } = useContext(MatrixTasksContext)
  if (!dispatch) {
    return null
  }
  const HandleAdd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    if (destination.droppableId == source.droppableId) return

    const originState = state.MatrixTasks

    const sourceNotes = state.MatrixTasks[source.droppableId as keyof MatrixTasksType];
    const destinationNotes = state.MatrixTasks[destination.droppableId as keyof MatrixTasksType];

    const noteSelected = sourceNotes[source.index];

    const newSourceNotes = [...sourceNotes];

    newSourceNotes.splice(source.index, 1);



    if (destination.droppableId === "done") {
      dispatch({
        type: "REMOVEMATRIXTASK",
        payload: {
          noteSelected,
          newarray: {
            typeName: [source.droppableId as keyof MatrixTasksType],
            content: newSourceNotes
          }
        }
      })
      CheckMatrixTask(noteSelected._id, user.token).then(
        err => {
          if (err) {
            dispatch({
              type: "SETNOTES",
              payload: originState
            })
          }
        }
      )
      return
    }


    if (destination.droppableId === "trash") {
      dispatch({
        type: "UPDATENOTES",
        payload:
        {
          ...state.MatrixTasks,
          [source.droppableId as keyof MatrixTasksType]: newSourceNotes
        }
      })
      DeleteMatrixTask(noteSelected._id, user.token).then(
        err => {
          if (err) {
            dispatch({
              type: "SETNOTES",
              payload: originState
            })
          }
        }
      )
      return
    }

    const newDestinationNotes = [...destinationNotes];
    newDestinationNotes.splice(destination.index, 0, noteSelected);

    dispatch({
      type: "UPDATENOTES",
      payload:
      {
        ...state.MatrixTasks,
        [source.droppableId as keyof MatrixTasksType]: newSourceNotes,
        [destination.droppableId as keyof MatrixTasksType]: newDestinationNotes,
      }
    })
    MoveMatrixTask(noteSelected._id, user.token, destination.droppableId).then(
      err => {
        if (err)
          dispatch({
            type: "SETNOTES",
            payload: originState
          })
      }
    )
  }
  return (

    <DragDropContext onDragEnd={HandleAdd}>

      <div className='All--container'>
        <MatrixSideBar />
        <div className='left--container'>
          {/* <SearchBar /> */}
          <Matrix />
        </div>
      </div>

    </DragDropContext>

  )
}

export default MatrixP