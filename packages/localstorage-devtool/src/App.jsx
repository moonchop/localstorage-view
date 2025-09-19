import {
  LocalStorageToolbar,
  setLocalStorageItem,
  getLocalStorageItem,
} from "@localstorage/viewer-toolbar";
import React, { useState } from "react";
function App() {
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyInput.trim() || !valueInput.trim()) {
      alert("Please enter both key and value.");
      return;
    }

    localStorage.setItem(keyInput, valueInput);
    setLocalStorageItem(keyInput, valueInput);
    console.log("getLocalStorageItem", getLocalStorageItem("abc"));
    alert(`Saved to localStorage\nKey: ${keyInput}\nValue: ${valueInput}`);

    setKeyInput("");
    setValueInput("");
  };

  return (
    <>
      <div className="flex items-start justify-center min-h-screen bg-gray-100 w-full pt-60">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 mx-auto p-6 bg-gray-50 rounded-md shadow-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            🧪 localStorage Save Form
          </h1>

          <label
            htmlFor="keyInput"
            className="block mb-2 font-semibold text-gray-700"
          >
            Enter Key
          </label>
          <input
            id="keyInput"
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter key to save"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label
            htmlFor="valueInput"
            className="block mb-2 font-semibold text-gray-700"
          >
            Enter Value
          </label>
          <input
            id="valueInput"
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Enter value to save"
            className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </form>
      </div>

      {/* 아래 컴포넌트가 개발툴 */}
      {/* <DevToolContainer /> */}
      <LocalStorageToolbar />
    </>
  );
}

export default App;
