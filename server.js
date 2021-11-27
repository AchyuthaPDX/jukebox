const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.post("/login", (req, res) => {
    //hardcoded the client secret and client ID
    //for more info on them skip to Spotify Developer Dashboard 
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000',
      clientId: 'b084c467a92e45688e0f88d1f96f4316',
      clientSecret: '9b2bcfe6429341998fe8f6a3aebab42a',
    })
    //More info on this https://github.com/thelinmichael/spotify-web-api-node, skip to authorization part.
    spotifyApi.authorizationCodeGrant(code).then(data =>{ //gives us the authorization grant we need
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => { // Just if there is any error in getting the token
        res.sendStatus(400)
    })
})