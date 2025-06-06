export default function TodoItem({
  task,
  onEdit,
  onDelete,
  changeCompletedStatus,
  isEditing,
  EditRowComponent,
}) {
  return (
    <>
      <tr className="border border-gray-200">
        <td>
          <input
            id={task.id}
            type="checkbox"
            onChange={() => changeCompletedStatus(task.id)}
            checked={task.completed}
          ></input>
        </td>
        <td key={task.id}>{task.title}</td>
        <td className="p-2 text-right">
          <button
            className="text-gray-400 hover:text-gray-300 mr-4"
            onClick={() => onEdit(task.id, task.title)}
          >
            Edit
          </button>
          <button
            className="text-gray-400 hover:text-gray-300"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </td>
      </tr>
      {isEditing && EditRowComponent}
    </>
  );
}
