import { useEffect, useState } from "react";

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
    const newItem = { id: itemList.length, title: item, completed: false };
    setItemList([...itemList, newItem]);
    console.log(itemList);
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
    // localStorage.setItem("todoList", JSON.stringify(updatedList));
  }

  function deleteToDo(id) {
    const newUpdatedList = itemList.filter((itemList) => itemList.id !== id);
    setItemList(newUpdatedList);
  }

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow rounded text-center p-6 w-full max-w-xl">
        <input
          className="border-gray-300 border p-2.5 rounded w-2/3"
          type="text"
          placeholder="Add a new Task"
          value={item}
          onChange={getValue}
        ></input>
        <button
          className="bg-blue-500 py-2.5 m-2 px-4 rounded text-white hover:bg-blue-800"
          onClick={addItem}
        >
          Add
        </button>

        <ul className="flex flex-wrap text-sm font-medium text-gray-500 justify-center">
          <li className="me-2">
            <a
              href=""
              className="p-4 inline-block bg-gray-100 active text-blue-600"
            >
              All
            </a>
          </li>
          <li className="me-2">
            <a href="" className="p-4 inline-block">
              Pending
            </a>
          </li>
          <li className="me-2">
            <a href="" className="p-4 inline-block">
              Completed
            </a>
          </li>
        </ul>

        <table className="w-full mt-4">
          <tbody>
            {itemList.map((it) => (
              <tr className="border border-gray-200">
                <td>
                  <input
                    id={it.id}
                    type="radio"
                    onChange={() => changeCompletedStatus(it.id)}
                    checked={it.checked}
                  ></input>
                </td>
                <td key={it.id}>{it.title}</td>
                <td className="p-2 text-right">
                  <button
                    className="text-gray-400 hover:text-gray-300"
                    onClick={() => deleteToDo(it.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
