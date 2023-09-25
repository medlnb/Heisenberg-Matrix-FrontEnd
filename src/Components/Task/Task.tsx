import { useContext } from 'react'
import './Task.css'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { AuthContext } from '../../Context/UserContext'
import { TasksContext } from '../../Context/TaskContext'
import { TaskType } from '../../Models/Models'
import { CheckTask, DeleteTask } from '../../Data/TasksData'


interface props {
  task: TaskType
}

function Task({ task }: props) {


  const { title, _id, checked } = task
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(TasksContext)

  const HandleCheck = async () => {

    dispatch({
      type: "CHECKTASK",
      payload: _id
    })
    CheckTask(_id, user.token).then(
      error => {
        if (error) {
          dispatch({
            type: "CHECKTASK",
            payload: _id
          })

        }
      }
    )
  }
  const HandleRemove = async () => {
    dispatch({
      type: "REMOVETASK",
      payload: _id
    })
    DeleteTask(_id, user.token).then(
      error => {
        if (error) {
          dispatch({
            type: "ADDTASK",
            payload: task
          })
        }
      }
    )
  }
  return (
    <div className='task--container'>
      <div className={`task--title ${checked?"checked":""}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={HandleCheck} />
        <p>{title}</p>
      </div>
      <BiSolidTrashAlt onClick={HandleRemove} />
    </div>
  )
}

export default Task