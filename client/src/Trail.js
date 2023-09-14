import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"
import { useParams } from "react-router-dom";
import Review from "./Review";

function Trail() {
    const [trail, setTrail] = useState({
        reviews: []
    })

    const params = useParams()
    const { loggedIn, trails, setTrails } = useContext(UserContext)
    const [reviewFormFlag, setReviewFormFlag] = useState(false)
    const [editButton, setEditButton] = useState(false)
    const [tempDescription, setTempDescription] = useState(trail.description)
    const [errorList, setErrorList] = useState([])
    // console.log(trail.description)
    // console.log(tempDescription)

    useEffect(() => {
        fetch(`/trails/${params.id}`)
        //Something is wrong with this error checking: not producing any errors
        .then((r) => r.json())
        .then ((trail) => {
            console.log(trail.errors)
            if(!trail.errors){
                setTrail(trail)
                setErrorList([])
            }
            else {
                const errorLis = trail.errors.map((e, index) => <li key={index}>{e}</li>)
                setErrorList([errorLis])
            }
        })
    }, [])

    function getButton() {
        if(editButton) {
            return null
        }
        else {
            return (
                <button className="editButton"
                    onClick={() => setEditButton(true)}>
                    Edit Trail
                </button>
            )
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        patchTrail(trail)
        setEditButton(false)
    }

    function editTrail() {
        if(editButton) {
            return (
                <form onSubmit={handleSubmit}>
                    <textarea 
                        className="description"
                        type="text" 
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            )
        }
        else {
            return <p className="description" >{trail.description}</p>
        }
    }

    function patchTrail(trail) {
        fetch(`/trails/${trail.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                description: trail.description
            }),
            headers: {
                "Content-Type" : "application/json",
            }
        })
        .then((r) => r.json())
        .then((updatedTrail) => frontEndPatch(updatedTrail, trail.id))
    }

    //COME BACK TO THIS> THIS AND THE UPDATE CONTROLLER ARE WHATS CAUSING THE EDIT
    function frontEndPatch(updatedTrail, id) {
        setTrails(prevTrails => {
            const updatedTrails = prevTrails.map(trail => {
                if (trail.id === id) {
                    return{...updatedTrail}
                }
                return trail
            })
            return{...prevTrails, updatedTrails}
        })
    }

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
        if (trail.errors) {
            return {errorList}
        }
        else {
            return (
                <div>
                    <br />
                    <h2>{trail.trail_name}</h2>
                    <img src={trail.trail_image} alt={trail.trail_name}/>
                    {editTrail()}
                    {getButton()}
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
    }
    else {
        return (
            <h3> Not Authorized - Please Signup or Login </h3>
        )
    }
}


export default Trail