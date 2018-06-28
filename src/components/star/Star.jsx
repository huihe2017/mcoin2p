/**
 * Copyright(c) 2015 Gxmari007 <392041299@qq.com>
 */

var React = require('react');
var PropTypes = React.PropTypes;

var Star = React.createClass({

  propTypes: {
    index: PropTypes.number,
    active: PropTypes.bool,
    score: PropTypes.number,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  },

  render: function() {
    let classes;

    if (this.props.active) {
      classes = 'star active';
    } else {
      classes = 'star'
    }

    return (
      <a
        className={classes}
        onClick={this._onClick}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >

          {/*<img className='icoImg' src={require('../../containers/riskType/images/active.png')} alt=""/>*/}
      <span></span>
      </a>
    );
  },

  _onClick: function() {
    this.props.onClick(this.props.index);
  },

  _onMouseEnter: function() {
    this.props.onMouseEnter();
  },

  _onMouseLeave: function() {
    this.props.onMouseLeave();
  }

});

module.exports = Star;
