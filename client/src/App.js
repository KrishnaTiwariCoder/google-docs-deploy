import "./App.css";
import Editor from "./components/Editor";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/document/" + uuidv4()} />} />
        <Route path="/document/:id" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
