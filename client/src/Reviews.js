import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"
import Review from "./Review";
import ReviewForm from "./ReviewForm";

function Reviews({ trail, onSetTrail }) {
    const { loggedIn } = useContext(UserContext)
    const [reviewFormFlag, setReviewFormFlag] = useState(false)
    const [errorList, setErrorList] = useState(null)

    const reviews = trail.reviews.map((review) => (<Review key={review.id} review={review}/>))

    const addReviewFlag = () => {
        setReviewFormFlag(!reviewFormFlag)
    }

    function addReview(newReview){
        console.log(newReview.review)
        fetch(`/trails/${trail.id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
        })
        .then((r) => r.json())
        .then((newReview) => {
            if (!newReview.errors) {
                onSetTrail({
                    reviews: [...trail.reviews, newReview]
                })
                setErrorList(null)
            }
            else {
                const errorLis = newReview.errors.map((e, index) =>  <li key={index}>{e}</li> )
                setErrorList(errorLis)
                setReviewFormFlag(!reviewFormFlag)
            }
        })
    }

    return (
        <div>
            {reviews}
            {(reviewFormFlag)
            ?
            <ReviewForm onAddReview={addReview} onAddReviewFlag={addReviewFlag} trail={trail} />
            :
            <button onClick={() => setReviewFormFlag(!reviewFormFlag)}>Add Review</button>
            }
            {errorList}
        </div>
    )
}

export default Reviews