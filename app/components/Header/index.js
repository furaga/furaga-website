import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <HeaderLink to="/">
          <h1>furagaのプロダクト置き場</h1>
        </HeaderLink>
      </div>
    );
  }
}

export default Header;
