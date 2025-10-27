export default function DiffViewer({ oldValue, newValue }) {
  const oldLines = (oldValue || "").split("\n");
  const newLines = (newValue || "").split("\n");
  const maxLen = Math.max(oldLines.length, newLines.length);
  const result = [];

  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    if (oldLine !== undefined && newLine === undefined) {
      result.push({ value: `- ${oldLine}`, type: "removed" });
    } else if (oldLine === undefined && newLine !== undefined) {
      result.push({ value: `+ ${newLine}`, type: "added" });
    } else if (oldLine !== newLine) {
      result.push({ value: `- ${oldLine}`, type: "removed" });
      result.push({ value: `+ ${newLine}`, type: "added" });
    } else {
      result.push({ value: `  ${newLine}`, type: "common" });
    }
  }

  return (
    <pre className="text-xs whitespace-pre-wrap break-all">
      {result.map((line, index) => {
        const color =
          line.type === "added"
            ? "bg-green-100 text-green-800"
            : line.type === "removed"
            ? "bg-red-100 text-red-800"
            : "text-gray-500";
        return (
          <span key={index} className={`block ${color}`}>
            {line.value}
          </span>
        );
      })}
    </pre>
  );
}
