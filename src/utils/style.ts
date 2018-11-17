const translate = (unit: string): ((x: number, y: number) => string) => {
  return (x: number, y: number) => `translate(${x}${unit}, ${y}${unit})`;
};

export const translatePx = translate("px");

export const translatePer = translate("%");
