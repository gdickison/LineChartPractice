const drawChartJS = (data) => {

    document.getElementById("chartjs-chart").style.display = "block";
    clearOldChartJs();

    const ctx = document.getElementById("chart-js");

    // Global options
    Chart.defaults.global.defaultFontColor = "black";
    Chart.defaults.global.defaultFontSize = 16;

    // Set up the arrays for chartJSData
    const labels = [];
    const confirmedData = [];
    const deathsData = [];
    const recoveredData = [];
    for(var i = 0; i < data.length; i++){
        labels.push(new Date(data[i].Date).toLocaleDateString());
        confirmedData.push(data[i].Confirmed);
        deathsData.push(data[i].Deaths);
        recoveredData.push(data[i].Recovered);
    }

    const covidLineChart = new Chart(ctx,{
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Confirmed",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(225,0,0,0.4)",
                    borderColor: "blue",
                    borderCapStyle: "square",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "blue",
                    pointBackgroundColor: "blue",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "yellow",
                    pointHoverBorderColor: "blue",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: confirmedData,
                    spanGaps: false
                },
                {
                    label: "Deaths",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "red",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "yellow",
                    pointHoverBorderColor: "red",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: deathsData,
                    spanGaps: false
                },
                {
                    label: "Recovered",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "green",
                    borderColor: "green",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "green",
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: "yellow",
                    pointHoverBorderColor: "green",
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: recoveredData,
                    spanGaps: false
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Cases',
                        fontSize: 20
                    }
                }]
            }
        }
    });
};

const clearOldChartJs = () => {
    let e = document.getElementById("chartjs-chart");
    let child = e.lastElementChild;
    while(child){
        e.removeChild(child);
        child = e.lastElementChild;
    }
    let newCanvas = document.createElement("canvas");
    newCanvas.id = ("chart-js");
    e.appendChild(newCanvas);
}