import React, {useState, useEffect} from "react";
import "./Search.css";
const Search=(props)=>{
  
  const {searchTermProps, captureSearchTextProps} = props;
    return(
      <div> 

            <input 
            type="text" 
            placeholder="Search by name, email or role" 
            value={searchTermProps}
            onChange={captureSearchTextProps} 
            className="searchbar"
            />
      </div>
    );
}
export default Search;