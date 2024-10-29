"use client";

import { useState } from "react";

export function TodoList({ todos }) {
  return (
    <ul className="list-none hover:list-disc">
      {todos.map((todo) => (
        <li key={todo.id} className="my-2">
          <Todo
            title={todo.title}
            description={todo.description}
            done={todo.done}
            todoId={todo.id}
          />
        </li>
      ))}
    </ul>
  );
}

function Todo(props) {
  const [title, setTitle] = useState(props.title || "");
  const [description, setDescription] = useState(props.description || "");
  const [done, setDone] = useState(props.done || false);

  async function handleCheckBoxClick(newDone, todoId) {
    console.log("todoId:", todoId, "done:", newDone);
    console.log(JSON.stringify({ done: newDone }));
    const response = await fetch("http://127.0.0.1:8080/api/todos/" + todoId, {
      method: "PATCH",
      body: JSON.stringify({ done: newDone  }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.text();
    console.log(data);
  }

  return (
    <div>
      <h2 className="bg-red-500">{title}</h2>
      <p>{description}</p>
      <input
        type="checkbox"
        onChange={(e) => {
          const newDone = e.target.checked;
          console.log("newDone:"+newDone);
          setDone(newDone);
          handleCheckBoxClick(newDone, props.todoId);
        }}
        checked={done}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
    </div>
  );
}
