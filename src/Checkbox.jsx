import React from "react";
import PropTypes from "prop-types";
import "./checkbox.css";


const Checkbox = ({name, onChange, checked}) => (
	<div className = "checkbox-layout">
		<div className="checkbox">
			<div className = "boxname">{name}</div>
			<input type="checkbox" id={name} name={name} onChange={onChange} checked = {checked}/>
			
		<label htmlFor={name}></label>
		</div>
	</div>

);



Checkbox.propTypes ={
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
};


export default Checkbox;