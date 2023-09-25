import { TaskType } from '../../Models/Models'
import Task from '../Task/Task'
import './TasksFolder.css'

interface props {
  title: string,
  tasksArray: TaskType[]
}

function TasksFolder({ title, tasksArray }: props) {

  return (
    <div className='tasksFolder--container'>
      <h3>{title}</h3>
      {tasksArray.map((task: TaskType, i: number) => {
        return (
          <Task key={`${title}${i}`} task={task} />
        )
      })}
    </div>
  )
}
export default TasksFolder