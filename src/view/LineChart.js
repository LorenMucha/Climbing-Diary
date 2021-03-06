const LineChartController = require("../controller/LineChartController");
const d3 = require("d3");

class LineChart extends LineChartController{
    create(_filter){
        let container = $(`${this.id}`),
            // set the dimensions and margins of the graph
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            width=container.width()- margin.left - margin.right,
            height=$(window).height()/3- margin.top - margin.bottom;

        //create the DOM Element
        container.html(`<svg width="${width}" height="${height}"></svg>`);

        climbing_taskRepo.getLineChartData(climbing_view.getFilter())
            .then((data)=> {

                // parse the date / time
                var parseTime = d3.timeParse("%Y");

                // set the ranges
                var x = d3.scaleTime().range([0, width]);
                var y = d3.scaleLinear()
                    .range([height, 0]);

                // define the line
                var valueline = d3.line()
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(d.stat); });

                // append the svg obgect to the body of the page
                // appends a 'group' element to 'svg'
                // moves the 'group' element to the top left margin
                var svg = d3.select("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                // Get the data

                    // format the data
                    data.forEach(function(d) {
                        d.date = parseTime(d.date.toString());
                        d.stat = +d.stat;
                    });

                    // Scale the range of the data
                    x.domain(d3.extent(data, function(d) { return d.date; }));
                    y.domain(d3.extent(data, function(d) { return d.stat; }));

                    // Add the valueline path.
                    svg.append("path")
                        .data([data])
                        .attr("class", "line")
                        .attr("d", valueline);

                    // Add the X Axis
                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x));

                    // Add the Y Axis
                    svg.append("g")
                        .call(d3.axisLeft(y));

                // 12. Appends a circle for each datapoint
                svg.selectAll(".dot")
                    .data(data)
                    .enter().append("circle") // Uses the enter().append() method
                    .attr("class", "dot") // Assign a class for styling
                    .attr("id",function(d){return d.stat})
                    .attr("cx", function(d) { return x(d.date) })
                    .attr("cy", function(d) { return y(d.stat) })
                    .attr("r", 8)
                    .on("mousemove", this.handleMouseOver)
                    .on("click", this.handleMouseOver)
                    .on("mouseout", this.handleMouseOut);

        });
    }
}

module.exports = LineChart;