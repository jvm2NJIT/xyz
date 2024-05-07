import React, { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  componentDidUpdate() {
    var data = this.props.data
    var filtered_data = data.filter(d => d.category.includes(this.props.selected_category));
    console.log(filtered_data)

    // Set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 40, left: 200},
      w = 800 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;
    
    var container = d3.select('.child2_svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .select('.g_2')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var x_data = filtered_data.map(item => item.x)
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);
    container.selectAll('.x_axis_g').data([0]).join('g').attr('class', 'x_axis_g')
      .attr('transform', `translate(0, ${h})`).call(d3.axisBottom(x_scale));
    
    // Add Y axis
    var y_data = filtered_data.map(item => item.y)
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll('.y_axis_g').data([0]).join('g').attr('class', 'y_axis_g')
      .attr('transform', `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    var tooltip = d3.select("body")
      .selectAll(".tooltip_div")
      .data([0])
      .join("div")
      .attr("class", "tooltip_div")
      .style("position", "absolute")
      .style("visibility", "hidden") 
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    container.selectAll('circle')
      .data(filtered_data)
      .join('circle')
      .attr('cx', function(d) {
        return x_scale(d.x);
      })
      .attr('cy', function(d) {
        return y_scale(d.y)
      })
      .attr('r', 3)
      .style('fill', '#69b3a2')
      .on("mouseover", (event, d) => {
        tooltip.html('x is: ' + d.x + '<br>y is: ' + d.y)  // sets the tooltip text to the node's size property
        tooltip.style("visibility", "visible");  // makes the tooltip visible
      })
      .on("mousemove", (event) =>
        tooltip
          .style("top", event.pageY - 10 + "px")  // positions the tooltip slightly above the cursor
          .style("left", event.pageX + 10 + "px")  // positions the tooltip to the right of the cursor
      )
      .on("mouseout", () => tooltip.style("visibility", "hidden"));  // hides the tooltip on mouseout

    // Add x label
    container
      .selectAll('.label')
      .data([0])
      .join('text')
      .attr('x', margin.left + (w - margin.left)/2)
      .attr('y', h + margin.bottom)
      .text('X')
    
    // Add y label
    container
      .selectAll('.label')
      .data([0])
      .join('text')
      .attr('x', margin.left - 40)
      .attr('y', h/2)
      .text('Y')

  }

  render() {
    return (
      <svg className='child2_svg'>
          <g className='g_2'></g>
      </svg>
    );
  }
}

export default Child2;