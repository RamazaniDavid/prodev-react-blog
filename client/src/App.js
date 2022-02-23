import TopBar from "./components/layouts/topBar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ViewPost from "./pages/post/ViewPost";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";

function App() {
  return (
    <>
      <TopBar />
      <Register />
    </>
  );
}

export default App;
