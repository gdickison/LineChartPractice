const createChartJS = () => {
    const selectedCountry = document.getElementById("allCountries");
    const selectedCountrySlug = selectedCountry.options[selectedCountry.selectedIndex].value;

    const urls = [
        'https://api.covid19api.com/total/dayone/country/' + selectedCountrySlug + '/status/confirmed',
        'https://api.covid19api.com/total/dayone/country/' + selectedCountrySlug + '/status/recovered',
        'https://api.covid19api.com/total/dayone/country/' + selectedCountrySlug + '/status/deaths'
    ];

    const requests = urls.map(url => fetch(url));

    Promise.all(requests)
        .then((responses) => {responses.forEach(
            response => {
                if(!response.ok){
                    throw Error(response.statusText);
                }
            }
        );
        return responses;
    })
        .then((responses) => Promise.all(responses.map(data => data.json())))
        .then((data) => {
            data = combineChartJSData(data);
            drawChartJS(data);
            console.log(data);
        });
}

const combineChartJSData = (data) => {
    const newDataJsonArray = [];
    for(var i = 0; i < data[0].length; i++){
        newDataJsonArray.push({
            "Country": data[0][i].Country,
            "Confirmed": data[0][i].Cases,
            "Recovered": data[1][i].Cases,
            "Deaths": data[2][i].Cases,
            "Date": data[0][i].Date
        });
    }
    return newDataJsonArray;
}

const drawChartJS = (data) => {
    const canvas = document.getElementById("chart-js");
    const ctx = canvas.getContext('2d');

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

    const chartJSData = {
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
    };

    console.log(chartJSData);

    const options = {
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
        };
    
    const covidLineChart = new Chart(ctx, {
        type: "line",
        data: chartJSData,
        options: options
    });
};

// Notice the scaleLabel at the same level as Ticks