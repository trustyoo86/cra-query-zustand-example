import App from "App";
import EditorPage from "pages/Editor";
import Todo from "pages/todo";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/todo',
    element: <Todo />,
  },
  {
    path: '/editor',
    element: <EditorPage />,
  },
]);

export default router;
