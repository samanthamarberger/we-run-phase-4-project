import React, { useState, useContext } from "react"
import { Route, useParams } from "react-router-dom"
import { UserContext } from "./context/user"

function Trails() {

    const { trails, loggedIn } = useContext(UserContext)
    const [formFlag, setFormFlag] = useState(false)
    const params = useParams()

    if (loggedIn) {
        const trailsList = trails.map(trail => <li>{trail.trailName}</li>)
        return (
            <div>
                <h3> TRAILS: </h3>
                <br/>
                {trailsList}
            </div>
        )
    }
    else {
        return (
            <h3> Not Authorized - Please Signup or Login </h3>
        )
    }
}

export default Trails