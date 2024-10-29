"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AddTodo({ apiUrl }) {
  const [_, startTransition] = useTransition();
  const router = useRouter();
  async function handleClick(event) {
    event.preventDefault();

    const formData = {
      title: event.target.title.value,
      description: event.target.description.value,
      done: event.target.done.checked,
    };

    console.log("formData:", JSON.stringify(formData, null, 2));
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-TYpe": "application/json" },
    });

    const data = await response.json();
    console.log(data);

    startTransition(() => router.refresh());
  }

  return (
    <form onSubmit={handleClick}>
      <input
        name="title"
        className="ease px-3 py-2 transition duration-300 text-md border border-slate-200 rounded-md w-full bg-transparent placeholder:text-slate-400 text-white"
        placeholder="New Todo"
      />
      <input
        name="description"
        className="bg-transparent w-full border border-slate-200 rounded-md px-3 py-2"
        placeholder="Description"
      />
      <input type="checkbox" name="done" />
      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-700 text-white rounded w-full py-2 px-3 mb-3 leading-tight"
      >
        Create
      </button>
    </form>
  );
}
