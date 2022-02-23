import TopBar from "./components/layouts/topBar/TopBar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ViewPost from "./pages/post/ViewPost";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        ></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/write" element={user ? <Write /> : <Login />}></Route>
        <Route
          path="/settings"
          element={user ? <Settings /> : <Login />}
        ></Route>
        <Route path="/post/:postId" element={<ViewPost />}></Route>
        <Route
          path="/post/:postId/edit"
          element={user ? <ViewPost /> : <NotFound />}
        ></Route>
        <Route path="*" element={<NotFound />} />
        <Route path="**" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
