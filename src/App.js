import React, { Component } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Input
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import shortid from  "shortid";


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  formControl:{
    margin:20
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 800,
      svgHeight: 800,
      numSartPoint: 3,
      probability: 0,
      shapePoints:{
        3:[
          {
            x: 400,
            y: 0
          },
          {
            x: 0,
            y: 800
          },
          {
            x: 800,
            y: 800
          }
        ],
        4:[
          {
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 800
          },
          {
            x: 800,
            y: 0
          },
          {
            x: 800,
            y: 800
          }
        ],
      },
      startPoint: {
        x: 0,
        y: 0
      },
      allPoints: [],
      colorMap: ["red","blue","black", "green"],
      renderComponents: [],
      currentVertex: 0,
      rules: []
    };
  }

  randomStartPoint = (min, max) => {
    return {
      x: Math.floor(Math.random() * (max - min)) + min,
      y: Math.floor(Math.random() * (max - min)) + min
    };
  };
  getRandomPoint = () => {
    return Math.floor(Math.random() * this.state.numSartPoint);
  };

  componentDidMount() {
    const { svgWidth, shapePoints, numSartPoint } = this.state; 
    let startPoint = this.randomStartPoint(0, svgWidth);
    // let allPoints = [[startPoint.x, startPoint.y]];
    this.setState(state => ({
      startPoint: startPoint,
      allPoints: [
        ...state.allPoints,
        ...shapePoints[numSartPoint], 
        startPoint
      ]
    }), () => {
      // console.log(this.state.numSartPoint)
      this.timer = setInterval(this.ChaosGame, 0.00001)

    });
    // this.timer = setInterval(this.ChaosGame, 0.00001)
    
  }
  CheckConsecutive = (num) =>{

  }

  ChaosGame = () => {
    // let tempPoint = []
    // for (let i = 0; i < 30000; i++) {
    // for(let i = 0; i < 50; i++){
      const { startPoint, currentVertex, colorMap } = this.state;
      let nextVertex = this.getRandomPoint();
      if (nextVertex === currentVertex){
        return
      }
      const randomPoint = this.state.allPoints[nextVertex];
      const middlePoint = {
        x: (startPoint.x + randomPoint.x) / 2.0,
        y: (startPoint.y + randomPoint.y) / 2.0
      };
      this.setState(state => ({
        startPoint: middlePoint,
        currentVertex: nextVertex,
        renderComponents: [
          ...state.renderComponents,
          <circle
            key={shortid.generate()}
            cx={middlePoint.x}
            cy={middlePoint.y}
            r={1}
            // width={5}
            // height={5}
            stroke={colorMap[nextVertex]}
          />
        ]
      }));
      if (this.state.counter > 50000){
        clearInterval(this.timer)
      }
  };

  componentWillMount() {
    clearInterval(this.timer);
  }

  componentDidUpdate(prevProps, prevStates){
    const { svgWidth, shapePoints, numSartPoint } = this.state;
    if(prevStates.numSartPoint !== numSartPoint){
      let startPoint = this.randomStartPoint(0, svgWidth);
      // let allPoints = [[startPoint.x, startPoint.y]];
      this.setState(state => ({
          startPoint: startPoint,
          allPoints: [
            ...shapePoints[numSartPoint], 
            startPoint
          ],
          renderComponents:[]
        }))
    }
  }

  handleChange = name => event => {
    this.setState({ 
      [name]: event.target.value,
      // allPoints: [
      //   ...this.state.allPoints,
      //   ...this.shapePoints[this.state.numSartPoint], 
      //   this.startPoint
      // ],
      // renderComponents:[] 
    });
  };

  render() {
    // console.log(this.state.renderComponents);
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static" color="default" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Fractals
            </Typography>
          </Toolbar>
        </AppBar>
        <FormControl>
          <FormLabel />
          <FormGroup>
            <TextField
              id="standard-number"
              label="Number of Initial Points"
              value={this.state.numSartPoint}
              onChange={this.handleChange("numSartPoint")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{ inputProps: { min: 3, max: 4 } }}
              margin="normal"
            />
            <TextField
              id="probability"
              label="Probability"
              value={this.state.probability}
              onChange={this.handleChange("probability")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="rules-label-placeholder">
                Restricted Rules
              </InputLabel>
              <Select
                onChange={this.handleChange("rules")}
                input={<Input name="rules" id="rules-label-placeholder" />}
                displayEmpty
                name="rules"
                // className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </FormControl>
        <svg ref="svgs" width={800} height={800}>
          {this.state.renderComponents}
          {/* {this.state.renderComponents.map((val, index) => {
            return (
              <rect
                key={index}
                x={val.x}
                y={val.y}
                width={1}
                height={1}
                stroke="blue"
              />
            );
          })} */}
        </svg>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
