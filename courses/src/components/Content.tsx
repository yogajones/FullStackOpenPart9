interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courses: Course[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((course, index) => (
        <p key={index}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};
