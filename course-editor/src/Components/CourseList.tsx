import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export interface Course {
  courseId: string;
  instructorName: string;
  courseName: string;
  tags: string[];
  students: { name: string }[];
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  if (courses === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Courses</h1>
      <TableContainer component={Paper}>
        <Table aria-label="courses table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Course ID</StyledTableCell>
              <StyledTableCell>Instructor</StyledTableCell>
              <StyledTableCell>Course Name</StyledTableCell>
              <StyledTableCell>Tags</StyledTableCell>
              <StyledTableCell>Students</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <StyledTableRow key={course.courseId}>
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.instructorName}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.tags.join(", ")}</TableCell>
                <TableCell>
                  <ul>
                    {course.students.map((student, index) => (
                      <li key={index}>{student.name}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Link
                    to={{
                      pathname: `/course/${course.courseId}`,
                      state: { courseData: course },
                    }}
                  >
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CourseList;
