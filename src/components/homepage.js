import moment from 'moment';
import React, { Component } from 'react';
import { ProgressBar, Input, Button } from 'react-materialize';

import ErrorBox from './error';
import Search from './search';
import List from './list';
import { search } from './../utils/http';

export default class Homepage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    this.search();
  }

  search = (query) => {

    this.setState({
      data: null,
    });

    search(query)
    .then(data => {
      this.setState({
        data,
      });
    })
    .catch(e => {
      this.setState({
        data: e,
      });
    });
  }

  render() {

    const { data } = this.state;

    const showError = data && data instanceof Error;
    const showList = data && !showError;

    return (
      <div>

        <Search search={this.search} />

        {!data && <ProgressBar />}

        {showError && (
          <ErrorBox>
            {data.message}
            <Button onClick={this.clearSearch}>
              Clear
            </Button>
          </ErrorBox>
        )}

        {showList && <List data={data} />}
      </div>
    );
  }
}
