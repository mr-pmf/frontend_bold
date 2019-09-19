import React from "react";
//import { Link } from "react-router-dom";
import TopBar from "../Views/TopBar.js";

//Checks if Object is Empty -> Function Copied From Web
export const isEmptyObject = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

//Checks if The User's Input Exists in The Record
export const Contains_Content_Filter = (Filter_Content, DB_Record) => {
  //if(Record.includes(Filter_Content)) -> Doesn't Include Internet Explorer Support
  if (DB_Record.indexOf(Filter_Content) !== -1) {
    // If User's Input Doesn't Exists, Then Index ==-1
    return true; //Found Input in The Record
  } else {
    return false; //Input Not Found in The Record
  }
};

//This Message is Shown if Something Went Wrong With Props
export const Show_Error_Message = () => {
  return (
    <div>
      <div>
        <TopBar />
      </div>
      <div className="center_loading">
        <h1>Ups Something Went Wrong</h1>
      </div>
      {/*<button>
        <Link
          to={{
            pathname: "/main"
          }}
        >
          <i className="fa fa-arrow-left fa-lg" />
          Back
        </Link>
      </button>*/}
    </div>
  );
};
