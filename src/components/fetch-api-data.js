import React from 'react';

export default (WrappedComponent, apiCall) => {
  return class FetchApiData extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        data: null,
      }
    }

    componentDidMount() {
      this.fetchData(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.fetchData(nextProps);
    }

    fetchData = (params) => {
      this.setState({
        data: null,
      });

      apiCall(params)
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

      return <WrappedComponent
        {...this.props}
        data={data}
        reloadData={this.fetchData}
      />;
    }
  }
}
