import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form, Card, Button } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import background from './music_background.jpg'

const spotifyApi = new SpotifyWebApi({
  clientId: "78053323ec8e417bbc56954e8538c43c",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          console.log(track.album)
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <Container className="d-flex flex-column py-2" variant = "light" style={{ height: "100vh", backgroundColor: "#FFE4FC", backgroundImage: `url(${background})`, backgroundSize: 'cover', outerWidth: 100}}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {searchResults.map(track => (
        <TrackSearchResult
          track={track}
          key={track.uri}
          chooseTrack={chooseTrack}
        /> 
      ))}
     



      <div className="container d-flex justify-content-around align-content-end flex-wrap">

        <Card className="rounded mt-3 text-center " style={{ width: '15rem' }}>
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67616d0000b27345dfafc1fd357391f2e906eb" />
          <Card.Body>
            <Card.Title className="fs-6">Liggi - Ritviz</Card.Title>
            <Button variant="outline-secondary" size="sm" href="https://p.scdn.co/mp3-preview/454b7ae64735ca53011213513c4832118ccdecc9?cid=78053323ec8e417bbc56954e8538c43c" > Play</Button>
          </Card.Body>
        </Card>

        <Card className="rounded mt-3 text-center" style={{ width: '15rem' }}>
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67616d0000b2730c3c9fa1d5d9d7770d897f2a" />
          <Card.Body>
            <Card.Title className="fs-6">Udd Gaye - Ritviz</Card.Title>
            <Button variant="outline-secondary" size="sm"> Play</Button>
          </Card.Body>
        </Card>

        <Card className="rounded mt-3 text-center" style={{ width: '15rem' }}>
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67616d0000b27335d8a18e284344886486f44f" />
          <Card.Body>
            <Card.Title className="fs-6">Baarat - Ritviz</Card.Title>
            <Button variant="outline-secondary" size="sm"> Play</Button>
          </Card.Body>
        </Card>

        <Card className="rounded mt-3 text-center" style={{ width: '15rem' }}>
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67616d0000b273808523a9a498f8889cf49bdf" />
          <Card.Body>
            <Card.Title className="fs-6">Sun Toh - Ritviz</Card.Title>
            <Button variant="outline-secondary" size="sm"> Play</Button>
          </Card.Body>
        </Card>

        <Card className="rounded mt-3 text-center" style={{ width: '15rem' }} >
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67616d0000b27300fe1b1daea6ee84f295277e" />
          <Card.Body>
            <Card.Title className="fs-6">Oh Love - Prateek Kuhad</Card.Title>
            <Button variant="outline-secondary" size="sm"> Play</Button>
          </Card.Body>
        </Card>

      </div>

      <div className="flex-grow-1 my-2" style={{ overflowY: "auto", color:"white"}}>
      {searchResults.length === 0 && (
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          {lyrics}
        </div>
      )}
      </div>

      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  )
}