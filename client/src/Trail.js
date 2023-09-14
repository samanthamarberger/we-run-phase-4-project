import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"
import { useParams } from "react-router-dom";
import Review from "./Review";

function Trail() {
    const [trail, setTrail] = useState({
        reviews: []
    })

    const [reviewFormFlag, setReviewFormFlag] = useState(false)
    const params = useParams()
    const { loggedIn, trails, setTrails } = useContext(UserContext)

    useEffect(() => {
        fetch(`/trails/${params.id}`)
        .then((r) => r.json())
        .then ((trail) => setTrail(trail))
    }, [])

    function deleteTrail(id) {
        fetch(`/trails/${id}`,{
            method: "DELETE",
        })
        .then((r) => r.json())
        .then(() => frontEndDelete(id))
    }

    function frontEndDelete(id) {
        const updatedTrails = trails.filter((trail) => trail.id !== id)
        setTrails(...updatedTrails)
    }

    const reviews = trail.reviews.map((review) => (<Review key={review.id} review={review}/>))

    if (loggedIn) {
        return (
            <div>
                <br />
                <h2>{trail.trail_name}</h2>
                <img src={trail.trail_image} alt={trail.trail_name}/>
                <p>{trail.description}</p>
                <p>{trail.location}</p>
                <p>Difficulty: {trail.difficulty}/5</p>
                <button className="deleteButton" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
                <hr/>
                <h3>Reviews:</h3>
                {reviews}
                <hr />
            </div>
        )
    }
    else {
        return (
            <h3> Not Authorized - Please Signup or Login </h3>
        )
    }
}


export default Trail