interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const totalHours = hours.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;
  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.2) {
    // 20% over the target
    rating = 3;
    ratingDescription = "excellent";
  } else if (average < target) {
    // below the target
    rating = 1;
    ratingDescription = "could be better";
  } else {
    // between target and 20% over target
    rating = 2;
    ratingDescription = "well done";
  }

  return {
    periodLength: periodLength,
    trainingDays: hours.reduce(
      (count, hour) => (hour > 0 ? count + 1 : count),
      0,
    ),
    success: target >= average,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
