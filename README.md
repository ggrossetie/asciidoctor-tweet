# :bird: Tweet Extension for Asciidoctor.js

[![Travis build status](https://img.shields.io/travis/Mogztter/asciidoctor-tweet/master.svg)](https://travis-ci.org/Mogztter/asciidoctor-tweet)

An extension for [Asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js) to render tweets.

## Install

    $ npm i @asciidoctor/core asciidoctor-tweet

## Usage

In your document, use the `tweet` macro with a tweet id:

```
tweet::988973671065600000[]
```

**TIP:** The tweet id can be found in a tweet URL.
For instance in https://twitter.com/GretaThunberg/status/1041369960436703232, the tweet id is `104136996043670323`.

You can also use a `tweet` block as you would use a *quote* block:

```
[tweet,Greta Thunberg,@GretaThunberg,16 sept. 2018,avatar-url=https://pbs.twimg.com/profile_images/1103201826449604608/c0t5HuM-_400x400.jpg,retweet-count=11 k,favorite-count=30 k]
____
Fridays for future. The school strike continues! #climatestrike #klimatstrejk #FridaysForFuture
____
```

Then, register the extension before converting your document:

```js
const asciidoctor = require('@asciidoctor/core')()
const tweetExtension = require('asciidoctor-tweet')
const registry = tweetExtension.register(asciidoctor.Extensions.create())

asciidoctor.convertFile('sample.adoc', { extension_registry: registry })
```

**IMPORTANT**:
To authenticate with the Twitter API, you will need to register a Twitter application: https://apps.twitter.com/

Once you have a Twitter application, you will need to pass the consumer key and the consumer secret as environment variables:

* `TWITTER_CONSUMER_KEY`
* `TWITTER_CONSUMER_SECRET`


## Rendering

![](https://github.com/Mogztter/asciidoctor-tweet/raw/master/rendering.jpeg)
