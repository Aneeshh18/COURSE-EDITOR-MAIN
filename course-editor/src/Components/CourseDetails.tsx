import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import AutocompleteInput from "./AutocompleteInput";

interface Student {
  name: string;
}

interface Tag {
  tags: string[];
}

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
};

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const courseData: Course | undefined = location.state?.courseData;
  console.log(courseData, courseId, location.state);
  const [students, setStudents] = useState<Student[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchStudentsAndTags = async () => {
      try {
        const [studentsData, tagsData] = await Promise.all([
          fetchData<Student[]>(
            "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/students.json"
          ),
          fetchData<Tag>(
            "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json"
          ),
        ]);
        setStudents(studentsData.enrolledList);
        setTags(tagsData.tags);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentsAndTags();
  }, []);

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      const newTags = [...tags, event.target.value];
      setTags(newTags);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (students === undefined || tags === undefined) {
    return <CircularProgress />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>Edit Course Details</h1>
      <form onSubmit={handleSubmit}>
        <Box marginBottom={2}>
          <TextField
            id="course"
            label="Course"
            variant="outlined"
            // value={course.name}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            id="instructor"
            label="Instructor"
            variant="outlined"
            // value={course.name}
          />
        </Box>

        <Box marginBottom={2}>
          <AutocompleteInput
            options={tags}
            label="Tags"
            onSelect={handleAddTag}
          />
        </Box>
        <Box marginBottom={2}>
          <AutocompleteInput
            options={students.map((student) => student.name)}
            label="Students"
            // onSelect={handleAddStudent}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          UPDATE COURSE
        </Button>
      </form>
    </Box>
  );
};

export default CourseDetails;
