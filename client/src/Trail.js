import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user"
import { useParams, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";

function Trail() {
    const [trail, setTrail] = useState({
        reviews: []
    })

    const params = useParams()
    const { loggedIn, trails, setTrails } = useContext(UserContext)
    const [editButton, setEditButton] = useState(false)
    const [errorList, setErrorList] = useState([])
    const [tempDescription, setTempDescription] = useState('')
    const navigate = useNavigate()
    

    useEffect(() => { 
        fetch(`/trails/${params.id}`)
        //Something is wrong with this error checking: not producing any errors
        .then((r) => r.json())
        .then ((trail) => {
            // console.log(trail.errors)
            if(!trail.errors){
                setTrail(trail)
                setTempDescription(trail.description)
                setErrorList([])
            }
            else {
                const errorLis = trail.errors.map((e, index) => <li key={index}>{e}</li>)
                // console.log(errorLis)
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
                const errorLis = updatedTrail.errors.map((e, index) => <li key={index}>{e}</li>)
                setErrorList(errorLis)
            }
        })
    }


    function frontEndPatch(updatedTrail, id) {
        //Isn't being updated until refresh
        setTrails(trails.map((trail) => {
            if (trail.id === id) {
                return updatedTrail
            }
            return trail 
        }))
    }

    function deleteTrail(id) {
        fetch(`/trails/${id}`,{
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
                    <Reviews trail={trail} onSetTrail={setTrail}/>
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