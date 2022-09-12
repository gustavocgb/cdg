const getDaysInCurrentMonth = (): number => {
  const date = new Date();

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getMaxRequestsPerDay = (maxRequestsPerMonth: number): number => {
  return Math.trunc(maxRequestsPerMonth / getDaysInCurrentMonth());
}
