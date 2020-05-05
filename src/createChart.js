const createChart = () => {
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
            console.log(data);
            drawD3Chart(data);
            drawChartJS(data);
            drawGoogleChart(data);
            drawChartSelectButtons();
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
