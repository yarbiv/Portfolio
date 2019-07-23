import Nav from './Nav.js'
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
    if (!this.state.loading) {
      const album = this.state.albums.album;
      weeklyAlbums = <p>
                      This week I've been listening to <a className='about-text' href={album[0].url}>{album[0].name} by {album[0].artist.name}</a>, <a className='about-text' href={album[1].url}>{album[1].name} by {album[1].artist.name}</a>, and <a className='about-text' href={album[2].url}>{album[2].name} by {album[2].artist.name}</a>.
                     </p>;
    }
    const aboutMe = this.state.loading ? "" : <p className='about-text'>
                                                  I'm a software developer and a student at the University of Waterloo.
                                                  In the past, I've worked at D2L and North, among other companies.
                                                  Some of my passions include politics, basketball (huge Raptors fan!),
                                                  and music. {weeklyAlbums} You can find my resume and GitHub below, and
                                                  feel free to get in touch with me via email or LinkedIn!
                                              </p>;
    return (
      <div>
        <h1>About Me</h1>
        {aboutMe}
        <Nav/>
      </div>
    )
  }
}
