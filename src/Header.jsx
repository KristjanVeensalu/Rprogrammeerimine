import React from "react";
import {Link} from "react-router-dom";
import {userIcon} from "./icons";
import {cartIcon} from "./icons";
import "./header.css";


const Header = () => {
	return(
		<div className = "my-header">
			<Link to = {"/"}>
				<img className = "header_logo" src="/images/The Realm Logo.png"/>
			</Link>
			<div className = "header_buttons">
				<div className = {"header_button"}>
					<img src = {userIcon}/>
					<div className ={"header_button-text"}>Login/<br/>Register</div>
				</div>
				<div className = {"header_button"}>
					<img src = {cartIcon} style ={{height: 40}}/>
					<div className ={"header_button-text"}>Cart</div>
				</div>
			</div>
		</div>
	);

};

export default Header;