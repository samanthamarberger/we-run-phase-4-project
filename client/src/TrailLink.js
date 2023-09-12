import React from "react"
import { Link } from "react-router-dom"

function TrailLink({ trail }) {

    return (
        <Link className="link-name" to={`/trails/${trail.id}`}>
            <h3>{trail.trail_name}</h3>
            <img src={trail.trail_image} alt={trail.name}/>
        </Link>
    )
}

export default TrailLink