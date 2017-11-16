import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';

class SearchInput extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = (event) => {
    const date = event.target.value;
    this.props.onChange(date);
  }

  render() {
    const { handleChange, label } = this.props;

    return (
      <Input
        type="date"
        label={label}
        onChange={this.handleChange}
      />
    );
  }

}

export default SearchInput;
