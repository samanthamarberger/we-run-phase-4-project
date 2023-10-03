import React, { useState, useContext } from "react"
import { UserContext } from "./context/user"
import TrailForm from "./TrailForm"
import TrailLink from "./TrailLink"

function Trails() {

    const { trails, loggedIn, errorList } = useContext(UserContext)
    const [formFlag, setFormFlag] = useState(false)

    const addTrailFlag = () => {
        setFormFlag(!formFlag)
    }

    if (loggedIn) {
        const trailsList = trails.map(trail =><TrailLink key={trail.id} trail={trail}/> )
        return (
            <div className="Trails">
                <h1> TRAILS: </h1>
                <br/>
                {trailsList}
                <br/>
                {formFlag ? 
                    <TrailForm addTrailFlag={addTrailFlag}/> :
                    <button onClick={() => setFormFlag(true)}>Add Trail</button>
                }
                <ul>
                    {errorList}
                </ul>
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