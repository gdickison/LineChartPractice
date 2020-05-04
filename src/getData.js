const getData = (data) => {
    for(var i = 0; i < data.length; i++){
        let date = new Date(data[i].Date).toLocaleDateString();
        console.log('Date', date);
        console.log('Confirmed', data[i].Confirmed);
        console.log('Deaths', data[i].Deaths);
        console.log('Recovered', data[i].Recovered);
    }
}