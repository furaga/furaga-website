/**
 *
 * SearchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import styled from 'styled-components';

const Img = styled.img `
width:160px;
height:120px;
object-fit: contain;
float:left;
margin-top:1.5rem
`

const ItemDiv = styled.div `
  margin-bottom:2rem;
  width:600px;
  height:150px;
  border-style:solid;
  border-color:#41ADDD #888 #888 #888;
  border-width:2px 1px 1px 1px;
  clear:both;
`

function isClientSide() {
  return (typeof exports === 'undefined')
}

async function getItems() {
  const res = await fetch('http://localhost:3000/api/news')
  const json = res.json()
  console.log(JSON.stringify(json, null, 4))
  
  return json
}

export class SearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props)
    this.state = {items: []}
  }

  async componentDidMount() {
    const items = await getItems();
    this.setState({items : items})
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Search</title>
          <meta name="description" content="Description of SearchPage"/>
        </Helmet>

        {this.state.items.map((item, idx) => {
          return <ItemDiv key={"item-" + idx}>
            <Img src={item.thumbnail_url}/><br/>
            &nbsp;<a href={item.url}>{item.title}</a><br/>
            &nbsp;{item.date}<br/>
            &nbsp;{item.official_site}
          </ItemDiv>;
        })}

      </div>
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({searchpage: makeSelectSearchPage()});

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'searchPage', reducer});
const withSaga = injectSaga({key: 'searchPage', saga});

export default compose(withReducer, withSaga, withConnect,)(SearchPage);
