const drawD3Chart = (data) => {

    document.getElementById("d3-js").style.display = "block";

    const d3Svg = document.getElementById("d3-js-svg");
    if(d3Svg != null){
        d3Svg.parentNode.removeChild(d3Svg);
    }
    /* Set the dimensions and margins of the graph */
    const   margin = {top: 20, right: 20, bottom: 30, left: 75}
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    /* Parse the date/time - I don't think I need to do this */
    const parseTime = d3.timeParse("%b/%d/%y");

    /* Set the ranges */
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    /* Define the line */
    const valueline1 = d3.line()
        .x(function(d){
            return x(d.date);
        })
        .y(function(d){
            return y(d.confirmed);
        });

    const valueline2 = d3.line()
        .x(function(d){
            return x(d.date);
        })
        .y(function(d){
            return y(d.deaths);
        });

    const valueline3 = d3.line()
        .x(function(d){
            return x(d.date);
        })
        .y(function(d){
            return y(d.recovered);
        });

    /* Append the svg object to the body of the page */
    /* Append a group element (g) to the svg */
    /* Move the group element to the top left margin */
    const svg = d3.select("#d3-js")
        .append("svg")
            .attr("id", "d3-js-svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*  
        Since the data is already available in a constant, I don't need to use this:
            d3.json('url').then(function(data){
        to get the data from a url
    */
    /* createHeadline(data); */
    if(data.length !== 0){
        data.forEach(function(d){
            d.date = new Date(d.Date);
            d.confirmed = d.Confirmed;
            d.deaths = d.Deaths;
            d.recovered = d.Recovered;
        })

        /* Scale the range of the data */
        x.domain(d3.extent(data, function(d){
            return d.date;
        }));
        y.domain([0, d3.max(data, function(d){
            return Math.max(d.confirmed, d.deaths, d.recovered);
        })]);
    
        /* Add the valueline path */
        svg.append("path")
            .data([data])
            .attr("class", "line1")
            .attr("d", valueline1)
            .attr("data-legend", function(d){
                return d.name;
            });

        svg.append("path")
            .data([data])
            .attr("class", "line2")
            .attr("d", valueline2)
            .attr("data-legend", function(d){
                return d.name;
            });

        svg.append("path")
            .data([data])
            .attr("class", "line3")
            .attr("d", valueline3)
            .attr("data-legend", function(d){
                return d.name;
            });
    
        /* Add the x axis */
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x-axis")
            .call(d3.axisBottom(x));
    
        /* Add the y axis */
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));

        /* TO DO: Add the legend */
        /* legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(50,30)")
            .call(d3.legend); */
    }
}