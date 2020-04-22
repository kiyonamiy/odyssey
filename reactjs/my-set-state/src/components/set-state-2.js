import React from "react";

export default class SetState2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  componentWillUpdate() {
    console.log("2-componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("2-componentDidUpdate");
  }

  componentDidMount() {
    console.log("2-componentDidMount-start");
    setTimeout(() => {
      console.log("2-setTimeout begin");
      this.setState({
        index: this.state.index + 1
      });
      console.log("2-componentDidMount-state1", this.state.index);

      this.setState({
        index: this.state.index + 1
      });
      console.log("2-componentDidMount-state2", this.state.index);
    }, 0);
    console.log("2-componentDidMount-end");
  }
  render() {
    console.log("2-render");
    return (
      <div className="content-box set-state-2">
        set-state-2 {this.state.index}
      </div>
    );
  }
}
