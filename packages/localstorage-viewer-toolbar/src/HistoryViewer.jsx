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
        {history.slice().reverse().map((entry, index) => (
          <li key={index} className="p-2 border rounded bg-white">
            <p className="text-sm text-gray-500 mb-1">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
            <DiffViewer oldValue={entry.oldValue} newValue={entry.newValue} />
          </li>
        ))}
      </ul>
    </div>
  );
}
