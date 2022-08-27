export const ChartTypesObject = {
  1: "bar",
  2: "pie",
  bar : "bar",
  pie : "pie",
  doughnut : "doughnut",
  line : "line",
  polarArea : "polarArea",
  radar : "radar",
}

 export type ChartTypesType = typeof ChartTypesObject[keyof typeof ChartTypesObject];

export const ChartTypesArray = [... new Set(Object.values(ChartTypesObject))];
