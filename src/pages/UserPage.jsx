import React from "react";
import PropTypes from "prop-types";
import { UserPropTypes } from "../store/reducer";
import {connect} from "react-redux";
import FancyButton from "../components/FancyButton.jsx";
import { userUpdate, tokenUpdate } from "../store/actions";
import protectedRedirect from "../components/protectedRedirect.jsx";
import * as selectors from "../store/selectors.js";
import {toast} from "react-toastify";
import * as services from "../services.js";


class UserPage extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            imgSrc:"",
            title:"",
            price:"",
            category:"",
        };
    }

    static propTypes = {
        user: PropTypes.shape(UserPropTypes),
        dispatch: PropTypes.func.isRequired,
    };

    handleLogout = () => {
        this.props.dispatch(userUpdate(null));
        this.props.dispatch(tokenUpdate(null));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        services.addItem(this.state)
            .then( () => {
          toast.success("Success");
    })
        .catch(err =>{
          console.log(err);
          toast.error("Error!");
          
    });
  };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state);
    };
    render() {
        return (
            <div className="spacer">
                <div className="box">
                    <div style={{display: "flex", justifyContent:"space-around"}}>
                        <div className="field">
                            {this.props.user.email}  
                        </div>
                        <div className="field">
                            {this.props.user.createdAt} 
                        </div>
                        <FancyButton onClick={this.handleLogout}>Log Out</FancyButton> 
                    <form className="addItem_form" onSubmit = {this.handleSubmit}>
                        <input type="imgSrc" placeholder="Image Source" name = {"imgSrc"} onChange = {this.handleChange}/>
                        <input type="title" placeholder="title" name = {"title"} onChange = {this.handleChange}/>
                        <input type="price" placeholder="price"name = {"price"} onChange = {this.handleChange}/>
                        <input type="category" placeholder="category"name = {"category"} onChange = {this.handleChange}/>                        <button>create</button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: selectors.getUser(store),
    };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));