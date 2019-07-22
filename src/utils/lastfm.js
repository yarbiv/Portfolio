const superagent = require('superagent');

export default function getLastFmData() {
  return superagent
    .get('http://ws.audioscrobbler.com/2.0/')
    .query({method: 'user.gettopalbums'})
    .query({user: 'toolbagg'})
    .query({period: '7day'})
    .query({limit: '3'})
    .query({format: 'json'})
    .query({api_key: '418695c438a06ba1edd16c5286b627b2'});
}
