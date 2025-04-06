import Papa from "papaparse";

export function parseCsv(csvString: string) {
  return Papa.parse(csvString, { header: true });
}
