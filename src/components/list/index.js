import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Item from './../item';

class List extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
  }

  render() {
    const { data } = this.props;

    return (
      <div className="list">
        {!data.length && (
          <p>
            The bridge will be open during this period :)
          </p>
        )}
        {!!data.length && data.map((row, i) => (
          <Item
            key={i}
            data={row}
            link={
              <Link
                className="btn"
                to={`/${row.id}`}
                key={i}
              >
                Plus de détails
              </Link>
            } />
        ))}
      </div>
    );
  }

}

export default List;
