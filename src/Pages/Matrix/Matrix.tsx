import { useContext, useEffect } from 'react'
import { MatrixTasksContext } from '../../Context/MatrixTaskContext'
import DroppableContainer from '../../Components/DroppableContainer/DroppableContainer'
import CreateNote from '../../Components/CreateMatrixTask/CreateMatrixTask'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../App'


function Matrix() {
  const { state } = useContext(MatrixTasksContext)
  const { user } = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user.username) {
      notify("error", "You need to have an Account")
      navigate("/welcome")
    }
  }, [user])

  if (!state.MatrixTasks) {
    return null
  }

  return (

    <div className="grades--container">
      <div className='separator'>
        <p>Urgent</p>
        <p>Less Urgent</p>

      </div>
      <div className='separator sepa'>
        <p>Important</p>
        <p>Less Important </p>

      </div>
      <DroppableContainer catigory={state.MatrixTasks.ImportUrgant} id="ImportUrgant" />
      <DroppableContainer catigory={state.MatrixTasks.ImportNotUrgant} id="ImportNotUrgant" />
      <DroppableContainer catigory={state.MatrixTasks.NotImportUrgant} id="NotImportUrgant" />
      <DroppableContainer catigory={state.MatrixTasks.NotImportNotUrgant} id="NotImportNotUrgant" />

      <CreateNote />

    </div>

  )
}
export default Matrix