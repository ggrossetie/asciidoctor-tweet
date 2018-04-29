const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const query = (verb, url, body, headers) => {
  let data = {}
  const xhr = new XMLHttpRequest()
  xhr.open(verb, url, false)
  if (headers) {
    headers.forEach((header) => {
      xhr.setRequestHeader(header.key, header.value)
    })
  }
  xhr.onload = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText)
      } else {
        throw new Error(`${verb} ${url} - Request is unsuccessful: ${xhr.statusText} - ${xhr.responseText}`)
      }
    }
  }
  xhr.onerror = function () {
    throw new Error(`${verb} ${url} - an error occurred: ${xhr.statusText} - ${xhr.responseText}`)
  }
  xhr.send(body)
  return data
}

const get = (url, headers) => {
  return query('GET', url, '', headers)
}

const post = (url, body, headers) => {
  return query('POST', url, body, headers)
}

module.exports = {
  get: get,
  post: post
}
