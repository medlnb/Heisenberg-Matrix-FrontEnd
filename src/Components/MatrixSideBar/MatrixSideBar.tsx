import Account from '../Account/Account'
import FinishedMatrixTask from '../FinishedMatrixTask/FinishedMatrixTask'
import MatrixStatus from '../MatrixStatus/MatrixStatus'
import NavBar from '../NavBar/NavBar'
import Trash from '../Trash/Trash'
import './MatrixSideBar.css'

function MatrixSideBar() {
  return (
    <div className='right--container'>
      <Account />
      <NavBar />
      <div className='matrixRight--container'>
        <MatrixStatus />
        <div className='finishs'>
          <FinishedMatrixTask />
          <Trash />
        </div>
      </div>
    </div>
  )
}

export default MatrixSideBar