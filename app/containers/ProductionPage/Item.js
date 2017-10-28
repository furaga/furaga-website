/**
*
* Item
*
*/

import React from 'react';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import messages from './messages';
import styled from 'styled-components';

const AItem = styled.div `
    padding:10px;
    min-width:600px;
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
const ItemTitle = styled.h2 `
  `;

const ItemDescription = styled.div `
  height:auto;
  margin: 1rem 1rem 1rem 1rem;
  color: #333;
`;

const ItemHighlight = styled.div `
  height:auto;
  margin: 1rem 1rem 1rem 1rem;
  padding: 0rem 0rem 1rem 0rem;
  color: #333;
  border-bottom: 1px solid #888;
  overflow:hidden;
  `;

const Img = styled.img `
  width: 560px;
  height:320px;
  object-fit: contain;
`;
const Video = styled.iframe `
    width: 560px;
    height:320px;
    frameBorder:0;
    allowFullScreen;
`;

class Item extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const {info} = this.props;
        if (!info) {
            return null;
        }

        const thumbnail = info.video
            ? <Video src={info.video}/>
            : info.image
                ? <Img alt="presentation" src={info.image}/>
                : null

        return (
            <AItem>
                <ItemView>
                    <ItemTitle>{info.title}</ItemTitle>
                    {thumbnail}
                    <ItemHighlight>
                        <table>
                        <tr>
                            <td>言語</td>
                            <td>{info.language}</td>
                        </tr>
                            <tr>
                                <td>開発時期</td>
                                <td>{info.date}</td>
                            </tr>
                        </table>
                        <a href={info.repository}>github</a>
                        {/* &nbsp;&nbsp;
                        <a href={info.download}>download</a> */}
                    </ItemHighlight>
                    <ItemDescription>
                        {info.description}
                    </ItemDescription>
                </ItemView>
            </AItem>
        );
    }
}

Item.propTypes = {
    info: PropTypes.any
};

export default Item;
