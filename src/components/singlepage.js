import React, { Component } from 'react';
import { ProgressBar, Button, Card, Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import Item from './item';
import ErrorBox from './error';
import { single } from './../utils/http';

class Single extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const nextId = nextProps.match.params.id;
    this.fetchData(nextId);
  }

  fetchData = (id) => {
    this.setState({
      data: null,
    });

    single(id)
    .then(data => {
      // re-render component only if the id still match
      if (id === this.props.match.params.id) {
        this.setState({
          data,
        });
      }
    })
    .catch(e => {
      if (id === this.props.match.params.id) {
        this.setState({
          data: e,
        });
      }
    });
  }

  render() {

    const { match, history } = this.props;
    const id = parseInt(match.params.id, 10);
    const previous = id - 1;
    const next = id + 1;

    const { data } = this.state;
    const showError = data && data instanceof Error;
    const show = data && !showError;

    return (
      <div>
        <Row>
          <Col s={6}>
            <Link to="/" className="btn">
              Home
            </Link>
          </Col>
          <Col s={6}>
            <Link to={`/${previous}`} className="btn">
              &lt;
            </Link>
            <Link to={`/${next}`} className="btn">
              &gt;
            </Link>
          </Col>
        </Row>
        <Row>
          <Col s={12}>

            {!data && (
              <div style={{ marginTop: '30px' }}>
                <ProgressBar />
              </div>
            )}

            {showError && (
              <ErrorBox>
                {data.message}
                <Button onClick={history.goBack}>
                  Previous page
                </Button>
              </ErrorBox>
            )}

            {show && <Item
              data={data}
              link={
                <Button
                  key="useless"
                  node="a"
                  target="_blank"
                  href={data.link}
                  >
                  See on website
                </Button>
              }
            />}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Single;
