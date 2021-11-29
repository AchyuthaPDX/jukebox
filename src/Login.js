import React from 'react'
import {Container} from 'react-bootstrap'

let auth = "https://accounts.spotify.com/authorize?client_id=45a7a7609b9d4cb6a1ccc24096b1049c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function login(){
    return( <Container
        className="d-flex justify-content-center align-items-center h-100"
        style={{minHeight:"100vh"}}>
        
        <a class="btn btn-success btn-lg" href={auth}>Savaan App</a>
         
    </Container>
    
    )
}