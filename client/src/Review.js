import React from "react";

function Review({ review }) {
    return (
        <div>
            <h2 className='review'>{review.rating}/5</h2>
            <p>{review.review}</p>
        </div>
    )
}

export default Review