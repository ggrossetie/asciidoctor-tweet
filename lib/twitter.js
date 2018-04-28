const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

module.exports = {
  getToken: function () {
    const consumerKey = process.env.TWITTER_CONSUMER_KEY
    const consumerSecret = process.env.TWITTER_CONSUMER_SECRET
    const credentialsToken = Buffer.from(`${encodeURIComponent(consumerKey)}:${encodeURIComponent(consumerSecret)}`).toString('base64')
    let data = {}
    // this function must be synchronous :(
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://api.twitter.com/oauth2/token', false)
    xhr.setRequestHeader('Authorization', `Basic ${credentialsToken}`)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          data = JSON.parse(xhr.responseText)
        } else {
          throw new Error(`Unable to get a token: ${xhr.statusText} - ${xhr.responseText}`)
        }
      }
    }
    xhr.onerror = function () {
      throw new Error(`Unable to get a token: ${xhr.statusText} - ${xhr.responseText}`)
    }
    xhr.send('grant_type=client_credentials')
    return data
  },
  getTweet: function (id, token) {
    let data = {}
    // this function must be synchronous :(
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `https://api.twitter.com/1.1/statuses/show/${id}.json?tweet_mode=extended`, false)
    xhr.setRequestHeader('Authorization', `Bearer ${token.access_token}`)
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          data = JSON.parse(xhr.responseText)
        } else {
          throw new Error(`Unable to get tweet ${id}: ${xhr.statusText} - ${xhr.responseText}`)
        }
      }
    }
    xhr.onerror = function () {
      throw new Error(`Unable to get tweet ${id}: ${xhr.statusText} - ${xhr.responseText}`)
    }
    xhr.send()
    return data
  }
}
