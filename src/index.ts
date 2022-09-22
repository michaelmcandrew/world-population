import { estimates } from "./data";

/**
 * Look up an UN estimated population for a specific year
 */
function lookupPopulation(date: Date) {
  const result = estimates.find((e) => e.year == date.getFullYear());
  if (result) {
    return result.pop * 1000;
  } else {
    throw new Error("Year out of range.");
  }
}

/**
 * Estimate the world population at a moment in time. Defaults to now.
 */
export function estimate(date = new Date()) {
  const start = new Date(date.getFullYear(), 0);
  const end = new Date(date.getFullYear() + 1, 0);

  const startPop = lookupPopulation(start);
  const endPop = lookupPopulation(end);

  const increase = endPop - startPop;
  const progress =
    (date.getTime() - start.getTime()) / (end.getTime() - start.getTime());

  return Math.round(startPop + increase * progress);
}

/**
 * The average number of milliseconds between each birth at a moment in time.
 * Defaults to now. Useful for incrementing counters.
 */
export function interval(date = new Date()) {
  const start = new Date(date.getFullYear(), 0);
  const end = new Date(date.getFullYear() + 1, 0);

  const startPop = lookupPopulation(start);
  const endPop = lookupPopulation(end);

  const increase = endPop - startPop;
  const length = end.getTime() - start.getTime();

  return Math.round(length / increase);
}

/**
 * Estimate the date that the population will reach a certain value (for the
 * first time)
 * @param population
 */
export function estimateDate(population: number) {
  const populationThousands = population / 1000;

  // Find first year with a population larger that the population.
  const after = estimates.find((n) => n.pop > populationThousands);
  if (!after) {
    throw new Error("Population not predicted to reach " + population);
  }

  // And the year before.
  const before = estimates.find((n) => n.year == after.year - 1);
  if (!before) {
    throw new Error("Data not available.");
  }

  // Assuming linear growth, what percentage of the year will have elapsed
  // before we reach the population?
  const percentageThroughYear =
    (populationThousands - before.pop) / (after.pop - before.pop);

  // How many milliseconds are there in this year?
  const start = new Date(before.year, 0);
  const end = new Date(after.year, 0);
  const milliseconds = end.getTime() - start.getTime();

  // Calculate the instant we will hit this population.
  const instant = new Date(
    start.getTime() + milliseconds * percentageThroughYear
  );

  return instant;
}
