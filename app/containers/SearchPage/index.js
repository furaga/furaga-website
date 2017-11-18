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
import ContentsListItem from '../../components/ContentsListItem';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSearchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import styled from 'styled-components';

import HeaderLink from '../../components/Header/HeaderLink';
import NavBar from '../../components/Header/NavBar';

const ContentsList = styled.div `
display:flex;
flex-flow: row wrap;
align-items: flex-start;
`;

const H1 = styled.h1`
color: #41ADDD;
`;

function isClientSide() {
  return (typeof exports === 'undefined')
}

async function getItems(category) {
  const res = await fetch('/api/news?category=' + category)
  const json = await res.json()
  if (Array.isArray(json)) {
    return json
  }
  return []
}


export class SearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props)
    this.state = {items: []}
  }

  async componentDidMount() {
    const {category} = this.props.match.params
    const items = await getItems(category);
    this.setState({items : items})
  }

  async componentWillReceiveProps(props) {
    const {category} = props.match.params
    const items = await getItems(category);
    this.setState({items : items})
  }

  render() {
    const {category} = this.props.match.params
    return (
      <div>
        <Helmet>
          <title>Search</title>
          <meta name="description" content="Description of SearchPage"/>
        </Helmet>

        <H1>アニメ配信情報</H1>

        <NavBar>
          <HeaderLink to="/search/video">
            動画
          </HeaderLink>

          <HeaderLink to="/search/comic">
            コミック
          </HeaderLink>
        </NavBar>
        <ContentsList>
          {this.state.items.map((item, idx) => <ContentsListItem key={idx} category={category || ""} item={item} />)}
        </ContentsList>
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
