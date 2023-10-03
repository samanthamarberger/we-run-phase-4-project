import React, { useContext } from "react";
import { UserContext } from "./context/user";

function Home() {
    const { user, loggedIn } = useContext(UserContext)

    if (loggedIn) {
        return (
            <div className="Home">
                <body>
                    <h1>{user.username}'s Home Page</h1>
                    <p>Welcome to we-run! This is an application geared towards those who enjoy trail running. It allows us to come together as runners and share our favorite trails! </p>
                </body>
            </div>
        )
    }
    else {
        return (
            <div className="Home">
                <body>
                    <h1>Please Login or Signup</h1>
                </body>
            </div>
        )
    }
}

export default Home;