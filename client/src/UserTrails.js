import React from "react";


function UserTrails({ trail }) {
   

    return(
        <div>
            <h3>{trail.trail_name}</h3>
            <img
                style={{ maxWidth: "25%", height: "auto" }}
                src={trail.trail_image}
                alt={trail.name}
            />
        </div>
    )
}

export default UserTrails