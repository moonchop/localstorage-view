import StorageRow from "./StorageRow";

export default function StorageTable({ data, reload }) {
  return (
    <div className="overflow-auto max-h-60">
      <table className="w-full text-left border">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="p-2 border-b">Key</th>
            <th className="p-2 border-b">Value</th>
            <th className="p-2 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([key, value]) => (
            <StorageRow key={key} k={key} v={value} reload={reload} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
