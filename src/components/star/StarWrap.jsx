/**
 * Copyright(c) 2015 Gxmari007 <392041299@qq.com>
 */

require('./index.css');
var React = require('react');
var Star = require('./Star');
var PropTypes = React.PropTypes;

var StarWrap = React.createClass({

    propTypes: {
        rank: PropTypes.number,
        limit: PropTypes.number,
        onRank: PropTypes.func
    },

    getDefaultProps: function () {
        return {
            limit: 5
        };
    },

    getInitialState: function () {
        return {
            rank: this.props.rank || 0,
            hover: false
        };
    },

    render: function () {
        let stars = [];

        for (let i = 0, len = this.props.limit; i < len; i++) {
            let index = len - i;

            stars.push(
                <Star
                    key={'star-' + i}
                    index={index}
                    active={!this.state.hover && this.state.rank === index}
                    score={index}
                    onClick={this._onClick}
                    onMouseEnter={this._onMouseEnter}
                    onMouseLeave={this._onMouseLeave}
                />
            );
        }

        return (
            <div className="react-star">
                {stars}
            </div>
        );
    },

    _onClick: function (index) {
        this.setState({
            rank: index
        },()=>{
            console.log(this.state.rank);});

        if (this.props.onRank) {
            this.props.onRank(index);
        }
    },

    _onMouseEnter: function () {
        this.setState({
            hover: true
        });
    },

    _onMouseLeave: function () {
        this.setState({
            hover: false
        });
    }

});

module.exports = StarWrap;
