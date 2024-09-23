import React from "react";
import { DataItem } from "../hooks/useFilter";

interface FileActionsProps {
  setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
  filteredData: DataItem[];
}

const FileActions: React.FC<FileActionsProps> = ({ setData, filteredData }) => {
  const handleLoadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      setData(jsonData);
    }
  };

  const handleSaveFile = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleLoadFile} />
      <button onClick={handleSaveFile}>Save as JSON</button>
    </div>
  );
};

export default FileActions;
