export default function Toolbar({ search, setSearch, reload }) {
  const downloadStorage = () => {
    const blob = new Blob([JSON.stringify(localStorage, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "localStorage-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const restoreStorage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      const text = await file.text();
      const json = JSON.parse(text);
      for (let key in json) {
        localStorage.setItem(key, json[key]);
      }
      location.reload();
    };
    input.click();
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 키워드 검색"
        className="border px-2 py-1 rounded w-full max-w-xs"
      />
      <button
        onClick={reload}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        ⟳ 새로고침
      </button>
      <button
        onClick={downloadStorage}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        ⬇ 백업
      </button>
      <button
        onClick={restoreStorage}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        ⬆ 복원
      </button>
    </div>
  );
}
