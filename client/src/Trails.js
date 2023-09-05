import React, { useState, useContext } from "react"
import { Route, useParams } from "react-router-dom"
import { UserContext } from "./context/user"
import TrailForm from "./TrailForm"

function Trails() {

    const { trails, loggedIn } = useContext(UserContext)
    const [formFlag, setFormFlag] = useState(false)
    const params = useParams()

    const addTrailFlag = () => {
        setFormFlag(!formFlag)
    }

    if (loggedIn) {
        const trailsList = trails.map(trail => <li>{trail.trailName}</li>)
        return (
            <div>
                <h3> TRAILS: </h3>
                <br/>
                {trailsList}
                <br/>
                {formFlag ? 
                    <TrailForm addTrailFlag={addTrailFlag}/> :
                    <button onClick={() => setFormFlag(true)}>Add Trail</button>
                }
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