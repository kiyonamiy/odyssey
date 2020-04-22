import React from "react";
import SetState1 from "./components/set-state-1";
import SetState2 from "./components/set-state-2";

class App extends React.Component {
  componentDidMount() {
    console.log("App-componentDidMount");
  }
  render() {
    return (
      <div>
        {/* <SetState1 /> */}
        <SetState2 />
      </div>
    );
  }
}

export default App;

// Mount 阶段(无 setTimeout) =============
// 1-componentDidMount-start
// 1-componentDidMount-state1 0
// 1-componentDidMount-state2 0
// 1-componentDidMount-end

// 2-componentDidMount-start
// 2-componentDidMount-state1 0
// 2-componentDidMount-state2 0
// 2-componentDidMount-end

// App-componentDidMount    // 父组件居然是最后 mount 的

// Update 阶段 ==========================
// 都只更新了一次
// 1-componentWillUpdate
// 2-componentWillUpdate
// 1-componentDidUpdate
// 2-componentDidUpdate

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// Mount 阶段(有 setTimeout) =============
// 1-componentDidMount-start
// 1-componentDidMount-state1 0
// 1-componentDidMount-state2 0
// 1-componentDidMount-end

// 2-componentDidMount-start
// 2-componentDidMount-end
// App - componentDidMount

// Update 阶段 ============================
// 1-componentWillUpdate
// 1-componentDidUpdate

// 2-setTimeout begin // 接下来马上跟上组件更新，说明同步了（按着setTimeout内的逻辑顺序执行）（还被更新了两次）
// 2-componentWillUpdate
// 2-componentDidUpdate
// 2-componentDidMount-state1 1
// 2-componentWillUpdate
// 2-componentDidUpdate
// 2-componentDidMount-state2 2
