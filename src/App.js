import React, { Component } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  FormGroup,
  FormControl,
  FormLabel,
  TextField
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
      startPoint: {
        x: 0,
        y: 0
      },
      allPoints: [
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
      renderComponents: [],
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
    const { svgWidth } = this.state;
    let startPoint = this.randomStartPoint(0, svgWidth);
    // let allPoints = [[startPoint.x, startPoint.y]];
    this.setState(state => ({
      startPoint: startPoint,
      allPoints: [...state.allPoints, startPoint]
    }));

    this.timer = setInterval(this.ChaosGame, 0.00001);
  }

  ChaosGame = () => {
    // let tempPoint = []
    // for (let i = 0; i < 30000; i++) {
    // for(let i = 0; i < 50; i++){
      const { startPoint } = this.state;
      const randomPoint = this.state.allPoints[this.getRandomPoint()];
      // const dist = Math.sqrt((startPoint.x - randomPoint[0]) ** 2 + (startPoint.y - randomPoint[1])** 2);
      const middlePoint = {
        x: (startPoint.x + randomPoint.x) / 2.0,
        y: (startPoint.y + randomPoint.y) / 2.0
      };
      // tempPoint = [...tempPoint, <circle
      //   key={shortid.generate()}
      //   cx={middlePoint.x}
      //   cy={middlePoint.y}
      //   r={1}
      //   // width={5}
      //   // height={5}
      //   stroke="black"
      // />]
      // }
      this.setState(state => ({
        startPoint: middlePoint,
        renderComponents: [
          ...state.renderComponents,
          <circle
            key={shortid.generate()}
            cx={middlePoint.x}
            cy={middlePoint.y}
            r={1}
            // width={5}
            // height={5}
            stroke="black"
          />
        ]
      }));
      if (this.state.counter > 50000){
        clearInterval(this.timer)
      }
    // }
    // startPoint = middlePoint;
    // console.log(this.state.renderComponents);
  };

  componentWillMount() {
    clearInterval(this.timer);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
