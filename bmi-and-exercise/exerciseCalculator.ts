interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  hours: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 1000) throw new Error("Too many arguments");

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Provided values were not numbers!");
  }

  const hours = args.slice(3).map((hour) => {
    const num = Number(hour);
    if (isNaN(num)) {
      throw new Error("Provided values were not numbers!");
    }
    return num;
  });

  return {
    target,
    hours,
  };
};

const calculateExercises = (target: number, hours: number[]): Result => {
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
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export default { calculateExercises };
