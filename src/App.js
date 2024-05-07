import React, { Component } from 'react';
import './App.css';
import Child1 from './Child1';
import Child2 from './Child2';
import * as d3 from 'd3';
import sampleData from './SampleDataset.csv';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], selected_category: 'A' }
  }


  componentDidMount() {
    var self = this
    d3.csv(sampleData, function (d) {
      return {
        x: parseInt(d.x),
        y: parseInt(d.y),
        category: d.category
      }
    })
      .then(function (csv_data) {
        self.setState({ data: csv_data })
        console.log(csv_data)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  render() {
    console.log('Render is called')
    return (
      <div className='parent'>
        <div className='child1'>
          <Child1 data={this.state.data}>

          </Child1>
        </div>
        <select className='dropdown' onChange={(event) => this.setState({ selected_category: event.target.value })}>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <div className='child2'>
          <Child2 data={this.state.data} selected_category={this.state.selected_category}>

          </Child2>
        </div>
      </div>
    );
  }
}

export default App;
