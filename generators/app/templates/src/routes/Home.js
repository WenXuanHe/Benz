
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link  } from 'react-router-dom';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'queryCount'
        });
    }

    render() {
        let { text } = this.props;

        return (
            <div className="">
                <div>{text}</div>
                <div className="">
                    <div><Link to="/hello">hello </Link></div>
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    console.log('state', state);
    return {
        text: state.home.text
    };
})(Home);
