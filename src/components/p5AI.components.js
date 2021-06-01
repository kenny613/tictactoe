import React, { Component } from "react";
import Sketch from "react-p5";
import AI_title from "./AI_title.components";

export default class P5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finish: false,
      count: 0,
      w: 0,
      h: 0,
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  }

  setup = (p5, parentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(400, 400).parent(parentRef);
    this.setState((state) => ({
      w: p5.width / 3,
      h: p5.height / 3,
    }));
  };

  draw = (p5) => {
    for (var i = 0; i <= p5.width; i += this.state.w) {
      for (var j = 0; j <= p5.height; j += this.state.h) {
        //draw the grid line
        p5.stroke(0);
        p5.strokeWeight(1);
        p5.line(i, 0, i, p5.height);
        p5.line(0, j, p5.width, j);
        //draw the X
        p5.textSize(this.state.w);
      }
    }
    p5.line(0, p5.height - 1, p5.width, p5.height - 1);
  };

  updateCount = () => {
    this.setState((state) => ({
      finish: true,
      count: state.count,
    }));
  };

  addCount = () => {
    this.setState((state) => ({
      count: state.count + 1,
    }));
  };

  mouseClicked = (p5) => {
    if (p5.mouseX > 400 || p5.mouseY > 400 || p5.mouseX < 0 || p5.mouseY < 0) {
      return false;
    }

    let x = Math.floor(p5.mouseX / this.state.w);
    console.log(p5.mouseX + " " + p5.mouseY);
    let y = Math.floor(p5.mouseY / this.state.h);
    if (this.state.board[x][y] === "") {
      p5.textSize(this.state.w);

      //a and b are the coordinates of the drawn X or O
      let a;
      let b = y * this.state.h + this.state.h - this.state.h / 8;
      let board = this.state.board;

      if (this.state.count % 2 === 0) {
        a = x * this.state.w + this.state.w / 8;
        board[x][y] = "O";
      } else {
        a = x * this.state.w + this.state.w / 6;
        board[x][y] = "X";
      }
      this.setState(() => ({
        board: board,
      }));

      p5.text(this.state.count % 2 === 0 ? "O" : "X", a, b);
      console.log("a is", a);
      console.log("b is", b);

      this.addCount();

      this.AIturn();

      if (this.checkwin(this.state.board)) {
        return <div>Won!</div>;
      }
    }
  };

  AIturn() {}

  checkwin = (board) => {
    for (var i = 0; i < 3; i++) {
      if (
        this.state.board[i][0] === this.state.board[i][1] &&
        this.state.board[i][1] === this.state.board[i][2] &&
        (this.state.board[i][0] === "O" || this.state.board[i][0] === "X")
      ) {
        this.updateCount();
      } else if (
        this.state.board[0][i] === this.state.board[1][i] &&
        this.state.board[1][i] === this.state.board[2][i] &&
        (this.state.board[0][i] === "O" || this.state.board[0][i] === "X")
      ) {
        this.updateCount();
      } else if (
        this.state.board[0][0] === this.state.board[1][1] &&
        this.state.board[1][1] === this.state.board[2][2] &&
        (this.state.board[0][0] === "O" || this.state.board[0][0] === "X")
      ) {
        this.updateCount();
      } else if (
        this.state.board[0][2] === this.state.board[1][1] &&
        this.state.board[1][1] === this.state.board[2][0] &&
        (this.state.board[0][2] === "O" || this.state.board[0][2] === "X")
      ) {
        this.updateCount();
      }
    }
    for (var a = 0; a < 3; a++) {
      for (var b = 0; b < 3; b++) {
        if (this.state.board[a][b] === "") {
          return false;
        }
      }
    }
    this.updateCount();
  };

  render() {
    return (
      <React.Fragment>
        <AI_title />
        <Sketch
          setup={this.setup}
          draw={this.draw}
          mouseClicked={this.state.finish ? () => {} : this.mouseClicked}
        />
        <div>
          {this.state.count === 0 && <div>Click to put your symbol!</div>}
          <div>
            This is {this.state.count % 2 === 0 && "O"}
            {this.state.count % 2 != 0 && "X"}'s turn{" "}
          </div>
          The game is {this.state.finish ? " finished." : " going on"}
          {this.state.finish && this.state.count !== 9 && (
            <div>
              The game winner is {this.state.count % 2 === 0 ? "X" : "O"}{" "}
            </div>
          )}
          {this.state.finish && this.state.count === 9 && <div>Tie!</div>}
          <br></br>
        </div>
      </React.Fragment>
    );
  }
}
