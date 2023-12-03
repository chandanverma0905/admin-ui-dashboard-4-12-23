import React from "react";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./ActionsComp.css";

const ActionsComp = (props)=>{

    const {onEditClickProps, onDeleteClick}=props;
    return(
       <div className="ActionsButtons">
             
           <BorderColorOutlinedIcon sx={{width: 30 , height: 30}} className="editicon" onClick={onEditClickProps}/>
              
           <DeleteOutlineOutlinedIcon sx={{width: 35 , height: 35}}  style={{ fill: 'red' }} className="deleteicon" onClick={onDeleteClick}/>
        
       </div>
    );
}

export default ActionsComp;
