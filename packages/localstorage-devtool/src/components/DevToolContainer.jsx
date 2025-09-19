import { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import StorageTable from "./StorageTable";

export default function DevToolContainer() {
  const [search, setSearch] = useState("");
  const [storageData, setStorageData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태

  const loadStorage = () => {
    const items = Object.entries(localStorage);
    setStorageData(items);
  };

  useEffect(() => {
    loadStorage();

    const onStorageChange = () => loadStorage();
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const filtered = storageData.filter(
    ([key, value]) => key.includes(search) || value.includes(search)
  );

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-8 right-8 w-1/2 max-h-[80vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm">
            <span className="font-bold">LocalStorage Viewer</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="p-4 overflow-auto text-sm font-mono">
            <Toolbar
              search={search}
              setSearch={setSearch}
              reload={loadStorage}
            />
            <StorageTable data={filtered} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50"
          aria-label="Open DevTool"
        >
          {/* 아이콘이나 텍스트 */}
          Dev
        </button>
      )}
    </>
  );
}
