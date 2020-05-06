const drawGoogleChart = (data) => {

    document.getElementById("google-chart").style.display = "block";

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Date');
        chartData.addColumn('number', 'Confirmed');
        chartData.addColumn('number', 'Deaths');
        chartData.addColumn('number', 'Recovered');

        dataArray = [];

        for(var i = 0; i < data.length; i++){
            dataArray.push([
                new Date(data[i].Date).toLocaleDateString(),
                data[i].Confirmed,
                data[i].Deaths,
                data[i].Recovered
            ]);
        };

        chartData.addRows(dataArray);

        var options = {
            hAxis: {
            title: 'Days Since First Confirmed Case'
            },
            vAxis: {
            title: 'Cases'
            },
            backgroundColor: '#f1f8e9',
            legend: 'none'
        };

        var chart = new google.visualization.LineChart(document.getElementById('google-chart'));
        chart.draw(chartData, options);
    }

}
