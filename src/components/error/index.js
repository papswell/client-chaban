import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-materialize';

class ErrorBox extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <Card
        title="Erreur !"
        className="red lighten-1"
        textClassName="white-text"
      >
        {this.props.children}
      </Card>
    );
  }

}

export default ErrorBox;
