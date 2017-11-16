import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-materialize';
import moment from 'moment';

import { DATE_FORMAT } from './../../constants';
import SearchInput from './input';

class Search extends Component {

  static propTypes = {
    search: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
    }
  }

  handleFromChange = (date) => {
    let from = date && moment(date);
    this.setState({ from });
  }

  handleToChange = (date) => {
    let to = date && moment(date);
    this.setState({ to });
  }

  handleSearchClick = () => {
    const from = this.state.from && this.state.from.format(DATE_FORMAT)
    const to = this.state.to && this.state.to.format(DATE_FORMAT)

    this.props.search({ from, to });
  }

  render() {

    const { from, to } = this.state;
    let error;

    if (from && to && from.isAfter(to)) {
      error = 'The "from" date can\'t be after the "to" one.'
    }

    return (
      <div className="search">
        <Row>
          <Col l={6}>
            <SearchInput
              onChange={this.handleFromChange}
              label="From"
            />
          </Col>
          <Col l={6}>
            <SearchInput
              onChange={this.handleToChange}
              label="To"
            />
          </Col>
        </Row>
        <Row>
          <Col l={6}>
            {!!error && (
              <p className="red-text text-lighten-1">
                {error}
              </p>
            )}
            <Button
              large
              onClick={this.handleSearchClick}
              disabled={!!error}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>

    );
  }

}

export default Search;
