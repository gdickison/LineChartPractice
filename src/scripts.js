const createOptions = (data) => {
    const allCountries = document.getElementById("allCountries")
    for(var i = 0; i < data.length; i++){
        const countryOption = document.createElement("option");
        countryOption.value = data[i].Slug;
        countryOption.innerHTML = data[i].Country.includes('Taiwan')
            ? 'Taiwan'
            : data[i].Country;
        allCountries.appendChild(countryOption);
    }
};

const createChart = () {
    // set which chart will be drawn
}

function createHeadline(data){
    const selectedCountry = document.getElementById("allCountries");
    const selectedCountryName = selectedCountry.options[selectedCountry.selectedIndex].text.includes('Taiwan')
        ? 'Taiwan'
        : selectedCountry.options[selectedCountry.selectedIndex].text;

    const headlineContainer = document.getElementById("chart-headline");
    headlineContainer.innerHTML = '';

    const dataTableHeadline = document.createElement("h3");

    if(data.length === 0){
        dataTableHeadline.innerHTML = selectedCountryName + " has not reported any confirmed cases";
        headlineContainer.appendChild(dataTableHeadline);
    }

    else {
        dataTableHeadline.innerHTML = "Total confirmed cases, recoveries, and deaths in " + selectedCountryName + " as of " + new Date().toLocaleDateString();
        headlineContainer.appendChild(dataTableHeadline);
    }
}

/*********************************************/
/*********************************************/
/**************               ****************/
/*                  CHARTS                   */
/**************               ****************/
/*********************************************/
/*********************************************/

/* **************** */
/*     Chart JS     */
/* **************** */




