import { CSVImporter } from "csv-import-react";
import { useState } from "react";
import { DataRow } from "./App";

export interface CSVUploaderProps {
  onDataUploaded: (data: DataRow[]) => void;
}

interface CSVUploaderData {
  rows: CSVUploaderRow[];
}

interface CSVUploaderRow {
  index: number;
  values: DataRow;
}

export default function CSVUploader({onDataUploaded}: CSVUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleComplete(data: CSVUploaderData) {
    onDataUploaded(data.rows.map(x => x.values))
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open CSV Importer</button>

      <CSVImporter
        modalIsOpen={isOpen}
        modalOnCloseTriggered={() => setIsOpen(false)}
        darkMode={true}
        onComplete={(data) => handleComplete(data)}
        template={{
          columns: [
            {
              name: "Student ID",
              key: "MISStudentId",
              required: true,
            },
            {
              name: "Forename",
              key: "Forename",
              required: true,
            },
            {
              name: "Surname",
              key: "Surname",
              required: true,
            },
            {
              name: "Date of Birth",
              key: "DateOfBirth",
              required: true,
            },
          ],
        }}
      />
    </>
  );
}