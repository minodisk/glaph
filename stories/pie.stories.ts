// import { document, console } from "global";
import { storiesOf } from "@storybook/html";
import { Chart, Pie } from "../src/index";

storiesOf("PieChart", module).add("single", () => {
  const pie = new Pie();
  pie.render([
    {
      ratio: 0.4,
      color: 0x02547d,
      payload: {
        ticker: "AAAA",
        amount: 4000,
      },
    },
    {
      ratio: 0.3,
      color: 0x0284a8,
      payload: {
        ticker: "BBBB",
        amount: 3000,
      },
    },
    {
      ratio: 0.2,
      color: 0x02bec4,
      payload: {
        ticker: "CCCC",
        amount: 2000,
      },
    },
    {
      ratio: 0.08,
      color: 0xa9e8dc,
      payload: {
        ticker: "DDDD",
        amount: 800,
      },
    },
    {
      ratio: 0.02,
      color: 0xe1f7e7,
      payload: {
        ticker: "EEEE",
        amount: 200,
      },
    },
  ]);
  const chart = new Chart(600, 400);
  chart.addChart(pie);
  return chart.element;
});
