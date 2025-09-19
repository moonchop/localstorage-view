export default function StorageRow({ k, v, reload }) {
  return (
    <tr className="border-t">
      <td className="p-2 border-b break-all">{k}</td>
      <td className="p-2 border-b break-all">{v}</td>
      <td className="p-2 border-b text-center">
        <button
          onClick={() => {
            localStorage.removeItem(k);
            reload();
          }}
          className="text-red-600 hover:underline cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
