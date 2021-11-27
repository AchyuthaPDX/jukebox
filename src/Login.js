import React from 'react'
import {Container} from 'react-bootstrap'

let auth = "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function login(){
    return( <Container
        className="d-flex justify-content-center align-items-center bgcolor-blue"
        style={{minHeight:"100vh"
    /*backgroundImage: ("https://iotgadgets.com/wp-content/uploads/2017/01/Smartphone-App-Saavn-Music-Samsung-Z1-Z2-Z3-Tizen-Experts-Store-700.png")*/}}>
        <a class="btn btn-success btn-lg" href={auth}>Savaan</a>
    </Container>
    )
}