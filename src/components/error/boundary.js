import React, { Component } from 'react';
import ErrorBox from './index';

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
    }
  }

  componentDidCatch(e, i) {
    this.setState({
      error: e,
    });
  }

  render() {

    const { error } = this.state;

    if (!error) return this.props.children;

    return (
      <ErrorBox>
        {error.message}
      </ErrorBox>
    );
  }

}

export default ErrorBoundary;
