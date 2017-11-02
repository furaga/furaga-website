/**
*
* ContentsListItem
*
*/

import React from 'react';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import messages from './messages';
import styled from 'styled-components';

const Item = styled.div `
    padding:10px;
    max-width:250px;
    flex-flow: column nowrap;
    align-content: center;
    align-items: center;
    flex: 300px 0 0;
`;

const ItemView = styled.div `
  background:transparent;
  border-top: 4px solid #41ADDD;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  `;
const ItemTitle = styled.div `
  height:auto;
  font-size:14px;
  margin: 1rem 1rem 1rem 1rem;
  `;

  const ItemDescription = styled.div `
  height:auto;
  margin: 0.5rem 1rem 0rem 1rem;
  color: #888;
  border-bottom: 1px solid #f4f4f4;
  overflow:hidden;
  `;

  const ItemHighlight = styled.div `
  height:auto;
  margin: 0rem 1rem 0rem 1rem;
  color: #333;
  border-bottom: 1px solid #f4f4f4;
  overflow:hidden;
  `;

const Img = styled.img `
    width: 100%;
    height:100%;
    object-fit: contain;
`;

class ContentsListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {item} = this.props;
    if (!item) {
      return null
    }

    return (
      <Item>
        <ItemView>
          <a href={item.url}>
            <Img alt="presentation" src={item.thumbnail_url}/>
          </a>
          <a href={item.video_url}>
            <ItemTitle>{item.title}</ItemTitle>
          </a>
          <ItemDescription>
            {item.date}
            {item.fee ? "    " + item.fee : ""}
          </ItemDescription>
          <ItemHighlight>
            {item.official_site}
          </ItemHighlight>
        </ItemView>
      </Item>
    );
  }
}

ContentsListItem.propTypes = {
  item: PropTypes.any
};

export default ContentsListItem;
