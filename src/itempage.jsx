import React from "react";
import Header from "./Header.jsx";
import {phones} from "./mydatabase.js"

class ItemPage extends React.PureComponent{
	render(){
		const item = phones [0];
		return(
			<>
				<Header/>
				<div className = {"item"}>
					<img src = {item.imgSrc} />
					<div className = {"item_title"}>{item.title}</div>
					<div className = {"item_price"}>{item.price}</div>
				</div>
			</>
	)
	}
};

export default ItemPage;