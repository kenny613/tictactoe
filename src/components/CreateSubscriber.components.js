import React, { Component } from 'react';


export default class CreateSubscriber extends Component {

    constructor(props){ 
        super(props);

        this.state = {
            name: "abc",
            subscribedToChannel: "",
            subscribeDate: new Date(),
          };
   
    }
  render() {
    return (
    <React.Fragment>
    <input
    onKeyPress={this.inputKeyPress}
    onChange={this.updateName}
    value={this.state.response} />
    


      <div className="container">
      {this.state.name}
      </div>
    </React.Fragment>
    ); 
  }

  updateName = (event) => {
    this.setState({ name: event.target.value });
  };
}