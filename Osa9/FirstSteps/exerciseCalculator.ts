interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ParsedArgs {
  value1: number;
  value2: number[];
}

const parsedArguments = (args: string[]): ParsedArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!args.slice(2).every((arg) => !isNaN(Number(arg)))) {
    throw new Error("Provided values were not numbers!");
  }
  const value1 = Number(args[2]);
  const value2 = args.slice(3).map(Number);
  return { value1, value2 };
};

const exerciseCalculator = (
  exerciseHours: number[],
  targetHours: number
): Result => {
  const trainingDays = exerciseHours.filter((item) => item > 0).length;
  const trainingHours = exerciseHours.reduce((acc, item) => acc + item, 0);
  const targetMet = exerciseHours.map((exercise) => exercise >= targetHours);
  const success = !targetMet.includes(false);
  const successRate =
    (targetMet.filter((item) => item).length / exerciseHours.length) * 100;

  let rating: 1 | 2 | 3;
  if (successRate < 33.33) {
    rating = 1;
  } else if (successRate < 66.66) {
    rating = 2;
  } else {
    rating = 3;
  }

  const ratingDescription: Record<1 | 2 | 3, string> = {
    1: "total disaster",
    2: "not too bad but could be better",
    3: "great job!",
  };

  const average = trainingHours / exerciseHours.length;

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescription[rating],
    target: targetHours,
    average,
  };
};

if (require.main === module) {
  try {
    const { value1, value2 } = parsedArguments(process.argv);
    console.log(exerciseCalculator(value2, value1));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Something went wrong!", error.message);
    }
  }
}
