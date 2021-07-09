import React, { Component } from "react";
import { connect } from 'react-redux';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import ScreenplayTable from '../../components/ScreenplayTable/ScreenplayTable';
import Spinner from "../../components/UI/Spinner/Spinner";

import axios from '../../axios/axios';
import * as actions from '../../store/actions/actions';

class Rate extends Component {

    componentDidMount() {
        this.props.onInitCategories();
    }

    updateScreenplay(rate, id) {
        console.log("Main comp", rate, id)
        this.props.onRateScreenplay(rate, id);            
    }

    render(){
        let screenplaysTable = <Spinner/>;
        if(this.props.screenplays){
            screenplaysTable = <ScreenplayTable screenplays={this.props.screenplays} onRate={(rate, id) => this.updateScreenplay(rate, id)}/>;
        }
        return (
            <div>
                {screenplaysTable}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        screenplays: state.screenplays,
        error: state.error,
        loading: state.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch (actions.initCategories()),
        onRateScreenplay: (rate, screenplayId) => dispatch (actions.updateScreenplay(rate, screenplayId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Rate, axios));