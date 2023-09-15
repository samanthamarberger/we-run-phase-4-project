import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"
import Review from "./Review";
import ReviewForm from "./ReviewForm";

function Reviews({ trail }) {
    const { loggedIn } = useContext(UserContext)
    const [reviewFormFlag, setReviewFormFlag] = useState(false)

    const reviews = trail.reviews.map((review) => (<Review key={review.id} review={review}/>))

    const addReviewFlag = () => {
        setReviewFormFlag(!reviewFormFlag)
    }

    function addReview(newReview){
        fetch(`/trails/${trail.id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
        })
        .then((r) => r.json())
        .then((newReview) => console.log(newReview))
    }

    return (
        <div>
            {reviews}
            <hr/>
            {(reviewFormFlag)
            ?
            <ReviewForm onAddReview={addReview} onAddReviewFlag={addReviewFlag}/>
            :
            <button onClick={() => setReviewFormFlag(!reviewFormFlag)}>Add Review</button>
            }
        </div>
    )
}

export default Reviews