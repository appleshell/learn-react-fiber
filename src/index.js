import React from "./react";

const root = document.getElementById("root");

// const jsx = <div>
//   <p>Hello React</p>
//   <p>Hi JSX</p>
//   <div>
//     <span>123</span>
//   </div>
// </div>

// console.log(jsx)

// React.render(jsx, root)

// setTimeout(() => {
//   const jsx = <div>
//     <div>Hello UUUUUUUUpdate</div>
//     <p>Hi JSX</p>
//   </div>

//   React.render(jsx, root)
// }, 5000)

class Greating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "张三",
    };
  }

  handleclick = () => {
    this.setState({
      name: "李四",
    });
    // this.setState({
    //   name: "王五",
    // });

    console.log(this.state);
  };

  render() {
    return (
      <div>
        classssss
        <p>{this.props.title}</p>
        <p>name: {this.state.name}</p>
        <button onClick={this.handleclick}>click</button>
      </div>
    );
  }
}

React.render(<Greating title="good!" />, root);

function Hello({ title }) {
  return (
    <div>
      hello fnCom
      <p>{title}</p>
    </div>
  );
}

// React.render(<Hello title="good!" />, root)
