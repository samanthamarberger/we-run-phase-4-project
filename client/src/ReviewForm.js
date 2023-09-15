import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"

function ReviewForm({ onAddReview, onAddReviewFlag, trail_id }) {
    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")
    const [trailId, setTrailId] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setTrailId(trail_id)

        onAddReview({
            rating: rating,
            review: review,
            trail_id: trailId
        })
        onAddReviewFlag()
    }

    // something is wrong with the trail_id thing I am trying to do in order to get a trail id on the back end 
    console.log(trailId)

    return(
        <form onSubmit={handleSubmit}>
            <label>Rating out of 5:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                /> <br />
                <label>Review:</label>
                <input
                    type="text"
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                /> <br />
                <button type="submit">Submit</button>
        </form>
    )
}

export default ReviewForm


