const http = require('./http')

module.exports = {
  getToken: function () {
    const consumerKey = process.env.TWITTER_CONSUMER_KEY
    const consumerSecret = process.env.TWITTER_CONSUMER_SECRET
    const credentialsToken = Buffer.from(`${encodeURIComponent(consumerKey)}:${encodeURIComponent(consumerSecret)}`).toString('base64')
    const headers = [
      {key: 'Authorization', value: `Basic ${credentialsToken}`},
      {key: 'Content-Type', value: 'application/x-www-form-urlencoded'}
    ]
    return http.post('https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', headers)
  },
  getTweet: function (id, token) {
    const headers = [
      {key: 'Authorization', value: `Bearer ${token.access_token}`}
    ]
    return http.get(`https://api.twitter.com/1.1/statuses/show/${id}.json?tweet_mode=extended`, headers)
  }
}
