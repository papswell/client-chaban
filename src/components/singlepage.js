import React, { Component } from 'react';
import { ProgressBar, Button, Card, Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import Item from './item';
import ErrorBox from './error';
import { single } from './../utils/http';

import fetchApiData from './fetch-api-data';

class Single extends Component {

  render() {

    const { match, history } = this.props;
    const id = parseInt(match.params.id, 10);
    const previous = id - 1;
    const next = id + 1;

    const { data } = this.props;
    const showError = data && data instanceof Error;
    const show = data && !showError;

    const classes = 'btn'.concat(!data ? ' disabled' : '');
    return (
      <div>
        <Row>
          <Col s={6}>
            <Link
              to="/" className={classes}
            >
              Home
            </Link>
          </Col>
          <Col s={6}>
            <Link
              to={`/${previous}`} className={classes}
            >
              &lt;
            </Link>
            <Link
              to={`/${next}`} className={classes}
            >
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

export default fetchApiData(Single, (props) => {
  return single(props.match.params.id);
});
