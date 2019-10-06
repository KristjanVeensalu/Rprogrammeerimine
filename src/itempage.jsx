import React from "react";
import Header from "./Header.jsx";
import Proptypes from "prop-types";
import "./itempage.css";

class ItemPage extends React.PureComponent{

	constructor(props){
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.fetchItem();
	}

	fetchItem = () => {
		fetch(`/api/items/${this.props.match.params.itemId}`)
		.then( res => {
			return res.json();
		})
		.then(item => {
			console.log("item", item);
			this.setState({
				...item
			});
		})
		.catch(err =>{
			console.log("item page", err);
		});
	}


	render(){
		return(
			<>
				<Header/>
				<div className = {"itemOnitem"}>
					<img src = {this.state.imgSrc} />
					<div className = {"item_titleOnitem"}>Name:  {this.state.title}</div>
					<div className = {"item_priceOnitem"}>Price: {this.state.price}</div>
					<div className = {"item_descOnitem"}>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
				</div>
			</>
	);
	}
}

ItemPage.propTypes = {
	match: Proptypes.object.isRequired,
};

export default ItemPage;