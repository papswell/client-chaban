import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-materialize';

class Item extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }
  render() {

    const data = this.props.data;

    return (
      <Card
        title={`${data.id} : Fermeture ${data.totale ? 'totale' : 'partielle'} le ${data.date}`}
        actions={[
          this.props.link
        ]}
        >
        <div>
          <strong>De : </strong>
          <span>
            {data.start}
          </span>
        </div>
        <div>
          <strong>Jusqu'à : </strong>
          <span>
            {data.end}
          </span>
        </div>
        <div>
          <strong>Cause : </strong>
          <span>
            {data.reason}
          </span>
        </div>
      </Card>
    );
  }

}

export default Item;
