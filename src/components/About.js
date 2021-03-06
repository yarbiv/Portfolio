import Album from './Album.js';
import Nav from './Nav.js';
import React from 'react';
import LastFm from '../utils/lastfm.js';

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, albums: null };
  }

  componentDidMount() {
    LastFm()
      .then(res => {
        this.setState({ loading: false, albums: res.body.topalbums })
      });
  }

  render() {
    let weeklyAlbums;
    if (!this.state.loading && this.state.albums) {
      const albums = this.state.albums.album;
      weeklyAlbums = <p className='about-text'>
                      This week I've been listening to <Album album={albums[0]}/>, <Album album={albums[1]}/>, and <Album album={albums[2]}/>.
                     </p>;
    }
    return (
      <div>
        <h1>About <span id='name-text'>Me</span></h1>
        <p className='about-text'>
          I'm a co-op student at the University of Waterloo.
          In the past, I've worked at Intel, A Thinking Ape, and D2L, among other companies.
          Some of my passions include skating, basketball (I'm a huge Raptors fan),
          and music. Check out my <a className='about-text' href={"https://www.discogs.com/user/yoav.arbiv/collection"}>vinyl collection!</a>
        </p>
        {weeklyAlbums}
        <p className='about-text'>
          You can find my resume and GitHub below, and
          feel free to get in touch with me via email or LinkedIn!
        </p>
        <Nav/>
      </div>
    )
  }
}
