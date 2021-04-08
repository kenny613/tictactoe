import React, { Component } from "react";
import Sketch from "react-p5";

export default class P5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finish: false,
      statecount: 0,
    };
  }
  render() {
    let w;
    let h;
    let count = 0;
    let board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    const setup = (p5, parentRef) => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      p5.createCanvas(400, 400).parent(parentRef);
      w = p5.width / 3;
      h = p5.height / 3;
    };

    const draw = (p5) => {
      // p5.background(220);

      for (var i = 0; i <= p5.width; i += w) {
        for (var j = 0; j <= p5.height; j += h) {
          //draw the grid line
          p5.stroke(0);
          p5.strokeWeight(1);
          p5.line(i, 0, i, p5.height);
          p5.line(0, j, p5.width, j);
          //draw the X
          p5.textSize(w);
        }
      }
    };
    const updateCount = () => {
      this.setState((state) => ({
        finish: true,
        statecount: count,
      }));
      console.log(this.state.statecount);
    };

    const mouseClicked = (p5) => {
      let x = Math.floor(p5.mouseX / w);
      let y = Math.floor(p5.mouseY / h);
      if (board[x][y] === "") {
        p5.textSize(w);
        let a;
        let b = y * h + h - h / 8;

        if (count % 2 === 0) {
          a = x * w + w / 8;
          board[x][y] = "O";
        } else {
          a = x * w + w / 6;
          board[x][y] = "X";
        }

        p5.text(count % 2 === 0 ? "O" : "X", a, b);

        count++;

        console.log(board[x][y]);
        if (checkwin(board)) {
          return <div>Won!</div>;
        }
      }
    };

    const checkwin = (board) => {
      for (var i = 0; i < 3; i++) {
        if (
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2] &&
          (board[i][0] === "O" || board[i][0] === "X")
        ) {
          updateCount();
        } else if (
          board[0][i] === board[1][i] &&
          board[1][i] === board[2][i] &&
          (board[0][i] === "O" || board[0][i] === "X")
        ) {
          updateCount();
        } else if (
          board[0][0] === board[1][1] &&
          board[1][1] === board[2][2] &&
          (board[0][0] === "O" || board[0][0] === "X")
        ) {
          updateCount();
        } else if (
          board[0][2] === board[1][1] &&
          board[1][1] === board[2][0] &&
          (board[0][2] === "O" || board[0][2] === "X")
        ) {
          updateCount();
        }
      }
      for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
          if (board[a][b] === "") {
            return false;
          }
        }
      }
      updateCount();
    };

    return (
      <React.Fragment>
        <Sketch
          setup={setup}
          draw={draw}
          mouseClicked={this.state.finish ? 1 : mouseClicked}
        />
        <div>
          {this.state.statecount === 0 && <div>Click to put your symbol!</div>}
          The game is {this.state.finish ? " finished." : " going on"}
          {this.state.finish && this.state.statecount !== 9 && (
            <div>
              The game winner is {this.state.statecount % 2 === 0 ? "X" : "O"}{" "}
            </div>
          )}
          {this.state.finish && this.state.statecount === 9 && <div>Tie!</div>}
          <br></br>
          {board[0][2]}
        </div>
      </React.Fragment>
    );
  }
}
