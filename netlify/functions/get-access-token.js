require('dotenv').config()
const axios = require('axios').default
const {  base64urlencode } = require('../../src/utils/random-generator')

exports.handler = async (event) => {
    try {
        const { authCode } = JSON.parse(event.body)

        const authorization = base64urlencode(`${process.env.REACT_APP_CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        const headers = {
            'Authorization' : `Basic ${authorization}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        const data = `grant_type=authorization_code&code=${authCode}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&client_id=${process.env.REACT_APP_CLIENT_ID}&code_verifier=${process.env.AUTH_VERIFIER}`
        const response = await axios.post(`https://accounts.spotify.com/api/token`,
            data,
        {
            headers : headers,
        })
        const token = response.data.access_token
        const expiresIn = response.data.expires_in
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                token,
                expiresIn
            })
        }
    } catch(error) {
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }
}