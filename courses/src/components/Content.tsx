import { CoursePart } from "../types";
import { Part } from "./Part";

interface ContentProps {
  courses: CoursePart[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((course, index) => (
        <p key={index}>
          <Part course={course} />
        </p>
      ))}
    </div>
  );
};
