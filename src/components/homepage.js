import moment from 'moment';
import React, { Component } from 'react';
import { ProgressBar, Input, Button } from 'react-materialize';

import ErrorBox from './error';
import Search from './search';
import List from './list';
import fetchApiData from './fetch-api-data';
import { search } from './../utils/http';

class Homepage extends Component {

  handleSearch = (data) => {
    this.props.reloadData(data);
  }

  render() {

    const { data } = this.props;

    const showError = data && data instanceof Error;
    const showList = data && !showError;

    return (
      <div>

        <Search search={this.handleSearch} />

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

export default fetchApiData(Homepage, search);
