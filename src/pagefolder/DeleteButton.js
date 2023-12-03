import React from "react";
import "./DeleteButton.css";

const DeleteButton = (props) =>{

const {deleteFunctionProps} =props;

    return (
        <div>
             {/* Delete button */}
              <button className="deleteButton" onClick={deleteFunctionProps}>
              <p className="deleteText"> Delete Selected</p> 
              </button>

        </div>
      );
};

export default DeleteButton;