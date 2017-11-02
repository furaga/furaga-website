import React from 'react';
import HeaderLink from './HeaderLink';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <HeaderLink to="/">
        </HeaderLink>
      </div>
    );
  }
}

export default Header;
