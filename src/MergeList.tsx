import { StudentToMerge } from "./App";

interface MergeListProps {
    students: StudentToMerge[];
    onLinkClick: (student: StudentToMerge) => void
}

export default function MergeList({students, onLinkClick}: MergeListProps ) {

    const tableRows = students.map((student, key) => {
        return (
            <tr key={key}>
                <td>{student.Forename}</td>
                <td>{student.Surname}</td>
                <td>{student.DateOfBirth}</td>
                <td>{student.MISStudentId}</td>
                <td>{student.MergeIntoId}</td>
                <td><a href={student.Link()} target="_blank" onClick={() => onLinkClick(student)}>Open</a></td>
            </tr>
        );
    });

    return (<>{tableRows}</>);
}