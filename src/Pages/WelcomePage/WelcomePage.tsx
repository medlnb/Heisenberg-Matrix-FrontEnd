import "./WelcomePage.css";
import { Outlet } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcomePage--container">
      <div className="welcomePage--left">
        <img src={"https://i.imgur.com/oqEEdna.png"} className="logo" />
        <p>
          Welcome to Heisenberg Matrix <br />
          <br />
          Your Ultimate Note and Task Management Solution <br />
          <br />
          Effortlessly organize your notes and tasks with our innovative
          Heisenberg Matrix Tasks System.
          <br />
          Experience seamless productivity and stay on top of your to-do list
          like never before. Get started now!"
        </p>
      </div>
      <div className="welcomePage--right">
        <Outlet />
      </div>
    </div>
  );
}

export default WelcomePage;
