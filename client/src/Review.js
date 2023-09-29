import React, { useState, useContext } from "react";
import { UserContext } from "./context/user"

function Review({ review, trail }) {

    const { loggedIn, trails, setTrails } = useContext(UserContext)
    const [editButton, setEditButton] = useState(false)
    const [errorList, setErrorList] = useState([])
    const [tempRating, setTempRating] = useState(review.rating)
    const [tempReview, setTempReview] = useState(review.review)

    function getButton() {
        if (editButton) {
            return null
        }
        else {
            return (
                <button className="editButton"
                    onClick={() => setEditButton(true)}>
                    Edit Review
                </button>
            )
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        patchReview(review)
        setEditButton(false)
    }

    function editReview() {
        if (editButton) {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="rating"
                            type="integer"
                            value={tempRating}
                            onChange={(e) => setTempRating(e.target.value)}
                        />
                        <br />
                        <textarea
                            className="review"
                            type="text"
                            value={tempReview}
                            onChange={(e) => { setTempReview(e.target.value) }}
                        />
                        <div>-{review.username}</div>
                        <button type="submit">Save</button>
                    </form>
                    {errorList}
                </div>
            )
        }
        else {
            return (
                <div>
                    <h2 className="rating">{review.rating}/5</h2>
                    <p className="review">{review.review}</p>
                    <div>-{review.username}</div>
                </div>
            )
        }
    }

    function patchReview() {
        console.log("trail:", trail)
        console.log("review:", review)
        fetch(`${trail.id}/reviews/${review.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                rating: tempRating,
                review: tempReview
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then((updatedReview) => {
                // console.log(updatedReview)
                // Not getting this review
                if (!updatedReview.errors) {
                    if(!updatedReview.error) {
                        frontEndPatch(updatedReview, review.id, trail.id)
                        setErrorList(null)
                    }
                    else setErrorList(...errorList, updatedReview.error)
                }
                else {
                    const errors = updatedReview.errors.map((error, index) => <li key={index} style={{ color: 'red' }}>{error}</li>)
                    setErrorList(...errorList, errors)
                }

            })
    }

    function frontEndPatch(updatedReview, rid, tid) {
        const updatedTrails = trails.map((trail) => {
            if (trail.id === tid) {
                const updatedReviews = trail.reviews.map((review) => {
                    if (review.id === rid) {
                        return updatedReview;
                    }
                    return review;
                });
                return { ...trail, reviews: updatedReviews };
            }
            return trail;
        });
        setTrails(updatedTrails)
    }
    return (
        <div>
            {editReview()}
            {getButton()}
            <br />
            {errorList}
            <hr />
        </div>
    )
}

export default Review