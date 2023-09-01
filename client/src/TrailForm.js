import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";


function TrailForm({ addTrail }) {

    const [trailName, setTrailName] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [trailPhoto, setTrailPhoto] = useState("")
    const { addTrail } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        addTrail({
            trail_name: trailName,
            description: description,
            location: location,
            difficulty: difficulty,
            trail_image: trailPhoto
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <lable>Trail Name:</lable>
            <input 
                type="text"
                id="trail_name"
                value={trailName}
                onChange={(e) => setTrailName(e.target.value)}
            /> <br/>
            <lable>Description:</lable>
            <input 
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /> <br/>
            <lable>Location:</lable>
            <input 
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            /> <br/>
            <lable>Difficulty out of 5:</lable>
            <input 
                type="integer"
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            /> <br/>
            <lable>Trail Photo:</lable>
            <input 
                type="text"
                id="trail_photo"
                value={trailPhoto}
                onChange={(e) => setTrailPhoto(e.target.value)}
            /> <br/>
        </form>
    )
}

export default TrailForm