import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Trail() {
    const [trail, setTrail] = useState({
        reviews: []
    })
    const params = useParams()

    useEffect(() => {
        fetch(`/trails/${params.id}`)
        .then((r) => r.json())
        .then ((trail) => setTrail(trail))
    }, [])

    return (
        <div>
            <br />
            <h2>{trail.trail_name}</h2>
            <hr/>
        </div>
    )
}

export default Trail