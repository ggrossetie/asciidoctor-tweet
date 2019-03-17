const chai = require('chai')
const expect = chai.expect
const asciidoctorTweet = require('../src/asciidoctor-tweet')
const asciidoctor = require('asciidoctor.js')()
const cheerio = require('cheerio')

const registry = asciidoctorTweet.register(asciidoctor.Extensions.create())

describe('Asciidoctor tweet extension', () => {
  it('should display a tweet using a block macro', () => {
    const html = asciidoctor.convert('tweet::988973671065600000[]', { extension_registry: registry })
    const result = cheerio.load(html)
    expect(result('.tweet')).to.have.lengthOf(1)
    expect(result('.tweet-text').text()).to.equal('Asciidoctor 1.5.7 is going to feature much more accurate line tracking. While there are still edge cases, the numbers will be correct in most documents.')
  })

  it('should display a tweet using a block', () => {
    const html = asciidoctor.convert(`[tweet,Dan Allen,@mojavelinux,25 April 2018,avatar-url=https://pbs.twimg.com/profile_images/1054511920223526912/6ul47E16.jpg,retweet-count=3,favorite-count=1]
____
Asciidoctor 1.5.7 is going to feature much more accurate line tracking. While there are still edge cases, the numbers will be correct in most documents.
____`, { extension_registry: registry })
    const result = cheerio.load(html)
    expect(result('.tweet')).to.have.lengthOf(1)
    expect(result('.tweet-text').text()).to.equal('Asciidoctor 1.5.7 is going to feature much more accurate line tracking. While there are still edge cases, the numbers will be correct in most documents.')
  })

  it('should display a tweet using a block and add stylesheet', () => {
    const html = asciidoctor.convert(`[tweet,Greta Thunberg,@GretaThunberg,16 sept. 2018,avatar-url=https://pbs.twimg.com/profile_images/1103201826449604608/c0t5HuM-_400x400.jpg,retweet-count=11 k,favorite-count=30 k]
____
Fridays for future. The school strike continues! #climatestrike #klimatstrejk #FridaysForFuture
____`, { safe: 'safe', header_footer: true, extension_registry: registry })
    const result = cheerio.load(html)
    expect(result('.tweet')).to.have.lengthOf(1)
    expect(result('.tweet-text').text()).to.equal('Fridays for future. The school strike continues! #climatestrike #klimatstrejk #FridaysForFuture')
    expect(result('.tweet-style')).to.have.lengthOf(1)
  })

  it('should use a default avatar image', () => {
    const html = asciidoctor.convert(`[tweet,Thomas Parisot,@oncletom,6 déc. 2018,retweet-count=22,favorite-count=19]
____
🌟 OK, le livre « Node.js • Apprendre par la pratique » débarque en librairie aujourd'hui ! De quoi faire un bon tour de #NodeJS v10 et #npm v6.

🧭 Où le trouver ? https://www.placedeslibraires.fr/livre/9782212139938
ℹ️ Le reste est sur https://oncletom.io/node.js/

🥁 *merci* à… ⤵
____`, { safe: 'safe', header_footer: true, extension_registry: registry })
    const result = cheerio.load(html)
    expect(result('.tweet')).to.have.lengthOf(1)
    expect(result('.tweet-author-avatar > img').attr('src')).to.equal('https://abs.twimg.com/sticky/default_profile_images/default_profile.png')
  })
})
