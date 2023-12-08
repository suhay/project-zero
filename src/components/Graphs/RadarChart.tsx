import { Radar } from "react-chartjs-2";
import {
  RadialLinearScale,
  Chart,
  PointElement,
  LineElement,
  Legend,
  Filler,
} from "chart.js";

Chart.register(RadialLinearScale, PointElement, LineElement, Legend, Filler);

export function RadarChart() {
  return (
    <Radar
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "black",
              font: {
                size: 16,
              },
            },
          },
        },
        scales: {
          r: {
            angleLines: {
              display: false,
              lineWidth: 3,
            },
            pointLabels: {
              color: "black",
              font: {
                size: 16,
              },
            },
            grid: {
              circular: true,
              lineWidth: 1,
            },
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
        elements: {
          line: {
            borderWidth: 3,
            fill: true,
          },
        },
      }}
      data={{
        labels: [
          "Materials",
          "Packaging",
          "Distribution",
          "Certifications",
          "End of Life",
        ],
        datasets: [
          {
            fill: true,
            label: "Kitchen",
            data: [8, 6, 5, 9, 7],
            backgroundColor: "rgba(25, 99, 132, 0.2)",
            borderColor: "rgba(25, 99, 132, 1)",
            borderWidth: 1,
            pointRadius: 1,
            pointHoverRadius: 0,
            pointHitRadius: 0,
            pointBorderWidth: 0,
          },
          {
            fill: true,
            label: "Bathroom",
            data: [2, 5, 6, 1, 3],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            pointRadius: 1,
            pointHoverRadius: 0,
            pointHitRadius: 0,
            pointBorderWidth: 0,
          },
        ],
      }}
    />
  );
}
