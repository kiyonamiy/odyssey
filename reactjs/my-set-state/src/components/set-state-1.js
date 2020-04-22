import React from "react";

export default class SetState1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  componentWillUpdate() {
    console.log("1-componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("1-componentDidUpdate");
  }

  componentDidMount() {
    console.log("1-componentDidMount-start");

    this.setState({
      index: this.state.index + 1
    });
    console.log("1-componentDidMount-state1", this.state.index);

    this.setState({
      index: this.state.index + 1
    });
    console.log("1-componentDidMount-state2", this.state.index);

    console.log("1-componentDidMount-end");
  }

  // componentDidMount() {
  //   this.setState(
  //     preState => ({ index: preState.index + 1 }),
  //     () => {
  //       console.log("1-componentDidMount-state", this.state.index);
  //     }
  //   );
  //   this.setState(
  //     preState => ({ index: preState.index + 1 }),
  //     () => {
  //       console.log("1-componentDidMount-state", this.state.index);
  //     }
  //   );
  // }

  render() {
    console.log("1-render");
    return (
      <div className="content-box set-state-1">
        set-state-1: {this.state.index}
      </div>
    );
  }
}
