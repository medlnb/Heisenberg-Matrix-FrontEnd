import { useContext } from "react";
import "./Notes.css";
import { NotesContext } from "../../Context/NoteContext";
import { DateContext } from "../../Context/DateContext";
import { NoteType } from "../../Models/Models";
import NotesFolder from "../../Components/NotesFolder/NotesFolder";
import { BeatLoader } from "react-spinners";

function Notes() {
  const { state } = useContext(NotesContext);
  const { date } = useContext(DateContext);

  if (!state)
    return (
      <div className="tasks--container">
        <div className="spinner">
          <BeatLoader color={"white"} size={30} />
        </div>
      </div>
    );
  const filtredData = state?.filter((task: NoteType) => {
    return (
      task.date.day === date.day &&
      task.date.month === date.month &&
      Number(task.date.year) === Number(date.year)
    );
  });

  const folders: { [key: string]: any } = {};
  filtredData?.map((note) => {
    let typeName = note.folder;
    if (!typeName) typeName = "Others";
    if (!folders[typeName]) {
      folders[typeName] = [];
    }
    folders[typeName].push(note);
  });
  const fold = [];
  const stickyNoteColors = [
    "#70a1ff", // Periwinkle Blue
    "#badc58", // Pastel Green
    "#f9ca24", // Sunflower Yellow
    "#eccc68", // Mustard Yellow
    "#ff85a2", // Coral Pink
    "#6a0572", // Purple
    "#ff7f11", // Tangerine Orange
    "#33d9b2", // Turquoise
    "#f1a9a0", // Salmon Pink
    "#1e272e", // Dark Blue-Gray
  ];
  let index = 0;
  for (const folderName in folders) {
    fold.push(
      <NotesFolder
        key={folderName}
        title={folderName}
        color={stickyNoteColors[index]}
        tasksArray={folders[folderName]}
      />
    );
    index++;
  }

  return (
    <div className="tasks--container">
      {filtredData?.length == 0 && (
        <p style={{ color: "white" }}>You have no Notes for this date.</p>
      )}
      <div className="folders">{fold}</div>
    </div>
  );
}

export default Notes;
