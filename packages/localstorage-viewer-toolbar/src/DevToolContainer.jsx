import { useState, useEffect, useRef } from "react";
import Toolbar from "./Toolbar";
import StorageTable from "./StorageTable";

export default function DevToolContainer() {
  const [search, setSearch] = useState("");
  const [storageData, setStorageData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
  const popupRef = useRef(null); // 팝업 영역 참조

  const loadStorage = () => {
    const items = Object.entries(localStorage);
    setStorageData(items);
  };

  useEffect(() => {
    loadStorage();

    // 다른 탭이나 같은 탭에서의 업데이트를 모두 처리
    const onStorageChange = () => loadStorage();
    const onCustomUpdate = () => loadStorage();

    window.addEventListener("storage", onStorageChange);
    window.addEventListener("localstorage-update", onCustomUpdate);

    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("localstorage-update", onCustomUpdate);
    };
  }, []);

  const filtered = storageData.filter(
    ([key, value]) => key.includes(search) || value.includes(search)
  );

  // 팝업 외부 클릭 감지
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div
          ref={popupRef}
          className="fixed bottom-8 right-8 max-h-[80vh] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
        >
          <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 text-sm">
            <span className="font-bold">LocalStorage Viewer</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl leading-none cursor-pointer"
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
            <StorageTable data={filtered} reload={loadStorage} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-auto h-14 px-2 bg-blue-700 text-white rounded shadow-lg flex items-center justify-center z-50"
          aria-label="Open DevTool"
        >
          {/* 아이콘이나 텍스트 */}
          Localstroage Viewer
        </button>
      )}
    </>
  );
}
