import React, {useState} from "react";
import ActionsComp from "./ActionsComp.js";
import "./RowComp.css";

const RowComp = (props)=>{
    const { idProp, nameProp, emailProp, roleProp, selectedProps, toggleRowSelectionProps,  handleSaveClick, onDeleteClickProps} = props;

    // we will need to manage the state to track whether the row is in edit mode or not.
    const [isEditing, setIsEditing]= useState(false);
    
    const [editedRowData, setEditedRowData] = useState({ name: nameProp, email: emailProp, role: roleProp });
    
    const handleEditClickInternal = () =>{
    
        setIsEditing(true);
        // handleEditClick(idProp);
    }
    
    const handleSaveClickInternal = () =>{
    
     
    handleSaveClick(idProp, editedRowData); // Trigger the save function for the specific row ID
    setIsEditing(false);
    }
    
    const handleCancelClick = ()=>{
        setIsEditing(false);
    }
    
    const handleInputChange = (e, fieldName)=>{
        setEditedRowData({...editedRowData,[fieldName]: e.target.value});
    }
    
        return(
    
            <div>
               
                <tr className={`rowDefinition ${selectedProps ? "selected" : ""}`}>
    
                        <td className="boxRowCheckboxContent">
                            <input type="checkbox" 
                                   id={idProp} 
                                   checked={selectedProps}
                                   onChange={()=>{toggleRowSelectionProps(idProp)}}
                                   className="checkboxRow"
                            />
                        </td>
    
                        <td className="boxRowNameContent">
                            { isEditing ? 
                            (<input type="text" 
                                    value={editedRowData.name} 
                                    onChange= {(e) => handleInputChange(e, "name")} 
                                    />)
                            :
                            (nameProp)}
                        </td>
    
                        <td className="boxRowEmailContent">
                        { isEditing ? (<input type="text" 
                                              value={editedRowData.email} 
                                              onChange= {(e) => handleInputChange(e, "email")} 
                                       />)
                            :
                            (emailProp)}
                        </td>
    
                        <td className="boxRowRoleContent">
                        { isEditing ? (
                        <input type="text"
                               value={editedRowData.role} 
                               onChange= {(e) => handleInputChange(e, "role")} />)
                            :
                            (roleProp)}
                        </td>
    
                        <td className="boxRowActionsContent">
                            {isEditing ? (
                                <div>
                                    <button className="savebutton" onClick={handleSaveClickInternal}>Save</button>
                                    <button className="cancelbutton" onClick={handleCancelClick}>Cancel</button>
                                </div>
                            )
                            :
                            (<ActionsComp onEditClickProps={handleEditClickInternal}    
                                          onDeleteClick={()=>{onDeleteClickProps(idProp)}}
                                          />)
                            }
                            
                        </td>  
                </tr>
               
                <tr><div className="lineRow"></div></tr>
            </div>
        );
    }
    
    export default RowComp;
    