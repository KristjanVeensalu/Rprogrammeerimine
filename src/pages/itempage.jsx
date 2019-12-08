import React from "react";
import PropTypes from "prop-types";
import "./itempage.css";
import FancyButton from "../components/FancyButton.jsx";
import {connect} from "react-redux";
import {addItem} from "../store/actions";
import * as services from "../services.js";

class ItemPage extends React.PureComponent{

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount() {
   this.fetchItem();
  }
  fetchItem = () => {
    services.getItem({itemId: this.props.match.params.itemId})
    .then(item =>{
      this.setState({
        ...item
      });
    })
    .catch(err =>{
      console.log("item page", err);
    });
  };

  handleBuy = () => {
    this.props.dispatch(addItem(this.state));
  }
    render(){
      return (
        <>
        <div className={"box spacer itemPage"}>
          <div style = {{
            display: "flex",
          }}>
            <div className={"itemPage-left"}>
              <img src={this.state.imgSrc} />
            </div>
            <div className={"itemPage-content"}>
              <div><h2>{this.state.title}</h2></div>
              <div>
                <p className={"text--bold text--yellow"}>
                  {this.state.price} €
                </p>
              </div>
              <div>
                <p style={{textAlign: "justify"}}>
                  {loremIpsum}
                </p>
              </div>
            </div>
            </div>
            <div className={"itemPage-footer"}>
              <FancyButton onClick={this.handleBuy}>Osta</FancyButton>
              <p className={"logintext"}>Must be logged in!</p>
            </div>
          </div>
        </>
      );
    }
  }
  ItemPage.propTypes ={
    match: PropTypes.object.isRequired,
  };
  export default connect()(ItemPage);
 const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor sodales leo, vel tincidunt neque ultrices in. Praesent nisi sem, accumsan eget risus aliquam, egestas blandit tortor. Quisque id ultricies sem, nec aliquet dui. Sed et odio suscipit, iaculis mi quis, venenatis lorem. Quisque ex massa, aliquam eu tellus sagittis, dictum facilisis quam. Nulla hendrerit pellentesque placerat. Nam ornare libero id nunc accumsan, eu rhoncus nisi auctor. Nam nisi lectus, blandit sed pellentesque non, finibus vel metus. Nullam in blandit nulla. Suspendisse accumsan consectetur pharetra. Vivamus dictum nibh non dolor facilisis rhoncus. Quisque dignissim eu nulla vitae hendrerit. Suspendisse vitae turpis nisi";