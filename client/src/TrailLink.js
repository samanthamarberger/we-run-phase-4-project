import React from "react"
import { Link } from "react-router-dom"

function TrailLink({ trail }) {

    return (
        <div>
            <h3>{trail.name}</h3>
            <img src={trail.trail_image} alt={trail.name}/>
        </div>
    )
}

export default TrailLink