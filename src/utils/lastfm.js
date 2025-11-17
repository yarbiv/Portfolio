const superagent = require('superagent');

export default function getLastFmData() {
  return superagent
    .get('https://ws.audioscrobbler.com/2.0/')
    .query({method: 'user.gettopalbums'})
    .query({user: 'yoavarbiv'})
    .query({period: '7day'})
    .query({limit: '3'})
    .query({format: 'json'})
    .query({api_key: process.env.REACT_APP_LASTFM_KEY});
}
