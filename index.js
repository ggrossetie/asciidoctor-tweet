const twitter = require('./lib/twitter')

function tweetBlockMacro () {
  const self = this
  self.named('tweet')
  self.process(function (parent, target, attrs) {
    const token = twitter.getToken()
    const tweet = twitter.getTweet(target, token)
    let tweetBlock = self.createBlock(parent, 'open', '', {role: 'twitter tweet'})
    let tweetText = self.createInline(tweetBlock, 'quoted', tweet.full_text, {})
    self.createBlock(tweetBlock, 'paragraph', tweet.text, attrs)
    tweetBlock['$append'](tweetText)
    return tweetBlock
  })
}

module.exports.register = function register (registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.blockMacro(tweetBlockMacro)
    })
  } else if (typeof registry.block === 'function') {
    registry.blockMacro(tweetBlockMacro)
  }
  return registry
}
