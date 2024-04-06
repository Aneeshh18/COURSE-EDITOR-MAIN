import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./Components/CourseList";
import CourseDetails from "./Components/CourseDetails";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
