import { useState, useEffect } from "react";
import DiffViewer from "./DiffViewer";

export default function HistoryViewer({ storageKey }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = () => {
      const fullHistory = JSON.parse(
        sessionStorage.getItem("__localStorage_history__") || "{}"
      );
      setHistory(fullHistory[storageKey] || []);
    };

    fetchHistory();

    window.addEventListener("localstorage-history-update", fetchHistory);

    return () => {
      window.removeEventListener("localstorage-history-update", fetchHistory);
    };
  }, [storageKey]);

  if (history.length === 0) {
    return <p className="text-gray-500 mt-2">No change history for this key.</p>;
  }

  return (
    <div className="mt-2 p-2 bg-gray-50 rounded">
      <h4 className="font-bold mb-2">Change History for "{storageKey}"</h4>
      <ul className="space-y-2">
          {history.map((entry, index) => (
            <li
              key={index}
              className="flex items-start justify-between p-2 border rounded bg-white"
            >
              <div className="flex-grow pr-4">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
                <DiffViewer oldValue={entry.oldValue} newValue={entry.newValue} />
              </div>
              <button
                onClick={() => {
                  const event = new CustomEvent("delete-localstorage-history", {
                    detail: { storageKey, timestamp: entry.timestamp },
                  });
                  window.dispatchEvent(event);
                }}
                className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                aria-label="Delete history entry"
              >
                ×
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
