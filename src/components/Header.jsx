import React from "react";
import {Link} from "react-router-dom";
import {userIcon} from "../icons";
import {cartIcon} from "../icons";
import "./header.css";
import PropTypes from "prop-types";
import authConsumer from "./authConsumer.jsx";





const Header = ({user}) => {
	return(
		<div className = "my-header">
			<Link to = {"/"}>
				<img className = "header_logo" src="/images/The Realm Logo.png"/>
			</Link>
			<div className = "header_buttons">
				{user.email && <WelcomeIcon user = {user}/>}
				{!user.email && <LoginRegisterIcon />}
				<div className = {"header_button"}>
					<img src = {cartIcon} style ={{height: 40}}/>
					<div className ={"header_button-text"}>Cart</div>
				</div>
			</div>
		</div>
	);

};

Header.propTypes = {
	token: PropTypes.string,
	user: PropTypes.object,
};


const LoginRegisterIcon = () =>(
	<Link className = {"header_button"} to={"/login"}>
		<img src = {userIcon}/>
		<div className ={"header_button-text"}>Login/<br/>Register</div>
	</Link>
);

const WelcomeIcon = ({user}) =>(
	<Link className = {"header_button"} to={`/users/${user._id}`}>
		<img src = {userIcon}/>
		<div className ={"header_button-text"}>Welcome, {user.email}</div>
	</Link>
);

WelcomeIcon.propTypes = {
	user: PropTypes.object.isRequired,
};

export default authConsumer(Header);