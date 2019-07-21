import React from 'react';
import { Link } from "react-router-dom";


export default function LinkWrapper(props) {
  if (props.url) {
    return <a href={props.url} target='_blank' rel='noopener noreferrer' className='link-child' >{props.children}</a>;
  }
  if (props.routerLink) {
    return (
      <Link to={props.routerLink} className='link-child'>{props.children}</Link>
    );
  }
}
