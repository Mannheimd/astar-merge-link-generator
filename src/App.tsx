import { ChangeEvent, useState } from 'react'
import './App.css'
import CSVUploader from './CSVUploader'
import MergeList from './MergeList';

export class DataRow {
  MISStudentId: number = -1;
  UPN: string = '';
  Forename: string = '';
  Surname: string = '';
  YearGroup: string = '';
  RegistrationGroup: string = '';
  DateOfBirth: string = '';
}

export class StudentToMerge extends DataRow {
  SchoolId: number = -1;
  MergeIntoId: number = -1;
  IsOpened: boolean = false;

  Link() {
    return `https://portal.astarattendance.com/MergeStudents?schoolId=${this.SchoolId}&firstStudentId=${this.MISStudentId}&secondStudentId=${this.MergeIntoId}`
  };
}

function App() {
  const [schoolId, setSchoolId] = useState<number>();
  const [dataRows, setDataRows] = useState<DataRow[]>([]);
  const [studentsToMerge, setStudentsToMerge] = useState<StudentToMerge[]>([]);
  
  function handleDataUploaded(data: DataRow[]) {
    setDataRows(data);
  }

  function calculateStudentsToMerge() {
    if (dataRows.length > 0 && schoolId !== undefined) {
      const studentsToMerge: StudentToMerge[] = [];
  
      for (let i = 0; i < dataRows.length; i++) {
        const currentStudent = dataRows[i];
  
        const matchingStudent = dataRows.find((student) => {
          return student.MISStudentId !== currentStudent.MISStudentId
          && student.DateOfBirth === currentStudent.DateOfBirth
          && student.Forename === currentStudent.Forename
          && student.Surname === currentStudent.Surname;
        })
  
        if (matchingStudent && matchingStudent.MISStudentId < currentStudent.MISStudentId) {
          const studentToMerge = new StudentToMerge;
          studentToMerge.MISStudentId = currentStudent.MISStudentId;
          studentToMerge.UPN = currentStudent.UPN;
          studentToMerge.Forename = currentStudent.Forename;
          studentToMerge.Surname = currentStudent.Surname;
          studentToMerge.YearGroup = currentStudent.YearGroup;
          studentToMerge.RegistrationGroup = currentStudent.RegistrationGroup;
          studentToMerge.DateOfBirth = currentStudent.DateOfBirth;
          studentToMerge.SchoolId = schoolId;
          studentToMerge.MergeIntoId = matchingStudent.MISStudentId;
  
          studentsToMerge.push(studentToMerge);
        }
      }
  
      setStudentsToMerge(studentsToMerge);
    }
  }

  function handleSchoolIdChange(event: ChangeEvent<HTMLInputElement>) {
    setSchoolId(event.target.valueAsNumber);
  }

  function handleGenerateClick() {
    calculateStudentsToMerge();
  }

  function handleLinkClick(rowNumber: number) {
    const nextStudentsToMerge = studentsToMerge.slice();
    nextStudentsToMerge[rowNumber].IsOpened = true;
    setStudentsToMerge(nextStudentsToMerge);
  }

  return (
    <>
      <h1>Student Merge Link Generator</h1>
      <div className="card">
        Enter school ID:
        <input type="number" value={schoolId} onChange={event => handleSchoolIdChange(event)} />
      </div>
      <div className="card">
        Upload a CSV export:
        <CSVUploader onDataUploaded={(data: DataRow[]) => handleDataUploaded(data)} />
      </div>
      <div className="card">
        <button onClick={() => handleGenerateClick()} disabled={schoolId === undefined || dataRows.length < 1}>Generate</button>
      </div>
      <div className="card">
        <MergeList students={studentsToMerge} onLinkClick={(rowNumber: number) => handleLinkClick(rowNumber)}></MergeList>
      </div>
    </>
  )
}

export default App
