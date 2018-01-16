
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const H50 = (props) => {
    let { children, text } = props;
    return (
        <div className="h50">
            {
                children ? children : text
            }
        </div>
    );
};

export class Hello extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: true
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'hello/queryCount'
        }).then(function() {
            console.log('arguments:', arguments);
        });
    }

    onClick = () => {
        this.setState({
            display: false
        });
    }

    render() {
        let { text } = this.props;

        return (
            <div className="container" onClick={this.onClick}>
                {
                    this.state.display && <H50>{text}</H50>
                }
                <div className="">
                    <div><Link to="index">home</Link></div>
                </div>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        text: state.hello.text,
    };
})(Hello);