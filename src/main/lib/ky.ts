import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
    'content-type': 'application/json',
  },
})
