import React from 'react';
import { useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {insertionsortanimations,bubblesortanimations, getMergeSortAnimations, heapsortanimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './sortingVisualizer.css';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossorigin="anonymous"
/>

// Change this value for the numbe of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 123;

// This is the main color of the array bars.
const PRIMARY_COLOR ="#6930c3";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }
  
  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 700));
    }
    this.setState({array});
  }


  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : 'turquoise';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 7);
      } else {
        
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 7);
      }
    }
  }


  bubbleSort() {
    //console.log(this.state.array)
    const animations = bubblesortanimations(this.state.array);
    
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      if (animations[i] === null){
        continue;
      }
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : 'turquoise';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        if (animations[i].length === 4) {
          setTimeout(() => {
            const [barOneIdx,barTwoIdx, newHeight1,newHeight2] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${newHeight2}px`;
            barTwoStyle.height = `${newHeight1}px`;
          }, i * 10);

        }else{
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }
    }
}


  insertionSort() {
    const animations = insertionsortanimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : 'turquoise';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 4);
      } else {
        
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 4);
      }
    }
  }

  heapSort() {
    const [animations,count] = heapsortanimations(this.state.array)
    for (let i = 0;i< count;i++){
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
       const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : 'turquoise';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 18);
      
    }
    for (let i = count + 1; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : 'turquoise';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 18);
      } else {
        
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 18);
      }
    }
  }

  

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const arr = heapsortanimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, arr));
    }
  }

  render() {
    const {array} = this.state;
    const navbarInstance = (
        <>
  <Navbar bg="dark" variant="dark">
    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button onClick={() => refreshPage()}>Generate New Array</button>
    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
    <Navbar.Brand href="#home">Sorting Visualizer</Navbar.Brand>
    
    <Nav className="ml-auto">
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        &nbsp;&nbsp;&nbsp; 
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        &nbsp;&nbsp;&nbsp; 
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        &nbsp;&nbsp;&nbsp; 
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
    </Nav>
    
  </Navbar>
  
</>

    );
    return (
      <div>

        {navbarInstance}
      <div className="array-container">
          
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,

            }}></div>
            

        ))}
    
        
        
        
        {/* \*<button onClick={() => this.testSortingAlgorithms()}>
          //Test Sorting Algorithms
        </button> */}
      </div>
      </div>  
    );
  }
}


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
function refreshPage() {
  window.location.reload(false);
}
const MyComponent = () => {

  const [ value, setValue ] = useState(0); 

  return (
    <RangeSlider
      value={value}
      onChange={changeEvent => setValue(changeEvent.target.value)}
    />
  );

};