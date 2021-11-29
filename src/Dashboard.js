import {useState, useEffect} from "react"
import useAuth from "./useAuth"
//import TrackSearchResult from "./TrackSearchResult"
import { Container , Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    client_id:"45a7a7609b9d4cb6a1ccc24096b1049c",
})
export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search , setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    console.log(searchResults)
    useEffect(()=> {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        spotifyApi.searchTracks(search).then(res =>{
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest,image)=> {
                        if(image.height < smallest.height) return image
                        return smallest
                    },track.album.images[0])


                return{
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.name,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })
    } , [search, accessToken])  
    
    
    return <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control type="search"  placeholder="Search Songs/Artists"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style ={{overflowY:"auto"}}>
            songs
        </div>
    </Container>
}















/*import {useState, useEffect} from "react"
import useAuth from "./useAuth"
import TrackSearchResult from "./TrackSearchResult"
import { Container , Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
    client_id:"b945ef10ea24755b83ac50cede405a0"
})

export default function Dashboard({ code }){
    const accessToken = useAuth(code)
    const [search , setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
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
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style ={{overflowY:"auto"}}>
            {searchResults.map(track =>(
                <TrackSearchResult track ={track} key={track.uri} />
            ))}
        </div>
        </Container>
    )
}*/