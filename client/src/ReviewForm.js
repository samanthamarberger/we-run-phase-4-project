import React, { useState } from "react";

function ReviewForm({ onAddReview, onAddReviewFlag, trail }) {
    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        onAddReview({
            rating: rating,
            review: review,
            trail_id: trail.id
        })
        onAddReviewFlag()
    }

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


