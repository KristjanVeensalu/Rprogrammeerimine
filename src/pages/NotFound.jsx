import React from "react";
import "./NotFound.css";
import {NotFoundImage} from "../icons";

class NotFound extends React.PureComponent {
	render(){
		return(
			<div>
				<div className = {"NT-text"}>
				</div>
				<div className = {"NT-Image"}>
					<img className = "notFound" src = {NotFoundImage}/>
				</div>
			</div>
		);
	}
}

export default NotFound;