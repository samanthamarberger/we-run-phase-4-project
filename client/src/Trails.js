import React, { useState, useContext } from "react"
import { Route, useParams } from "react-router-dom"
import { UserContext } from "./context/user"

function Trails() {

    const {} = useContext(UserContext)
    const [formFlag, setFormFlag] = useState(false)
    const params = useParams()

    return (
        <div>
            <h3> TRAILS: </h3>
        </div>
    )
}

export default Trails