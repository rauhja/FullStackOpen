import type { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const renderPart = () => {
    switch (coursePart.kind) {
      case "basic":
        return <em>{coursePart.description}</em>;
      case "group":
        return <>project exercises {coursePart.groupProjectCount}</>;
      case "background":
        return (
          <>
            <em>{coursePart.description}</em>
            submit to {coursePart.backgroundMaterial}
          </>
        );
      case "special":
        return (
          <>
            <em>{coursePart.description}</em>
            required skills: {coursePart.requirements.join(", ")}
          </>
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "1rem",
      }}
    >
      <b>
        {coursePart.name} {coursePart.exerciseCount}
      </b>
      {renderPart()}
    </div>
  );
};

export default Part;
