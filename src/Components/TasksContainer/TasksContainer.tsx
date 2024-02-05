import { useContext } from "react";
import Account from "../Account/Account";
import NavBar from "../NavBar/NavBar";
import DateCom from "../DateCom/DateCom";
import { TasksContext } from "../../Context/TaskContext";
import Calendar from "../Calendar/Calendar";
import AddTask from "../AddTask/AddTask";
import Tasks from "../../Pages/Tasks/Tasks";

function TasksContainer() {
  const { state: tasksState } = useContext(TasksContext);
  return (
    <div className="All--container">
      <div className="right--container">
        <Account />
        <NavBar />
        <DateCom />
        <Calendar data={tasksState} />
        <AddTask />
      </div>
      <div className="left--container">
        <Tasks />
      </div>
    </div>
  );
}

export default TasksContainer;
