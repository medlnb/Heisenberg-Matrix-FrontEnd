import { useContext, useState } from "react";
import "./AddTask.css";
import { TasksContext } from "../../Context/TaskContext";
import { DateContext } from "../../Context/DateContext";
import { TaskType } from "../../Models/Models";
import { AuthContext } from "../../Context/UserContext";
import { PostTask } from "../../Data/TasksData";
import { notify } from "../../App";
import { ClipLoader } from "react-spinners";

function AddTask() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const { state, dispatch } = useContext(TasksContext);
  const { user } = useContext(AuthContext);
  const { date } = useContext(DateContext);

  const [folder, setFolder] = useState<string>("Others");

  const folders: string[] = [];
  state?.map((task) => {
    let typeName = task.folder;
    if (!typeName) typeName = "Others";
    if (!folders.includes(typeName)) {
      folders.push(typeName);
    }
  });

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title == "") return notify("error", "All fields must be filled");
    setLoading(true);
    const task: TaskType = {
      title,
      folder,
      date,
    };
    await PostTask(task, user.token).then((task) => {
      dispatch({
        type: "ADDTASK",
        payload: task,
      });
    });
    setTitle("");
    setLoading(false);
  };
  return (
    <form className="addtask--container" onSubmit={HandleSubmit}>
      <h4>Add Task</h4>
      <input
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="type--addnote">
        <input
          placeholder="folder..."
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        />
        <select
          value={folder}
          onChange={(e) => {
            setFolder(e.target.value);
          }}
        >
          {folders.map((folder) => (
            <option key={folder} value={folder} className="folders--option">
              {folder}
            </option>
          ))}
        </select>
      </div>
      <button>
        <p>Add</p>
        {loading && <ClipLoader size={15} color="white" />}
      </button>
    </form>
  );
}

export default AddTask;
