import { StudentToMerge } from "./App";

interface MergeListProps {
    students: StudentToMerge[];
    onLinkClick: (rowNumber: number) => void
}

export default function MergeList({students, onLinkClick}: MergeListProps ) {

    const tableRows = students.map((student, key) => {
        return (
            <tr key={key} className={student.IsOpened ? 'opened' : ''}>
                <td>{student.Forename}</td>
                <td>{student.Surname}</td>
                <td>{student.DateOfBirth}</td>
                <td>{student.MISStudentId}</td>
                <td>{student.MergeIntoId}</td>
                <td><a href={student.Link()} target="_blank" onClick={() => onLinkClick(key)}>Open</a></td>
            </tr>
        );
    });

    return (<>
        <table>
            <thead>
                <tr>
                    <th>Forename</th>
                    <th>Surname</th>
                    <th>Date of Birth</th>
                    <th>Original Student ID</th>
                    <th>New Student ID</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </>);
}