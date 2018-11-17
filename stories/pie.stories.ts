// import { document, console } from "global";
import { storiesOf } from "@storybook/html";
import { Chart, Pie } from "../src/index";

const data1 = [
  {
    ratio: 0.4,
    color: 0xf7473b,
    payload: {
      ticker: "AAAA",
      amount: 4000,
    },
  },
  {
    ratio: 0.3,
    color: 0xf78154,
    payload: {
      ticker: "BBBB",
      amount: 3000,
    },
  },
  {
    ratio: 0.2,
    color: 0xf2c14e,
    payload: {
      ticker: "CCCC",
      amount: 2000,
    },
  },
  {
    ratio: 0.08,
    color: 0x3b8b88,
    payload: {
      ticker: "DDDD",
      amount: 800,
    },
  },
  {
    ratio: 0.02,
    color: 0x2176ae,
    payload: {
      ticker: "EEEE",
      amount: 200,
    },
  },
];
const data2 = [
  {
    ratio: 0.2,
    color: 0xf75e54,
    payload: {
      item: "A-1",
      amount: 2000,
    },
  },
  {
    ratio: 0.1,
    color: 0xf7766d,
    payload: {
      item: "A-2",
      amount: 1000,
    },
  },
  {
    ratio: 0.06,
    color: 0xf78d85,
    payload: {
      item: "A-3",
      amount: 600,
    },
  },
  {
    ratio: 0.04,
    color: 0xf7a49e,
    payload: {
      item: "A-4",
      amount: 400,
    },
  },
];

storiesOf("PieChart", module)
  .add("single", () => {
    const chart = new Chart(600, 400);
    const pie = new Pie();
    pie.render(data1);
    chart.addChart(pie);
    return chart.element;
  })
  .add("dounuts", () => {
    const chart = new Chart(600, 400);
    const pie = new Pie({
      radiusRatioFrom: 0.6,
      radiusRatioTo: 1,
    });
    pie.render(data1);
    chart.addChart(pie);
    return chart.element;
  })
  .add("double", () => {
    const chart = new Chart(600, 400);
    const pie1 = new Pie();
    pie1.render(data1);
    chart.addChart(pie1);
    const pie2 = new Pie();
    pie2.render(data2);
    chart.addChart(pie2);
    return chart.element;
  });
