import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import ScreenplayList from "../../components/ScreenplayList/ScreenplayList";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from '../../components/UI/Spinner/Spinner';
import SearchBar from "../../components/UI/SearchBar/SearchBar";

import axios from '../../axios/axios';
import * as actions from '../../store/actions/actions';

import classes from './Screenplay.module.css';

class Screenplay extends Component {

    state = { 
        show: false,
        currentPage: 1,
    };

    closeModal = () => {
        this.setState({show: false})
    }

    componentDidMount() {
        this.props.onInitCategories();
    }

    loadMore = () => {
        const page = this.state.currentPage + 1;
        this.setState({currentPage: page})
        this.props.onInitScreenplays(this.props.selectedCategoryId, '', page);
    }

    selectCategory = (id) => {
        this.setState({currentPage: 1})
        this.props.onSelectCategory(id);
        this.props.onInitScreenplays(id, '', this.state.currentPage);
    }

    onTermSubmit = (term) => {
        this.props.onInitScreenplays(this.props.selectedCategoryId, term, this.state.currentPage);
    }

    render() {

        let screenplayList = this.props.error ? <p>Can't load screenplays</p> : <Spinner/>;
        if(this.props.screenplays) {
            screenplayList = <ScreenplayList screenplays={this.props.screenplays}/>;
        }

        let categoryList = this.props.error ? <p>Can't load categories</p> : <Spinner/>;
        if(this.props.categories) {
            categoryList = this.props.categories.map((category) => {
                return (
                    <button key={category._id} 
                        className={ this.props.selectedCategoryId === category._id ? classes.Active : classes.Default}
                        onClick={() => this.selectCategory(category._id)}> 
                        {category?.name}
                    </button>
                );
            })
        }

        let loadMoreButton = null;
        if(this.props.screenplays && this.props.screenplays.length % 10 === 0) {
            loadMoreButton = (
                <div className={classes.Center}>
                    <button className={classes.Button} onClick={this.loadMore}> Load More</button>
                </div>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.show} modalClosed={this.closeModal}/>
                <SearchBar onTermSubmit={this.onTermSubmit}/>
                <br/><br/>
                {categoryList}
                <br/><br/>
                {screenplayList}
                {loadMoreButton}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        screenplays: state.screenplays,
        selectedCategoryId: state.selectedCategoryId,
        error: state.error,
        loading: state.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch (actions.initCategories()),
        onSelectCategory: (categoryId) => dispatch (actions.selectCategory(categoryId)),
        onInitScreenplays: (categoryId, search, page) => dispatch (actions.initScreenplays(categoryId, search, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Screenplay, axios));