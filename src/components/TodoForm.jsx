import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TodoInput from "./TodoInput";
import FilterTab from "./FilterTab";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

export function TodoForm() {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList"));
  });

  // store data in localstorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(itemList));
  }, [itemList]);

  function addItem() {
    const newItem = { id: uuidv4(), title: item, completed: false };
    setItemList([...itemList, newItem]);
    setItem("");
  }

  function getValue() {
    setItem(event.target.value);
  }

  function changeCompletedStatus(id) {
    const parsedRow = JSON.parse(localStorage.getItem("todoList"));

    const updatedList = parsedRow.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItemList(updatedList);
  }

  function deleteToDo(id) {
    const newUpdatedList = itemList.filter((itemList) => itemList.id !== id);
    setItemList(newUpdatedList);
  }

  const { filter } = useParams();

  const filterList = itemList.filter((item) => {
    if (filter == "pending") return !item.completed;
    if (filter == "completed") return item.completed;
    return true;
  });

  const [editingId, SetEditingId] = useState(null);
  const [editingText, SetEditingText] = useState("");

  function editToDo(id, title) {
    SetEditingId(id);
    SetEditingText(title);
  }

  function updateToDo(id, title) {
    const parsedRow = JSON.parse(localStorage.getItem("todoList"));

    const updatedList = parsedRow.map((item) =>
      item.id === id ? { ...item, title: title } : item
    );
    setItemList(updatedList);
    SetEditingId(null);
  }

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow rounded text-center p-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 pb-2">
          To-Do App
        </h1>

        <TodoInput item={item} onChange={getValue} onClick={addItem} />

        <FilterTab filter={filter} />

        <TodoList
          tasks={filterList}
          editingId={editingId}
          updateToDo={updateToDo}
          changeCompletedStatus={changeCompletedStatus}
          editToDo={editToDo}
          deleteToDo={deleteToDo}
          SetEditingId={SetEditingId}
        />
      </div>
    </section>
  );
}
