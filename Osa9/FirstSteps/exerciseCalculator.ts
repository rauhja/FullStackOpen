interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (exerciseHours: number[], targetHours: number) => {
  const trainingDays = exerciseHours.filter((item) => item > 0);
  const trainingHours = trainingDays.reduce((acc, item) => acc + item, 0);
  const targetMet = exerciseHours.map((exercise) => exercise >= targetHours);
  const success = !targetMet.includes(false);
  const successRate =
    (targetMet.filter((item) => item).length / exerciseHours.length) * 100;

  let rating;
  if (successRate < 33.33) {
    rating = 1;
  } else if (successRate < 66.66) {
    rating = 2;
  } else {
    rating = 3;
  }

  let ratingDescription;
  if (rating === 1) {
    ratingDescription = "totally disaster";
  } else if (rating === 2) {
    ratingDescription = "not too bad but could be better";
  } else {
    ratingDescription = "great job!";
  }

  const average = trainingHours / exerciseHours.length;

  return {
    periodLength: exerciseHours.length,
    trainingDays: trainingDays.length,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
