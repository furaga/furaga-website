import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import styled from 'styled-components';

function Footer() {
  return (
    <Wrapper>
      <section width="800px">
        <a href="/search">to search page</a>
      </section>
    </Wrapper>
  );
}

export default Footer;
