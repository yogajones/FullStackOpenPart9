import { CoursePart } from "../types";

interface PartProps {
  course: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const Part = ({ course }: PartProps) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <p>{course.description}</p>
          <br />
        </div>
      );
    case "group":
      return (
        <div>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <p>project exercises: {course.groupProjectCount}</p>
          <br />
        </div>
      );
    case "background":
      return (
        <div>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <p>{course.description}</p>
          <p>submit to {course.backgroundMaterial}</p>
          <br />
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <p>{course.description}</p>
          <p>required skills: {course.requirements.join(", ")}</p>
          <br />
        </div>
      );
    default:
      return assertNever(course);
  }
};
