import { get, post } from './http-service'

const respond = response => {
  if (response.error) {
    throw new Error(JSON.stringify(response.error))
  }
  return response
}

const apiUrl = url => {
  return `${import.meta.env.VITE_API_BASE}/${url}`
}

const tokenHeader = () => ({
  Authorization: `Bearer [token]` // TODO Get token from authentication
})

const jsonHeader = () => ({ 'Content-Type': 'application/json' })

export const getCurrentUser = async () => {
  const url = 'session'
  const response = await get(apiUrl(url), {
    ...tokenHeader(),
    ...jsonHeader()
  })
  return respond(response)
}

export const getMessages = async () => {
  const url = `messages`
  const response = await get(apiUrl(url), {
    ...tokenHeader(),
    ...jsonHeader()
  })
  return respond(response)
}

export const createMessage = async text => {
  const url = `messages`
  const response = await post(
    apiUrl(url),
    {
      ...tokenHeader(),
      ...jsonHeader()
    },
    {
      text
    }
  )
  return respond(response)
}
