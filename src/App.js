import React, { Component } from 'react';
import './App.css';
import {AppBar, Toolbar, Typography, FormGroup, FormControl, FormLabel, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme =>({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      svgWidth: 800,
      svgHeight: 800,
      numSartPoint: 3,
      probability: 0,
      startPoint: {
        x:0,
        y:0,
      },
      renderComponents:[
        [400,0],
        [0,800],
        [800,800],
      ]
    }
  }

  randomStartPoint = (min, max) =>{
    return ({
      x: Math.floor(Math.random() * (max - min) ) + min,
      y: Math.floor(Math.random() * (max - min) ) + min
    })
  }
  getRandomPoint = ()=>{
    return Math.floor(Math.random() * this.state.numSartPoint )
  }

  ChaosGame = () =>{
    const { renderComponents, svgWidth } = this.state;
    let startPoint = this.randomStartPoint(0, svgWidth);
    let allPoints = [[startPoint.x, startPoint.y]];
    for (let i = 0; i < 20000; i++) {
      const randomPoint = renderComponents[this.getRandomPoint()];
      // const dist = Math.sqrt((startPoint.x - randomPoint[0]) ** 2 + (startPoint.y - randomPoint[1])** 2);
      const middlePoint = {
        x: (startPoint.x + randomPoint[0]) /2.0,
        y: (startPoint.y + randomPoint[1]) /2.0
      }
      allPoints = [...allPoints, middlePoint];
      startPoint = middlePoint;
    }
    this.setState((state) =>({
      renderComponents: allPoints,
    }))
  }
  componentDidMount(){
    this.ChaosGame();
  } 

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    // console.log(this.state.renderComponents)
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static" color="default" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" color="inherit" >
              Fractals
            </Typography>
          </Toolbar>
        </AppBar>
        <FormControl>
          <FormLabel></FormLabel>
            <FormGroup>
              <TextField
                id="standard-number"
                label="Number of Initial Points"
                value={this.state.numSartPoint}
                onChange={this.handleChange('numSartPoint')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <TextField
                id="probability"
                label="Probability"
                value={this.state.probability}
                onChange={this.handleChange('probability')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </FormGroup>
        </FormControl>
        <svg width={800} height={800} >
          {this.state.renderComponents.map((val,index) =>{
            return (
              <rect key={index} x={val.x} y={val.y} width={1} height={1} stroke="black" ></rect>
            )
          })}
        </svg>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
