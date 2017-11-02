import React from 'react';
import HeaderLink from './HeaderLink';

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
