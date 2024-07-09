import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import adminInstance from "../../../../Interceptors/AdminInterceptor";
import { useEffect, useState } from "react";

function Chart() {
  const [revenueData, setRevenueData] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);

  const fetchRevenue = async () => {
    const response = await adminInstance.get("/admin/revenue");
    const data = response.data.data;

    const revenues = data.map((item) => item.totalRevenue);
    const dates = data.map((item) => item.date);

    setRevenueData(revenues);
    setDateLabels(dates);
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <div
      className="chart-container"
      style={{
        width: "100%",
        paddingBottom: "100%",
        position: "relative",
        margin: "30px auto",
      }}
    >
      <div
        className="chart-wrapper"
        style={{ position: "absolute", top: 0, left: 0, width:"100%", height:"100%"
         }}
      >
        <Line
          data={{
            labels: dateLabels,
            datasets: [
              {
                label: "REVENUE",
                data: revenueData,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                fill: true,
                tension: 0.4,
              },
         
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Revenue Over Time",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Amount",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Chart;
