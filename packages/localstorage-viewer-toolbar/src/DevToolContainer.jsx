import { useState, useEffect, useRef } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import Toolbar from "./Toolbar";
import StorageTable from "./StorageTable";

export default function DevToolContainer() {
  const [search, setSearch] = useState("");
  const [storageData, setStorageData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 팝업 열림 상태
  const popupRef = useRef(null); // 팝업 영역 참조

  const loadStorage = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        items.push([key, localStorage.getItem(key)]);
      }
    }
    setStorageData(items);
  };

  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const oldValue = localStorage.getItem(key);
      originalSetItem.apply(this, arguments);
      const newValue = String(value); // Ensure value is a string, as it would be in localStorage

      if (oldValue !== newValue) {
        const historyKey = "__localStorage_history__";
        let history = JSON.parse(sessionStorage.getItem(historyKey) || "{}");
        if (!history[key]) {
          history[key] = [];
        }
        // Keep history clean: only store if there was a previous value
        if (oldValue !== null) {
          history[key].push({
            timestamp: new Date().toISOString(),
            oldValue,
            newValue,
          });
          sessionStorage.setItem(historyKey, JSON.stringify(history));
        }
      }
    };

    // Cleanup on unmount
    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

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
        <div className="fixed bottom-8 right-8 z-50">
          <ResizableBox
            width={600}
            height={400}
            minConstraints={[300, 200]}
            maxConstraints={[1200, 800]}
            className="overflow-hidden max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200"
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
          >
            <div
              ref={popupRef}
              className="w-full h-full flex flex-col overflow-hidden"
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
              <div className="p-4 overflow-auto text-sm font-mono flex-1">
                <Toolbar
                  search={search}
                  setSearch={setSearch}
                  reload={loadStorage}
                />
                <StorageTable data={filtered} reload={loadStorage} />
              </div>
            </div>
          </ResizableBox>
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
