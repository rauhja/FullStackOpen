interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
