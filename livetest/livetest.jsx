import React from "react";

const ITEMS = [
  {
    name: "Product 1",
    cost: 200,
  },
  {
    name: "Product 2",
    cost: 100,
  },
  {
    name: "Product 3",
    cost: 20,
  }
];

class LiveTest1 extends React.PureComponent {
  state = {
    rows: ITEMS
  };
  render(){
    return(
      <>
        <div>Products below:</div>
        {
          this.state.rows.map(item = >{
            return <div>{item.name) - {item.cost}</div>
          })
        }
        <hr/>

        <div>Sum is {this.ITEMS.length} </div>
      </>
    );
  }
}

export default LiveTest1;



