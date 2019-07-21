import React from 'react';
import LinkWrapper from './LinkWrapper.js';

export default function Nav() {
  return (
    <div>
      <hr id='line'></hr>
      <div class='link-parent'>
        <LinkWrapper url="https://github.com/yarbiv">GITHUB</LinkWrapper>
        <LinkWrapper url="https://linkedin.com/in/yarbiv">LINKEDIN</LinkWrapper>
        <LinkWrapper url={'/resume.pdf'}>RESUME</LinkWrapper>
        <LinkWrapper routerLink={"/about"}>ABOUT</LinkWrapper>
        <LinkWrapper url="mailto:yoav.arbiv@gmail.com">CONTACT</LinkWrapper>
      </div>
    </div>
  );
}
