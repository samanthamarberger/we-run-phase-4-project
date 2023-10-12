import React, { useState, useContext } from "react";
import { UserContext } from "./context/user"

function Review({ review, trail }) {

    const { loggedIn, trails, setTrails, user, setUser } = useContext(UserContext)
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
                user.id === review.user_id ? (
                    <button className="editButton"
                        onClick={() => setEditButton(true)}>
                        Edit Review
                    </button>
                ) : null
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
                            onChange={(e) => setTempReview(e.target.value)}
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
                    <h3 className="rating">{review.rating}/5</h3>
                    <p className="review">{review.review}</p>
                    <p>-{review.username}</p>
                </div>
            )
        }
    }

    function patchReview() {
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
                if (!updatedReview.errors) {
                    if (!updatedReview.error) {
                        frontEndPatch(updatedReview, review.id, trail.id)
                        setErrorList(null)
                    }
                    else {
                        const error = <li style={{ color: 'red' }}>{updatedReview.error}</li>
                        setErrorList([error])
                    }
                }
                else {
                    const errors = updatedReview.errors.map((error, index) => (
                        <li key={index} style={{ color: 'red' }}>{error}</li>
                    ))
                    setErrorList(errors)
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

    function deleteReview() {
        const reviewId = review.id
        fetch(`${trail.id}/reviews/${review.id}`, {
            method: "DELETE",
        })
            .then((r) => {
                if (r.status === 204) {
                    frontEndDelete(reviewId, trail)
                }
                else if (r.status === 401) {
                    const error = <li style={{ color: 'red' }}>error: You do not have permission to delete this review</li>
                    setErrorList(error)
                }
                else {
                    const error = <li style={{ color: 'red' }}>error: An error occured while deleting this review</li>
                    setErrorList(error)
                }
            })
            .catch((error) => {
                console.log("Error deleting review:", error)
            })
    }

    function frontEndDelete(rid, trail) {
        console.log("Trail ID:", trail);
        console.log("User ID:", user.id);
        console.log("Review ID:", rid);
        console.log("User Trails Before:", user.trails);
        
        let changeUserState = true
        const updatedTrails = trails.map((t) => {
            if (t.id === trail.id) {
                const updatedReviews = t.reviews.filter((review) => review.id !== rid)
                changeUserState = !updatedReviews.some((r) => r.user_id === user.id)
                return { ...t, reviews: updatedReviews }
            }
            return t
        })
        setTrails(updatedTrails)
        if (changeUserState) {
            const updatedUserTrails = user.trails = user.trails.filter((t) => t.id !== trail.id);
            setUser({...user, trails: updatedUserTrails})
            console.log("User after:", user)
        }
        console.log("updated Trails:", updatedTrails)
    }

    if (loggedIn) {
        return (
            <div>
                {editReview()}
                {getButton()}
                {user.id === review.user_id ? (
                    <button className="deleteButton" onClick={() => deleteReview()}>
                        Delete Review
                    </button>
                ) : null}
                {errorList}
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

export default Review