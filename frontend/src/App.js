import Home from "./pages/Home.jsx";
import Add from "./pages/Add.jsx";
import Admin from "./pages/Admin.jsx";
import Edit from "./pages/Edit.jsx";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/edit",
      element: <Edit />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
