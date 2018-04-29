const asciidoctor = require('asciidoctor.js')()
const tweetExtension = require('../index.js')
const registry = tweetExtension.register(asciidoctor.Extensions.create())

asciidoctor.convertFile('sample.adoc', {safe: 'safe', extension_registry: registry})
