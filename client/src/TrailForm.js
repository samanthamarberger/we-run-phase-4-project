import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";


function TrailForm({ addTrailFlag }) {

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
        addTrailFlag()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Add a new trail...</h1>
                <label>Trail Name:</label>
                <input
                    type="text"
                    id="trail_name"
                    value={trailName}
                    onChange={(e) => setTrailName(e.target.value)}
                /> <br />
                <label>Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /> <br />
                <label>Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                /> <br />
                <label>Difficulty out of 5:</label>
                <input
                    type="number"
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                /> <br />
                <label>Trail Photo:</label>
                <input
                    type="text"
                    id="trail_photo"
                    value={trailPhoto}
                    onChange={(e) => setTrailPhoto(e.target.value)}
                /> <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default TrailForm