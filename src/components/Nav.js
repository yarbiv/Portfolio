import React from 'react';
import LinkWrapper from './LinkWrapper.js';
import { withRouter } from 'react-router-dom';

function Nav(props) {
  let navText = 'ABOUT';
  let navLink = '/about';
  if (props.location.pathname !== '/') {
    navText = 'HOME';
    navLink = '/';
  }
  return (
    <div>
      <hr id='line'></hr>
      <div className='link-parent'>
        <LinkWrapper routerLink={navLink}>{navText}</LinkWrapper>
        <LinkWrapper url="https://github.com/yarbiv">GITHUB</LinkWrapper>
        <LinkWrapper url="https://linkedin.com/in/yarbiv">LINKEDIN</LinkWrapper>
        <LinkWrapper url={'/resume.pdf'}>RESUME</LinkWrapper>
        <LinkWrapper url="mailto:yoav.arbiv@gmail.com">CONTACT</LinkWrapper>
      </div>
    </div>
  );
}

const NavRoute = withRouter(props => <Nav {...props}/>);

export default NavRoute;
