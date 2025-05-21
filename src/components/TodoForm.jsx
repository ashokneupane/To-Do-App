import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  }

  function deleteToDo(id) {
    const newUpdatedList = itemList.filter((itemList) => itemList.id !== id);
    setItemList(newUpdatedList);
  }

  const {filter} = useParams();

  const filterList = itemList.filter((item) => {
    if (filter == 'pending') return !item.completed
    if (filter == 'completed') return item.completed
    return true
  })

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
              <Link
                to="/all"
                className={`p-4 inline-block ${filter == '' || filter == 'all' ? 'bg-gray-100 active text-blue-600' : ''}`}
              >
                All
              </Link>
            </li>
            <li className="me-2">
              <Link to="/pending" className={`p-4 inline-block ${filter == 'pending' ? 'bg-gray-100 active text-blue-600' : ''}`}>
                Pending
              </Link>
            </li>
            <li className="me-2">
              <Link to="/completed" className={`p-4 inline-block ${filter == 'completed' ? 'bg-gray-100 active text-blue-600' : ''}`}>
                Completed
              </Link>
            </li>
          </ul>

        <table className="w-full mt-4">
          <tbody>
            {filterList.map((it) => (
              <tr className="border border-gray-200">
                <td>
                  <input
                    id={it.id}
                    type="checkbox"
                    onChange={() => changeCompletedStatus(it.id)}
                    checked={it.completed}
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
