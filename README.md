# :bird: Tweet Extension for Asciidoctor.js

![Travis build status](https://img.shields.io/travis/Mogztter/asciidoctor-tweet/master.svg)

An extension for [Asciidoctor.js](https://github.com/asciidoctor/asciidoctor.js) to render tweets.

## Install

    $ npm i asciidoctor-tweet

## Usage

In your document, use the `tweet` macro with the name of the feature:

```
tweet::988973671065600000[]
```

Register the extension before converting your document:

```js
const asciidoctor = require('asciidoctor.js')()
const tweetExtension = require('asciidoctor-tweet')
const registry = tweetExtension.register(asciidoctor.Extensions.create())

asciidoctor.convertFile('sample.adoc', {extension_registry: registry})
```

**IMPORTANT**:
To authenticate with the Twitter API, you will need to register a Twitter application: https://apps.twitter.com/

Once you have a Twitter application, you will need to pass the consumer key and the consumer secret as environment variables:

* `TWITTER_CONSUMER_KEY`
* `TWITTER_CONSUMER_SECRET`


## Rendering

![](rendering.jpeg)

**NOTE**: You can use a `docinfo` file to add custom stylesheet. See the `examples` directory.
