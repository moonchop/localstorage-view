import { useState } from "react";
import { decodeJwt } from "./util";
import HistoryViewer from "./HistoryViewer";

export default function StorageRow({ k, v, reload }) {
  const [isDecoded, setIsDecoded] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const isJwt = typeof v === "string" && v.split(".").length === 3;

  const decodedPayload = isJwt ? decodeJwt(v) : null;

  return (
    <tr className="border-t">
      <td className="p-2 border-b break-all align-top">{k}</td>
      <td className="p-2 border-b break-all align-top">
        <div>{v}</div>
        {isJwt && (
          <div className="mt-1">
            <button
              onClick={() => setIsDecoded(!isDecoded)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {isDecoded ? "Hide" : "Decode JWT"}
            </button>
            {isDecoded && decodedPayload && (
              <pre className="bg-gray-100 p-2 mt-2 rounded overflow-auto">
                {JSON.stringify(decodedPayload, null, 2)}
              </pre>
            )}
          </div>
        )}
        {showHistory && <HistoryViewer storageKey={k} />}
      </td>
      <td className="p-2 border-b text-center align-top">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-purple-600 hover:underline cursor-pointer"
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(k);
              reload();
            }}
            className="text-red-600 hover:underline cursor-pointer"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
