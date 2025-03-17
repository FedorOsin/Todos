import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@components/Header";
import TodoReduxPage from "@pages/TodoReduxPage";
import TodoReactPage from "@pages/TodoReactPage";
import TodoDetailsPage from "@pages/TodoDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/todo-redux" element={<TodoReduxPage />} />
        <Route path="/todo-react" element={<TodoReactPage />} />
        <Route path="/todo/:id" element={<TodoDetailsPage />} />
        <Route path="/" element={<TodoReduxPage />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
