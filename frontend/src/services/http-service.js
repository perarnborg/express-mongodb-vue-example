export const get = async (url, headers) => {
  return request('GET', url, headers)
}

export const post = async (url, headers, body) => {
  return request('POST', url, headers, JSON.stringify(body))
}

export const patch = async (url, headers, body) => {
  return request('PATCH', url, headers, JSON.stringify(body))
}

const request = async (method, url, headers = null, body = null) => {
  const requestOptions = {
    method
  }
  if (headers) {
    requestOptions.headers = headers
  }
  if (body) {
    requestOptions.body = body
  }
  const response = await fetch(url, requestOptions)
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  return requestError(response, method, url, body)
}

const requestError = async (response, method, url, body = null) => {
  let responseBody = null
  if (response.status < 500) {
    responseBody = await response.json()
    let errorData = null
    if (typeof responseBody.data === 'object') {
      errorData = responseBody.data
    }
    if (typeof responseBody.data === 'string') {
      errorData = JSON.parse(responseBody.data)
    }
    const error = {
      status: response.status,
      response: {
        ...responseBody,
        data: errorData
      }
    }
    console.error({ httpError: error })
    return { error }
  }
  throw new Error(
    `Remote URI ${method} ${url}, Status ${response.status} ${
      response.statusText
    }, type: ${response.type}${
      body ? `, payload: ${JSON.stringify(debugBody(body))}` : ''
    }

    Reponse ${JSON.stringify(responseBody)}`
  )
}

const debugBody = body => {
  if (typeof body?.append === 'function') {
    const debug = {}
    body.forEach((value, key) => {
      debug[key] = value
    })
    if (typeof debug.files !== 'undefined') {
      debug.files = '[filelist]'
    }
    return debug
  }
  return body
}
