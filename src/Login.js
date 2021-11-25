import React from 'react'
import {Container} from 'react-bootstrap'

let auth = "https://accounts.spotify.com/authorize?client_id=b084c467a92e45688e0f88d1f96f4316&response_type=code&redirect_uri=http://localhost:3000&scope=stream%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-statw%20user-modify-playback-state"

export default function login(){
    return( <Container
        classname="d-flex justify-content-center align-items-center"
        style={{minHeight:"100vh"}}>
        <a class="btn btn-success btn-lg" href={auth}>Welcome to Savaan</a>
    </Container>
    )
}