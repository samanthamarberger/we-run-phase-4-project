import React, { useState, useContext } from "react";
import { UserContext } from "./context/user"
import Review from "./Review";
import ReviewForm from "./ReviewForm";

function Reviews({ trail }) {
    const { loggedIn, setTrails, trails, user, setUser } = useContext(UserContext)
    const [reviewFormFlag, setReviewFormFlag] = useState(false)
    const [errorList, setErrorList] = useState(null)

    const reviews = trail.reviews.map((review) => (<Review key={review.id} review={review} trail={trail} />))

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
        .then((newReview) => {
            if (!newReview.errors) {
                frontEndAddReview(newReview, trail)
                setErrorList(null)
            }
            else {
                const errorLis = newReview.errors.map((e, index) =>  <li key={index} style={{ color: 'red' }}>{e}</li> )
                setErrorList(errorLis)
                setReviewFormFlag(!reviewFormFlag)
            }
        })
    }

    function frontEndAddReview(newReview, trail) {
        if (!user.trails.includes(trail)) {
            const updatedUserTrail = user.trails.push(trail)
            setUser({...user, trails: updatedUserTrail})
        }
        const updatedTrails = trails.map((tr) => {
            if (trail.id === tr.id) {
                tr.reviews.push(newReview)
                return tr
            }
            else {
                return tr
            }
        })
        setTrails(updatedTrails)
    }

    if (loggedIn) {
        return (
            <div className="Reviews">
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
    else {
        return (
            <h3> Not Authorized - Please Signup or Login </h3>
        )
    }
}

export default Reviews