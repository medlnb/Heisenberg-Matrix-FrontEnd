import { useContext, useState } from 'react'
import './Account.css'
import { AuthContext } from '../../Context/UserContext'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function Account() {
  const { user, handleUserChange } = useContext(AuthContext)
  const [show, setShow] = useState<boolean>(false)
  return (
    <div className='account--container'>
      <BiUserCircle
        onClick={() => setShow(prev => !prev)} />
      {show &&
        <div className="user--options">
          <Link to="/welcome" onClick={() => {
            localStorage.clear(),
              handleUserChange({
                username: null,
                email: null,
                token: null
              })
          }}>Change user</Link>
        </div>
      }
      <p>{user.username}</p>

    </div>
  )
}

export default Account