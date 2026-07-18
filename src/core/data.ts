export type ElementData = {
  name: string;
  symbol: string;
  atomicNumber: number;
  electronicConfiguration: string;
  period: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  group:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "17"
    | "18";
  block: "s" | "p" | "d" | "f";
  category: string;

  mass: string;
  density: string;
  phase: "Gas" | "Liquid" | "Solid";
  boilingPoint?: string;
  meltingPoint?: string;
  electronegativity?: string;
  atomicRadius?: string;
  yearDiscovered: string;
};

export type TableData = ElementData[];

export async function loadElement() {
  const response = await fetch(`${import.meta.env.BASE_URL}data/elements.json`);

  const data: Record<string, ElementData> = await response.json();

  return Object.entries(data).map(([atomic_number, element]) => {
    element.atomicNumber = Number(atomic_number);
    return element;
  });
}
