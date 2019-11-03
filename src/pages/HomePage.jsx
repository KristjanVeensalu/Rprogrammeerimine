import React from "react";
//import ReactDOM from "react-dom";
import ItemList from "../components/ItemList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import SortDropdown from "../components/SortDropdown.jsx";
import {getItems} from "../actions/itemsActions.jsx";

class HomePage extends React.PureComponent{
	
	constructor(props) {
		super(props);
		this.state = {
			sortDirection: -1,
			items: [],
			allCategories: ["phones", "laptops"],
			selectedCategories: ["phones"],
		};
		
	}

	componentDidMount(){
		this.fetchItems();
	}

	fetchItems = () =>{
		getItems()
		.then(items => {
			this.setState({
				items
			});
		})
		.catch(err =>{
			console.log("err", err);
		});
	}
	
	handleFilterSelect = (event) => {
		const categoryName = event.target.name;

		if(this.isSelected(categoryName)){ 
			return this.unselectCategory(categoryName);}
		this.selectCategory(categoryName);
	};

	selectCategory = (categoryName) =>{
		this.setState({
		selectedCategories: this.state.selectedCategories.concat([categoryName])
		});
	}

	unselectCategory = (categoryName) => {
		const newArr = this.state.selectedCategories.filter(cn => cn !== categoryName);
		this.setState({
			selectedCategories: newArr
		});
	}
	
	getVisibleItems = () => {
		return this.state.items
		.filter( item => this.isSelected(item.category))
		.sort((a, b) => {
			switch (this.state.sortDirection){
				case -1: return b.price - a.price;
				case 1: return a.price -b.price;
			}
		});
	};


	isSelected =(name)=> this.state.selectedCategories.indexOf(name)>=0;

	handleSortDropwdown = (sortDirection) => {
		console.log("sort", event.target.value);
		this.setState({
			sortDirection: sortDirection,
		});
	};

	render(){
		const items = this.getVisibleItems();
		return(
		<>
			<div className = {"filterBar"}>
				<div className = {"innerfilterFirst"}>
					<ItemFilters
						allCategories = {this.state.allCategories}
						handleDropDown = {this.handleFilterSelect}
						isSelected = {this.isSelected}
					/>
				</div>
				<div className = {"innerfilterSecond"}>
					<SortDropdown
						direction = {this.state.sortDirection}
						onChange = {this.handleSortDropwdown}
					/>
				</div>
			</div>
			<div className = {"items-Settings"}>
				<div className = {"FoundItems"}>
					Found {items.length} {this.state.selectedCategories.join(", ")}
				</div>
			</div>
			<ItemList items = {items}/>
		</>
	);
	}
}

const ItemFilters = ({allCategories, handleDropDown,isSelected}) => {
	return(
	<div className = "itemFilters-wrapper">
		{
			allCategories.map( categoryName =>{
				return (
					<Checkbox
						key ={categoryName}
						name ={categoryName}
						onChange ={handleDropDown}
						checked ={isSelected(categoryName)}
					/>
				);
			})
		}
	</div>
	);
};

ItemFilters.propTypes = {
	allCategories: PropTypes.array.isRequired,
	handleDropDown: PropTypes.func.isRequired,
	isSelected: PropTypes.func.isRequired,

};
export default HomePage;