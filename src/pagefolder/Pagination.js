import React from "react";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./Pagination.css";


const Pagination = (props) =>{
    
const { totalPagesProps, currentPageProps, handlePageChangeProps } = props;
    
    return (
        <div className="paginationButtons">
         
           <button className={`doubleArrowLeftIcon ${currentPageProps === 1 ?"" :"activeDoubleArrowLeft"}`} onClick={() => handlePageChangeProps(1)} disabled={currentPageProps === 1}><KeyboardDoubleArrowLeftIcon/></button>
         
           <button className={`arrowBackIcon ${currentPageProps === 1 ? "" : "activeArrowBackIcon"}`} onClick={() => handlePageChangeProps(currentPageProps - 1)} disabled={currentPageProps === 1}><ArrowBackIosIcon/></button>
         
            { Array.from({ length: totalPagesProps }, (_, index) => {
                return(
                <button className={`pageNumbers ${currentPageProps === index + 1 ? "activePage" : ""}`} key={index + 1} onClick={() => handlePageChangeProps(index + 1)}>
                   {index + 1}
                </button>
                    )
                })
    
            }
        

          <button className={`arrowForwardIcon ${currentPageProps === totalPagesProps ? "":"activeArrowForwardIcon"}`} onClick={() => handlePageChangeProps(currentPageProps + 1)} disabled={currentPageProps === totalPagesProps}><ArrowForwardIosIcon/></button>

          <button className={`doubleArrowRightIcon ${currentPageProps === totalPagesProps ? "":"activeDoubleArrowRightIcon"}`} onClick={() => handlePageChangeProps(totalPagesProps)} disabled={currentPageProps === totalPagesProps}><KeyboardDoubleArrowRightIcon/></button>

        </div>
    )
};

export default Pagination;