/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

import "styles/dropdown.scss";
import ArrowDropdown from "images/arrow-dropdown.svg";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      items: this.props.items || [],
      selectedItem: this.props.items[0] || this.props.selectedItem,
      showItems: false,
      isOpened: false
    };
    this.dropDown = this.dropDown.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
  }

  dropDown() {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }));
  }

  selectedItem(item) {
    this.setState({
      selectedItem: item,
      showItems: false
    });
  }

  render() {
    const { input } = this.props;
    return (
      <div className="select-box--wrapper">
        <div className="select-box--toggle" onClick={this.dropDown}>
          <div className="select-box--selected-item">
            {this.state.selectedItem && this.state.selectedItem.value}
          </div>
          <ArrowDropdown
            className={`${
              this.state.showItems
                ? "select-box--arrow-rotated"
                : "select-box--arrow"
            }`}
          />
        </div>
        <div className="select-box--main">
          <div
            className="select-box--items"
            style={{
              display: this.state.showItems ? "inline-block" : "none",
              background: "white",
              position: "relative",
              zIndex: "2"
            }}
          >
            {this.state.items.map(item => (
              <input
                {...input}
                disabled={item.disabled ? 1 : 0}
                style={{ cursor: "pointer" }}
                key={item.id}
                onClick={() => this.selectedItem(item)}
                value={item.value}
                readOnly
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  items: PropTypes.array,
  selectedItem: PropTypes.array,
  input: PropTypes.object
};

export default Dropdown;
