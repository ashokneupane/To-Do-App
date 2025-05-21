import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/all" />}></Route>
        <Route path="/:filter" element={<TodoForm />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
