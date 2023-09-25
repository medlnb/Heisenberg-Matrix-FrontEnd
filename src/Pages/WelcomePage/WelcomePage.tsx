import { useState } from 'react'
import Login from '../Login/Login'
import SignUp from '../Signup/Signup'
import './WelcomePage.css'


function WelcomePage() {
  const [showenPage, setShowenPage] = useState<"signup" | "login">("signup")
  return (
    <div className='welcomePage--container'>
      <div className="welcomePage--left">
        <img src={"https://i.imgur.com/oqEEdna.png"} className='logo' />
        <p>Welcome to Heisenberg Matrix <br /><br />
          Your Ultimate Note and Task Management Solution <br /><br />
          Effortlessly organize your notes and tasks with our innovative Heisenberg Matrix Tasks System.<br />
          Experience seamless productivity and stay on top of your to-do list like never before. Get started now!"</p>
      </div>
      <div className="welcomePage--right">
        {showenPage == "login" ?
          <Login changePage={()=>setShowenPage("signup")} /> :
          <SignUp changePage={() => setShowenPage("login")} />}
      </div>
    </div>
  )
}

export default WelcomePage