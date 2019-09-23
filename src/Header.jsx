import React from "react";
import {Link} from "react-router-dom";



const Header = () => {
	return(
		<div className = "my-header">
			<Link to = {"/"}>
				<img className = "main_logo" src="/images/The Realm Logo.png"/>
			</Link>
			<div className = "main_buttons">
				<button>Login/signup</button>
				<button>Cart</button>
			</div>
		</div>
	);

};

export default Header;