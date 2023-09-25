import { useContext, useEffect, useState } from 'react'
import './Tasks.css'
import { TasksContext } from '../../Context/TaskContext'
import TasksFolder from '../../Components/TasksFolder/TasksFolder'
import { DateContext } from '../../Context/DateContext'
import { TaskType } from '../../Models/Models'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../App'
import { BeatLoader } from 'react-spinners'


function Tasks() {
  const [loading, setLoading] = useState(true)
  const { state } = useContext(TasksContext)
  const { date } = useContext(DateContext)
  const { user } = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user.username) {
      notify("error", "You need to have an Account")
      navigate("/welcome")
    }
  }, [user])
  if (!state)
    return
  useEffect(() => {
    if (state[0].date.year != 0)
      setLoading(false)

  }, [state])



  const filtredData = state.filter((task: TaskType) => {
    return (task.date.day === date.day && task.date.month === date.month && Number(task.date.year) === Number(date.year))
  }

  )

  const folders: { [key: string]: any } = {}
  filtredData.map((task) => {
    let typeName = task.folder
    if (!typeName)
      typeName = "Others"
    if (!folders[typeName]) {
      folders[typeName] = []
    }
    folders[typeName].push(task)
  })
  const fold = []
  for (const folderName in folders) {
    fold.push(<TasksFolder key={folderName} title={folderName} tasksArray={folders[folderName]} />);
  }

  return (
    <div className="tasks--container">
      <div className='spinner'>
        <BeatLoader
          color={"white"}
          loading={loading}
          size={30}
        />
      </div>
      {filtredData.length < 1 &&
        !loading &&
        <p>You have no Tasks for this date , relax or add one.</p>
      }
      {fold}
    </div>
  )
}

export default Tasks