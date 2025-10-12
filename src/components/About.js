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
        I'm currently working at Plaid as a data infrastructure engineer, helping fuel Plaid's transition to a data-driven insights provider.
        </p>
        <p className='about-text'>
          I graduated from the University of Waterloo in 2022 and
          in the past, I've worked at ByteDance, Intel, and A Thinking Ape, among other companies.
          Some of my passions include cooking, film, basketball (I'm a huge Raptors fan),
          climbing, and music. Check out my <a className='about-text' href={"https://www.discogs.com/user/yoav.arbiv/collection"}>vinyl collection!</a>
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
