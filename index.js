const twitter = require('./lib/twitter')
const moment = require('moment')

function tweetBlockMacro() {
  const self = this
  self.named('tweet')
  self.process(function (parent, target, attrs) {
    const token = twitter.getToken()
    const tweet = twitter.getTweet(target, token)
    const tweetDate = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss Z YYYY').format('DD MMMM YYYY')
    const html = `<div class="twitter tweet">
  <div class="tweet-header-container">
    <div class="tweet-author">
      <div class="tweet-author-avatar">
        <img src="${tweet.user.profile_image_url.replace(/_normal/, '_400x400')}"/>
      </div>
      <div class="tweet-author-names">
        <div class="tweet-author-name"><strong>${tweet.user.name}</strong></div>
        <div class="tweet-author-username">@${tweet.user.screen_name}</div>
      </div>
    </div>
    <div class="twitter-logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612">
        <path style="fill:#1da1f2" d="M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411    c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513    c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101    c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104    c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194    c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485    c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z"/>
      </svg>
    </div>
  </div>
  <div class="tweet-text-container">
    <div class="tweet-text">${tweet.full_text}</div>
  </div>
  <div class="tweet-footer-container">
    <div class="tweet-retweet">
      <div class="tweet-retweet-image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#657786" d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"/>
        </svg>
      </div>
      <div class="tweet-retweet-count">${tweet.retweet_count}</div>
    </div>
    <div class="tweet-favorite">
      <div class="tweet-favorite-image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#657786" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z"/>
        </svg>
      </div>
      <div class="tweet-favorite-count">${tweet.favorite_count}</div>
    </div>
    <div class="tweet-date">
      <strong>${tweetDate}</strong>
    </div>
  </div>
</div>`
    return self.createBlock(parent, 'pass', html, attrs)
  })
}

module.exports.register = function register(registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.blockMacro(tweetBlockMacro)
    })
  } else if (typeof registry.block === 'function') {
    registry.blockMacro(tweetBlockMacro)
  }
  return registry
}
