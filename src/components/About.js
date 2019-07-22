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
    let albumString;
    if (!this.state.loading) {
      const album = this.state.albums.album;
      albumString = `This week I've been listening to "${album[0].name}" by "${album[0].artist.name}", "${album[1].name}"
                      by "${album[1].artist.name}", and "${album[2].name}" by "${album[2].artist.name}".`;
    }
    const aboutString = this.state.loading ? "" : `I'm a fun guy. Obviously I love the game of basketball. It's
                                                  just more questions you gotta ask me for me to tell you about myself,
                                                  I can't just give you a whole spiel like that. I can't even see where
                                                  you're sitting at, haha. I love listening to music! ${albumString}`;
    console.log(this.state.albums)
    return (
      <div>
        <h1>About Me</h1>
        <p className='about-text'>
          {aboutString}
        </p>
        <Nav/>
      </div>
    )
  }
}
