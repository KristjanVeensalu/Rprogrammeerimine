import React from "react";
//import ReactDOM from "react-dom";
import ItemsList from "../components/ItemList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import SortDropdown from "../components/SortDropdown.jsx";
import {connect} from "react-redux";
import {ItemProps} from "./CartPage.jsx";
import {getItems} from "../store/actions";
import * as selectors from "../store/selectors.js";

class HomePage extends React.PureComponent{
	
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      sortDirection: -1,
      allCategories: ["phones", "laptops"],
      selectedCategories: ["phones"],
    };
  }

  componentDidMount(){
    this.props.dispatch(getItems());
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
		return this.props.items
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
		const visibleItems = this.getVisibleItems();
		return(
		<>
			<div className = {"hero"}>
			</div>
			<div className = {"filterBar"}>
				<div className = {"innerfilterFirst"}>
					<CategoriesFilter
						allCategories = {this.state.allCategories}
						handleFilterSelect = {this.handleFilterSelect}
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
					Found {visibleItems.length} for {this.state.selectedCategories.join(", ")} 
				</div>
			</div>
			<ItemsList items={visibleItems}/>
		</>
	);
	}
}

const CategoriesFilter = ({allCategories, handleFilterSelect, isSelected}) => {
	return(
	<div className = "itemFilters-wrapper">
		{
            allCategories.map( categoryName => {
              return (
                <Checkbox
                  key={categoryName}
                  name = {categoryName} 
                  onChange = {handleFilterSelect}
                  checked = {isSelected(categoryName)}
                />
              );
            })
          }
	</div>
	);
};

  CategoriesFilter.propTypes = {
    allCategories: PropTypes.array.isRequired,
    handleFilterSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
  };


   const mapStateToProps = (store) => {
    return {
        items: selectors.getItems(store),
    };
};
export default connect(mapStateToProps)(HomePage);