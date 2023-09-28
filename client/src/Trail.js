import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"
import { useParams, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";

function Trail() {

    const params = useParams()
    const { loggedIn, trails, setTrails } = useContext(UserContext)
    const [editButton, setEditButton] = useState(false)
    const [errorList, setErrorList] = useState([])
    const [tempDescription, setTempDescription] = useState('')
    // const [trail, setTrail] = useState('')
    const navigate = useNavigate()
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 3000)
        return () => clearTimeout(timer)
    }, [])
    
    const trail = trails.find((tr) => (tr.id === parseInt(params.id)))
    // setTrail(currentTrail)     

    if (!trail) {
        return (
            <div>
                <h2>loading...</h2>
                {showContent && (
                    <p>If the page hasn't loaded navigate back to the trails page and pick a trail from there</p>
                )}
            </div>
        )
    }

    // useEffect(() => {
    //     setTempDescription(trail.description)
    // },[]) 

    function getButton() {
        if (editButton) {
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

    function handleSubmit(e) {
        e.preventDefault()
        patchTrail(trail)
        setEditButton(false)
    }

    function editTrail() {
        if (editButton) {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="description"
                            type="text"
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                    {errorList}
                </div>
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
                description: tempDescription
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((r) => r.json())
            .then((updatedTrail) => {
                if (!updatedTrail.errors) {
                    frontEndPatch(updatedTrail, trail.id)
                    setErrorList(null)
                }
                else {
                    setErrorList(updatedTrail.errors.map((error, index) => <li key={index} style={{ color: 'red' }}>{error}</li>))
                }
            })
    }

    function frontEndPatch(updatedTrail, id) {
        const updatedTrails = trails.map((trail) => {
            if (trail.id === id) {
                return updatedTrail
            }
            else {
                return trail
            }
        })
        setTrails(updatedTrails)
    }

    function deleteTrail(id) {
        fetch(`/trails/${id}`, {
            method: "DELETE",
        })
            .then(() => frontEndDelete(id))
            .catch((error) => {
                console.error("Error deleting trail:", error)
            })
    }

    function frontEndDelete(id) {
        const updatedTrails = trails.filter((trail) => trail.id !== id)
        setTrails(updatedTrails)
        navigate('/')
    }

    if (loggedIn) {
        return (
            <div>
                <br />
                <h2>{trail.trail_name}</h2>
                <img src={trail.trail_image} alt={trail.trail_name} />
                <p>Description:</p>
                {editTrail()}
                {getButton()}
                {errorList}
                <p>Location: {trail.location}</p>
                <p>Difficulty: {trail.difficulty}/5</p>
                <button className="deleteButton" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
                <hr />
                <h3>Reviews:</h3>
                <Reviews trail={trail}/>
            </div>
        )
    }
    else {
        return (
            <h3> Not Authorized - Please Signup or Login </h3>
        )
    }
}


export default Trail