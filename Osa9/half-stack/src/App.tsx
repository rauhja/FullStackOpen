interface HeaderProps {
  name: string;
}
const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Part = ({ name, exerciseCount }: CoursePart) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
};

interface ContentProps {
  course: CoursePart[];
}

const Content = ({ course }: ContentProps) => {
  return (
    <div>
      {course.map((part) => (
        <Part
          key={part.name}
          name={part.name}
          exerciseCount={part.exerciseCount}
        />
      ))}
    </div>
  );
};

interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content course={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
