import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import lyricsFinder from 'lyrics-finder'
import SpotifyWebApi from 'spotify-web-api-node'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "78053323ec8e417bbc56954e8538c43c",
    clientSecret: "92ea8ff148fc4edd8d5931a3297fdace",
  })
  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  })
  .catch(err => {
 
    res.sendStatus(400)
  })
})
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3001",
    clientId: "78053323ec8e417bbc56954e8538c43c",
    clientSecret: "92ea8ff148fc4edd8d5931a3297fdace",
    refreshToken,
  })
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
      })
    .catch(err => {
      
      res.sendStatus(400)
    })
})
app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})
app.listen(3001)
