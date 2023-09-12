import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

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

    const reviews = trail.reviews.map((review) => (<Review key={review.id} review={review}/>))

    return (
        <div>
            <br />
            <h2>{trail.trail_name}</h2>
            <img src={trail.trail_image} alt={trail.trail_name}/>
            <p>{trail.description}</p>
            <p>{trail.location}</p>
            <p>Difficulty: {trail.difficulty}/5</p>
            <hr/>
            <h3>Reviews:</h3>
            {reviews}
            <hr />
        </div>
    )
}

export default Trail