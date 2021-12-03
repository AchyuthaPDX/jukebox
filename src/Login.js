import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import background from './music_background.jpg'
import logo from './musiclogo.png'

let auth = "https://accounts.spotify.com/authorize?client_id=78053323ec8e417bbc56954e8538c43c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function login() {
    return (
        <Container className="w-100">

            <Navbar style={{ backgroundColor: "#0F0D23" }} variant="dark">
                <Navbar.Brand height="80" >
                    <img className="ml-2 pl-2 text-white" alt="" src={logo} width="30" height="30" color="white" />{' '}
                    Jukebox
                </Navbar.Brand>
            </Navbar>

            <div className="cover-container d-flex justify-content-center align-items-center h-100 mask"
                style={{ minHeight: "100vh", backgroundColor: "white", backgroundImage: `url(${background})`, backgroundSize: 'cover', outerWidth: 100, opacity: 0.9 }}>

                <div className="text-center">
                    <main role="main" class="inner cover">
                        <h2 className="cover-heading" style={{ fontWeight: "bold", color: "white" }}>Discover. Listen. Repeat.</h2>
                        <a className="btn btn-lg " style={{ borderRadius: "500px", backgroundColor: "white", width: "200px" }} href={auth}>Try it</a>
                    </main>
                </div>
            </div>

        </Container>

    )
}