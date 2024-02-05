import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./Context/UserContext.tsx";
import { DateContextProvider } from "./Context/DateContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <DateContextProvider>
      <App />
    </DateContextProvider>
  </AuthContextProvider>
);
