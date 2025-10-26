import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  course: CoursePart[];
}

const Content = ({ course }: ContentProps) => {
  return (
    <div>
      {course.map((part, idx) => (
        <Part key={idx} coursePart={part} />
      ))}
    </div>
  );
};

export default Content;
