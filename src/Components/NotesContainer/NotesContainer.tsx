import { useContext } from "react";
import { NotesContext } from "../../Context/NoteContext";
import Account from "../Account/Account";
import NavBar from "../NavBar/NavBar";
import DateCom from "../DateCom/DateCom";
import CreateNote from "../CreateNote/CreateNote";
import Calendar from "../Calendar/Calendar";
import Notes from "../../Pages/Notes/Notes";

function NotesContainer() {
  const { state: notesState } = useContext(NotesContext);
  return (
    <div className="All--container">
      <div className="right--container">
        <Account />
        <NavBar />
        <DateCom />
        <Calendar data={notesState} />
        <CreateNote />
      </div>
      <div className="left--container">
        <Notes />
      </div>
    </div>
  );
}

export default NotesContainer;
