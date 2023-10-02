import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"
import { useParams } from "react-router-dom"
import Review from "./Review";
import ReviewForm from "./ReviewForm";

function Reviews({ trail }) {
    const params = useParams()
    const { loggedIn, setTrails, trails, frontEndAddReview } = useContext(UserContext)
    const [reviewFormFlag, setReviewFormFlag] = useState(false)
    const [errorList, setErrorList] = useState(null)

    const reviews = trail.reviews.map((review) => (<Review key={review.id} review={review} trail={trail} />))

    const addReviewFlag = () => {
        setReviewFormFlag(!reviewFormFlag)
    }


    // function frontEndAddReview(newReview, trail) {
    //     console.log("trails from review", trails)
    //     const updatedTrails = trails.map((tr) => {
    //         if (trail.id === tr.id){
    //             tr.reviews.push(newReview)
    //         }
    //         else {
    //             return tr
    //         }
    //      })
    //     setTrails(updatedTrails)
    // }

    function addReview(newReview){
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
                frontEndAddReview(newReview, trail)
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