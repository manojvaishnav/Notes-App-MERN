import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import CreateNotes from "./pages/CreateNotes";
import NavigationBar from "./components/Navbar";
import UpdateNotes from "./pages/UpdateNotes";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NavigationBar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route exact path="*" element={<Homepage />} />
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/notes" element={<Notes />} />
            <Route exact path="/createnotes" element={<CreateNotes />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/updatenotes" element={<UpdateNotes />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
