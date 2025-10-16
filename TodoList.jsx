import { useState } from "react";

export default function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 text-center bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <input
        type="text"
        placeholder="Enter task"
        className="p-2 m-2 text-black rounded"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        onClick={addTask}
        className="bg-teal-400 text-black px-4 py-2 rounded hover:bg-teal-300"
      >
        Add
      </button>
      <ul className="mt-4 space-y-2">
        {tasks.map((t, index) => (
          <li key={index} className="flex justify-between bg-gray-700 p-2 rounded">
            {t}
            <button
              onClick={() => removeTask(index)}
              className="bg-red-500 px-2 py-1 rounded"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}