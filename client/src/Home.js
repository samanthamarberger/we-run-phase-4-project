import React, { useContext } from "react";
import { UserContext } from "./context/user";

function Home() {
    const { user, loggedIn } = useContext(UserContext)

    if (loggedIn){
        return (
             <div>
                <h1>{user.username}'s Home Page</h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Please Login or Signup</h1>
            </div>
        )
    }
}

export default Home;