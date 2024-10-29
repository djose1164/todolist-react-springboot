import AddTodo from "./todo";
import { TodoList } from "./todo-list";

export default async function Home() {
  let data = await fetch("http://127.0.0.1:8080/api/todos/");
  let todos = await data.json();

  // if (!data) return <p>Loading...</p>;
  // if (!data) return <p>No todos to show.</p>;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <TodoList todos={todos} />
        <AddTodo apiUrl="http://127.0.0.1:8080/api/todos/" />
      </main>
    </div>
  );
}

function handleClick() {
  console.log("Create todo");
}
