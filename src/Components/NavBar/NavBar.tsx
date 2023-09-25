import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  const { pathname } = useLocation()
  return (
    <div className='navBar--container'>
      <div className={pathname === "/" ? `selected--navbar` : ""}><Link to="/">Tasks</Link></div>
      <div className={pathname === "/matrix" ? `selected--matrix` : ""}><Link to="/matrix"> Matrix</Link></div>
      <div className={pathname === "/notes" ? `selected--notes` : ""}><Link to="/notes"  >Notes</Link></div>
    </div >
  )
}

export default NavBar