import { useContext, useState } from "react";
import "./CreateNote.css";
import { NotesContext } from "../../Context/NoteContext";
import { DateContext } from "../../Context/DateContext";
import { NoteType } from "../../Models/Models";
import { AuthContext } from "../../Context/UserContext";
import { PostNote } from "../../Data/NotesData";
import { notify } from "../../App";
import { ClipLoader } from "react-spinners";

function CreateNote() {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    content: "",
  });
  const { state, dispatch } = useContext(NotesContext);
  const { user } = useContext(AuthContext);
  const { date } = useContext(DateContext);

  const [folder, setFolder] = useState<string>("Others");

  const folders: string[] = [];
  state?.map((note) => {
    let typeName = note.folder;
    if (!typeName) typeName = "Others";
    if (!folders.includes(typeName)) {
      folders.push(typeName);
    }
  });

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.content == "")
      return notify("error", "All fields must be filled");

    setLoading(true);
    const note: NoteType = {
      content: inputs.content,
      folder,
      date,
    };

    await PostNote(note, user.token).then((note) => {
      dispatch({
        type: "ADDNOTE",
        payload: note,
      });
    });
    setInputs({
      content: "",
    });
    setLoading(false);
  };
  return (
    <form className="addtask--container" onSubmit={HandleSubmit}>
      <h4>Add Note</h4>
      <textarea
        placeholder="Note..."
        value={inputs.content}
        onChange={(e) =>
          setInputs((prev: any) => ({
            ...prev,
            content: e.target.value,
          }))
        }
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

export default CreateNote;
