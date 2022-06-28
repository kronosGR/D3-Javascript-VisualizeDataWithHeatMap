d3.json(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
).then((data) => {
  console.log(data);
  // baseTemperature: 8.66
  // monthlyVariance: (3153) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
  //  0:
  //     month: 1
  //     variance: -1.366
  //    year: 1753

  const svg = d3
    .select('#svg_container')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

  const xScale = d3
    .scaleBand()
    .domain([
      d3.min(data.monthlyVariance, (d) => d.year),
      d3.max(data.monthlyVariance, (d) => d.year),
    ])
    .range([0, 600])
    .padding(0.01);
  svg.append('g').call(d3.axisBottom(xScale)).attr('transform', 'translate(60,240)');

  const yScale = d3.scaleBand().domain([0, 11]).range([0, 240]).padding(0.01);
  svg.append('g').call(d3.axisLeft(yScale)).attr('transform', 'translate(60,0)');

  svg
    .selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('x', xScale(data.monthlyVariance.year))
    .attr('y', yScale(data.monthlyVariance.month))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .style('fill', 'red');
});
