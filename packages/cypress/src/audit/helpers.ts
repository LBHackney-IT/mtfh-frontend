interface MetricValue {
  score?: number;
  numericValue?: number;
}

type Metrics = Record<string, MetricValue>;

type Thresholds = Record<string, number>;

export const computeCategories = (
  categories: Record<string, { score: number }>,
): Metrics =>
  Object.fromEntries(
    Object.entries(categories).map(([key, value]) => [key, { score: value.score * 100 }]),
  );

export const computeAudits = (
  audits: Record<string, { numericValue?: number }>,
): Metrics =>
  Object.fromEntries(
    Object.entries(audits).map(([key, value]) => [
      key,
      { numericValue: value.numericValue },
    ]),
  );

export const compareWithThresholds = (metrics: Metrics, thresholds: Thresholds) => {
  const errors: string[] = [];
  const results: string[] = [];

  Object.entries(thresholds).forEach(([key, threshold]) => {
    const metric = metrics[key];

    if (!metric) {
      return;
    }

    if (metric.numericValue !== undefined) {
      if (threshold < metric.numericValue) {
        errors.push(
          `${key} record is ${metric.numericValue} and is over the ${threshold} threshold`,
        );
      } else {
        results.push(
          `${key} record is ${metric.numericValue} and threshold was ${threshold}`,
        );
      }
    } else if (metric.score !== undefined) {
      if (threshold > metric.score) {
        errors.push(
          `${key} record is ${metric.score} and is under the ${threshold} threshold`,
        );
      } else {
        results.push(`${key} record is ${metric.score} and threshold was ${threshold}`);
      }
    }
  });

  return { errors, results };
};
