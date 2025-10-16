import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => setInput(input + value);

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="p-6 text-center bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Calculator</h2>
      <input
        type="text"
        value={input}
        readOnly
        className="w-full p-2 mb-4 text-black rounded"
      />
      <div className="grid grid-cols-4 gap-2">
        {"123+456-789*0/.".split("").map((val) => (
          <button
            key={val}
            className="bg-gray-700 p-3 rounded hover:bg-gray-600"
            onClick={() => handleClick(val)}
          >
            {val}
          </button>
        ))}
        <button className="bg-teal-400 text-black p-3 rounded" onClick={calculate}>
          =
        </button>
        <button
          className="bg-red-500 p-3 rounded"
          onClick={() => setInput("")}
        >
          C
        </button>
      </div>
    </div>
  );
}