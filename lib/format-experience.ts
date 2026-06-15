export function formatExperience(value: number | string) {
  if (typeof value === "string") return `${value} років`;
  if (value % 10 === 1 && value % 100 !== 11) return `${value} рік`;
  if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) return `${value} роки`;
  return `${value} років`;
}
