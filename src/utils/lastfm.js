const superagent = require('superagent');

export default function getLastFmData() {
  return superagent
    .get('http://ws.audioscrobbler.com/2.0/')
    .query({method: 'user.gettopalbums'})
    .query({user: 'toolbagg'})
    .query({period: '7day'})
    .query({limit: '3'})
    .query({format: 'json'})
    .query({api_key: process.env.REACT_APP_LASTFM_KEY});
}
