import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "./Search.js";
import RowComp from "./RowComp.js";
import DeleteButton from "./DeleteButton.js";
import Pagination from "./Pagination.js";
import "./TableDisplay.css";
const TableDisplay = ()=>{
 
  const [errorShow, setErrorShow] = useState(null);
  const [getData, setData] =  useState([]);    // Store fetched data
  const [currentPage, setCurrentPage] =  useState(1);     // Current page
  const [allData, setAllData] = useState([]); // store all fetched data
  const [pageSize] =  useState(10); // Number of entries per page
  const [searchTerm, setSearchTerm] = useState("");
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // Define editedData state to manage edited data for each row
  const [editedData, setEditedData] = useState({});
 
  
  // based on the searchText url is changing everytime
  const fetchDataAndCalculate = async(searchText)=>{
       
  let url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  try{  
  const resp =  await axios.get(url);

  // console.log(resp);
  const dataList = resp.data;

  // console.log(dataList, "here");
  setAllData(dataList);    // [{},{},{},{},{},...] 
  setErrorShow(null); // Reset error state on successful fetch
  

  // Calculate filteredData based on the updated data and search term
  const filtered = dataList.map((element) => {
  const id = element.id;
  if(editedData[id]){
    return {...element, ...editedData[id]};
    }
    return element;
    }).filter((element)=>{
                      const { name, email, role } = element;
             return (
               name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               email.toLowerCase().includes(searchTerm.toLowerCase()) ||
               role.toLowerCase().includes(searchTerm.toLowerCase())
             )
            });
       
    setFilteredData(filtered);
    
    // Update noSearchResults state based on the filtered data length
    setNoSearchResults(filtered.length === 0); 
           
    // Calculate total number of pages based on filteredData length
    const totalFilteredEntries = filtered.length;
    const totalPages = Math.ceil(totalFilteredEntries / pageSize);
           
   // Update the currentPage if it exceeds the new totalPages
    if (currentPage > totalPages) 
      {
         setCurrentPage(totalPages);
      }
   
   }

    catch(error)
    {
       if(error.response)
       {
  // The request was made and the server responded with an error status code
  // we can extract the status code and handle different scenarios accordingly
         console.error("Error response from server", error.response.status);
         setErrorShow(`Error response from server: ${error.response.status}`);
       }
  // we Show an appropriate error message to the user based on the error status code
  // like For example:
  // showErrorMessage("Failed to fetch data. Please try again later.");
   
      else if(error.request)
      {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setErrorShow(`No response received: ${error.request}`);

    // Handle network issues or show an appropriate error message to the user
    //like  For example:
    // showErrorMessage("Network error. Please check your internet connection.");
      }

     else{
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up the request:", error.message);
      setErrorShow(`Error setting up the request: ${error.message}`);
    // Handle other types of errors or show an appropriate error message to the user
     // For example:
    // showErrorMessage("An unexpected error occurred. Please try again later.");
     }
    }
}


const totalEntries = filteredData.length;

const totalPages = Math.ceil(totalEntries / pageSize);

const startIndex = (currentPage - 1) * pageSize;

const endIndex = startIndex + pageSize;

const currentPageData = filteredData.slice(startIndex, endIndex);


const handlePageChange = (newPage) => {
setCurrentPage(newPage);
};

// const captureSearchText = (e)=>{
// setSearchTerm(e.target.value);         
// }

const toggleRowSelection = (id) => {

 const updatedSelectedRows = [...selectedRows];
      if (updatedSelectedRows.includes(id)) 
      {
       // Deselect the row
      updatedSelectedRows.splice(updatedSelectedRows.indexOf(id), 1);
      } 
      
      else 
      {
      // Select the row
      updatedSelectedRows.push(id);
      }
     setSelectedRows(updatedSelectedRows);
  }

  const handleSelectAll = () => {
    
    // deselect all rows as selectAll state is false initially
    if (selectAll) {
      setSelectedRows([])
    } 

    // select all rows
    else {
      const currentPageIds = currentPageData.map((row) => row.id);
      setSelectedRows(currentPageIds);
    }
      setSelectAll(!selectAll);  // setSelectAll(true)
  }
  

  
  const captureSearchText = (e)=>{

    setSearchTerm(e.target.value);         
  }
  

// Function to delete selected rows
const deleteSelectedRows =()=>{
 
  const remainingRows = filteredData.filter((row) => !selectedRows.includes(row.id));
  setFilteredData(remainingRows); // (remainingRows)
  setSelectedRows([]);
  setSelectAll(false);
  };
  
  const handleDeleteRow = (id) => {
      
    // Filter out the selected row from the data
    const updatedData = filteredData.filter((row) => row.id !== id);
    setFilteredData(updatedData);
    setSelectedRows([]);
    setSelectAll(false);
  };

const handleSaveClick = (editedRowId, editedRowData)=>{
  //Implement logic to update the data after saving the specific row
  const updatedData = getData.map((row)=>
    row.id === editedRowId ? {...row, ...editedRowData}: row );

    setData(updatedData);
   
    //Update the edited data for the specific row ID
    const updatedEditedData = { ...editedData, [editedRowId]: editedRowData };
    // delete updatedEditedData[editedRowId];
    setEditedData(updatedEditedData);

    // update local storage with the updated edited data
    localStorage.setItem("editedData", JSON.stringify(updatedEditedData));
  }

  const handleEditClick = (id)=>{
      // Find the specific row in your data based on its ID
       const editedRow = getData.find((row) => row.id === id);

       // Set the edited data to be used for that specific row
       setEditedData((prevEditedData) => ({
             ...prevEditedData,
           [id]: { ...editedRow } // Storing the edited row data using its ID as the key in editedData state
            }));
  };

  useEffect(()=>{
      fetchDataAndCalculate();
       }, [searchTerm, editedData, currentPage, pageSize]);   


  return(
    <div>
         {/* if errorShow is true then conditionally renders the <p> element with the class errorMessage only if the errorShow variable contains a truthy value. If errorShow is null, undefined, 0, false, or an empty string, nothing will be rendered based on the behavior of the && operator  */}
         {/* {errorShow && <p className="errorMessage">{errorShow}</p>}  */}

         {errorShow ? (<p className="errorMessage">{errorShow}</p>):(
          <div className="pageTableveiw">
               <Search searchTermProps={searchTerm} captureSearchTextProps={captureSearchText} />

        {/* Display data from currentPageData */}
         {noSearchResults ? (<p className="noresults">Sorry, no data for the provided search term</p>):(
         <table className="dashboardtable">

            <thead className="tableHeader">
              <tr className="textHeader">
                <th>
                  <div className="boxHeadCheckbox">
                  <input 
                     type="checkbox" 
                     checked={selectAll}
                     onChange={handleSelectAll}
                     className="checkboxHeader"
                  />
                   </div>
                </th>
                <th className="nameHead"><div className="boxHead">Name</div></th>
                <th className="emailHead"><div className="boxHead">Email</div></th>
                <th className="roleHead"><div className="boxHead">Role</div></th>
                <th className="actionsHead"><div className="boxHead">Actions</div></th>
              </tr>

            </thead>
           
           <tbody>
            
           <tr><div className="lineHead"></div></tr>

            {currentPageData.map((dataelem, idx)=>{
             
             const{id, name, email, role}= dataelem;
              return(
                
                <RowComp
                key={id} 
                idProp={id} 
                nameProp={name} 
                emailProp={email} 
                roleProp={role}
                selectedProps={selectedRows.includes(id)}
                toggleRowSelectionProps={toggleRowSelection}
                onDeleteClickProps={()=>{handleDeleteRow(id)}}
                getDataProps={getData}  // Pass getData as a prop
                setDataProps={setData}  // Pass setData as a prop
 
                handleEditClick={handleEditClick}     // Pass the edit function
                handleSaveClick={handleSaveClick}  //Pass the save function
                editedData={editedData} //Pass the edited data for each row
                />            
              )
              
            })}
              
            </tbody>
          </table>

          )}
          <DeleteButton deleteFunctionProps={deleteSelectedRows}/>

          <Pagination totalPagesProps={totalPages}
                      currentPageProps={currentPage}
                      handlePageChangeProps={handlePageChange}
          />
        </div>
        )}     
    </div>
  )
}
export default TableDisplay ; 


