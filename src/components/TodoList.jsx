import React from "react";
import TodoItem from "./TodoItem";
import EditRow from "./EditRow";

export default function TodoList({
  tasks,
  editingId,
  updateToDo,
  changeCompletedStatus,
  editToDo,
  deleteToDo,
  SetEditingId,
}) {
  return (
    <>
      <table className="w-full mt-4">
        <tbody>
          {tasks.length ? (
            tasks.map((task) => (
              // <React.Fragment key={task.id}>
              <TodoItem
                task={task}
                onEdit={editToDo}
                onDelete={deleteToDo}
                changeCompletedStatus={changeCompletedStatus}
                isEditing={editingId === task.id}
                EditRowComponent={
                  <EditRow
                    id={task.id}
                    title={task.title}
                    updateToDo={updateToDo}
                    cancelEditing={() => SetEditingId(null)}
                  />
                }
              />
              // </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No task available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
