import React, { Component } from 'react';
const $ =window.$;
class App extends Component {
  render() {
  return (
    <div className="text-center" style={{background:"#0069ff"}}>
          <div className={"close-"+this.props.id}>
          <img className="closebt" src="closebt.svg" alt="Close"/>
          </div>  
    </div>);
  }

}

export default App;
