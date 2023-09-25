import { useContext, useState } from 'react'
import './AddTask.css'
import { TasksContext } from '../../Context/TaskContext'
import { DateContext } from '../../Context/DateContext'
import { TaskType } from '../../Models/Models'
import { AuthContext } from '../../Context/UserContext'
import { PostTask } from '../../Data/TasksData'
import { RxDoubleArrowDown } from 'react-icons/rx'
import { notify } from '../../App'

function AddTask() {
  const [toggle, setToggle] = useState<"form" | "button">("button")
  const [title, setTitle] = useState("")
  const { state, dispatch } = useContext(TasksContext)
  const { user } = useContext(AuthContext)
  const { date } = useContext(DateContext)


  const [folder, setFolder] = useState<string>("Others")

  const folders: string[] = []
  state?.map(task => {
    let typeName = task.folder
    if (!typeName)
      typeName = "Others"
    if (!folders.includes(typeName)) {
      folders.push(typeName)
    }
  })

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title == "")
      return notify("error", "All fields must be filled")

    const task: TaskType = {
      title,
      folder,
      date
    }
    PostTask(task, user.token).then(
      task => {
        dispatch({
          type: "ADDTASK",
          payload: task
        })
      }
    )
    setTitle("")
    setToggle("button")
  }
  return (
    <>
      {toggle == "button" &&
        <div
          className='button'
          onClick={() => { setToggle("form") }}
        >
          Add Task
          <RxDoubleArrowDown />
        </div>
      }
      {toggle == "form" &&
        <form className='addtask--container' onSubmit={HandleSubmit} >
          <h4 >Add Task</h4>
          <input
            placeholder='title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='type--addnote'>
            <input
              placeholder='folder...'
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            />
            <select
              value={folder}
              onChange={(e) => { setFolder(e.target.value) }}
            >
              {folders.map(folder => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </div>
          <button >Add</button>
        </form >}
    </>
  )
}

export default AddTask