const createChart = () => {
    const selectedButton = whichButton();

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
            data = combineData(data);
            createHeadline(data);
            document.getElementById("d3-js").style.display = "none";
            document.getElementById("chartjs-chart").style.display = "none";
            document.getElementById("google-chart").style.display = "none";
            if(selectedButton === "googlechart" && data.length > 1){
                drawGoogleChart(data);
            }
            if(selectedButton === "chartjs" && data.length > 1){
                drawChartJS(data);
            }
            if(selectedButton === "d3chart" && data.length > 1){
                drawD3Chart(data);
            }
        });
}

const combineData = (data) => {
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

const whichButton = () => {
    const btns = document.querySelectorAll('input[name="chart-select"]');
    let checkedButton;
    for(var btn of btns){
        if(btn.checked){
            checkedButton = btn.value;
        }
    }
    return checkedButton;
}
