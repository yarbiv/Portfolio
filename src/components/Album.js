import React from 'react';

const Album = (props) => (
    <a className='about-text' href={props.album.url}>{props.album.name} by {props.album.artist.name}</a>
);

export default Album;
