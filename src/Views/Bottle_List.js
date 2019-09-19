import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Views.css";
import TopBar from "./TopBar.js";
import { Contains_Content_Filter } from "../Aux_Functions/Aux_Functions.js";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";

//Defining Snackbars:
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

//Defining Class
class Bottle_List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Holds Information About All Existing Records And Total of Records to Display
      All_Bottles: undefined,
      Total_Bottles: null,

      //Variables to Control Snackbars
      Bottle_Added: null,
      Bottle_Edited: null,

      //Filter Variables
      Name_Bottle_Filter: null,
      Brand_Bottle_Filter: null,
      Vineyard_Bottle_Filter: null,
      Year_Bottle_Filter: null,
      Alcohol_Percentage_Bottle_Filter: null
    };

    if (props.location.state === undefined) {
      this.state.Bottle_Added = false;
      this.state.Bottle_Edited = false;
    } else {
      if (props.location.state.Bottle_Added === undefined) {
        this.state.Bottle_Added = false;
      } else {
        this.state.Bottle_Added = props.location.state.Bottle_Added;
      }
      if (props.location.state.Bottle_Edited === undefined) {
        this.state.Bottle_Edited = false;
      } else {
        this.state.Bottle_Edited = props.location.state.Bottle_Edited;
      }
    }

    this.handleChange = this.handleChange.bind(this);

    //Methods to Order Records Shown on Table
    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.compareByNumber.bind(this);
  }

  //Auxiliary Functions (SortBy)
  compareBy(key) {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  compareByNumber(key) {
    return function(a, b) {
      //return parseInt(a[key]) - parseInt(b[key]); //Lower to Higher
      return parseInt(b[key]) - parseInt(a[key]); //Higher to Lower
    };
  }

  //Sorts The Variable That Holds All Records Depending on Which Table Header Was Clicked
  sortBy(key) {
    let arrayCopy = [...this.state.All_Bottles];
    if (key === "Year" || key === "Alcohol_Percentage") {
      arrayCopy.sort(this.compareByNumber(key));
    } else {
      arrayCopy.sort(this.compareBy(key));
    }
    this.setState({ All_Bottles: arrayCopy });
  }

  //Function to Read Data From LocalStorage (or Create Data If No Records Are Found)
  Extract_Data() {
    /* Procedure With Fake Data */
    var Aux_Copy_All_Bottles;

    //If No Bottles Are Stored on LocalStorage, 2 Bottles Are Created And Stored
    if (localStorage.getItem("All_Bottles") === null) {
      localStorage.setItem(
        "All_Bottles",
        JSON.stringify({
          Bottles: [
            {
              ID: 0,
              Name: "Madeira Wine",
              Brand: "Blandy's",
              Vineyard: "Madeira",
              Year: "2000",
              Alcohol_Percentage: "19",
              Country_Origin: "Portugal"
            },
            {
              ID: 1,
              Name: "Porto Wine",
              Brand: "Cálem",
              Vineyard: "Porto",
              Year: "1950",
              Alcohol_Percentage: "85",
              Country_Origin: "Portugal"
            }
          ]
        })
      );

      Aux_Copy_All_Bottles = JSON.parse(localStorage.getItem("All_Bottles"));

      this.setState({
        Total_Bottles: Aux_Copy_All_Bottles.Bottles.length,
        All_Bottles: Aux_Copy_All_Bottles.Bottles
      });
    } else {
      Aux_Copy_All_Bottles = JSON.parse(localStorage.getItem("All_Bottles"));

      this.setState({
        Total_Bottles: Aux_Copy_All_Bottles.Bottles.length,
        All_Bottles: Aux_Copy_All_Bottles.Bottles
      });
    }
  }

  componentDidMount() {
    this.Extract_Data();
  }

  //Functions to Show Snackbar When Bottle is Added Successfully
  handleClose_Bottle_Added = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ Bottle_Added: false });
  };

  Shows_Message_Added_Bottle_Success = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.Bottle_Added}
        autoHideDuration={3000}
        onClose={this.handleClose_Bottle_Added}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose_Bottle_Added}
          variant="success"
          message="Bottle Added Successfully!"
        />
      </Snackbar>
    );
  };

  //Functions to Show Snackbar When Bottle is Edited Successfully
  handleClose_Bottle_Edited = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ Bottle_Edited: false });
  };

  Shows_Message_Edited_Bottle_Success = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.Bottle_Edited}
        autoHideDuration={3000}
        onClose={this.handleClose_Bottle_Edited}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose_Bottle_Edited}
          variant="success"
          message="Bottle Edited Successfully!"
        />
      </Snackbar>
    );
  };

  //Function Only Counts Records That Will be Displayed And Updates "Total_Bottles" Variable
  Count_Filter_Records() {
    var Conta_Registos = 0;
    this.state.All_Bottles.forEach(line2 => {
      var Record_Found = true;

      if (
        this.state.Name_Bottle_Filter !== null &&
        Contains_Content_Filter(this.state.Name_Bottle_Filter, line2.Name) ===
          false
      ) {
        Record_Found = false;
      }
      if (
        this.state.Brand_Bottle_Filter !== null &&
        Contains_Content_Filter(this.state.Brand_Bottle_Filter, line2.Brand) ===
          false
      ) {
        Record_Found = false;
      }
      if (
        this.state.Vineyard_Bottle_Filter !== null &&
        Contains_Content_Filter(
          this.state.Vineyard_Bottle_Filter,
          line2.Vineyard
        ) === false
      ) {
        Record_Found = false;
      }
      if (
        this.state.Year_Bottle_Filter !== null &&
        Contains_Content_Filter(this.state.Year_Bottle_Filter, line2.Year) ===
          false
      ) {
        Record_Found = false;
      }
      if (
        this.state.Alcohol_Percentage_Bottle_Filter !== null &&
        Contains_Content_Filter(
          this.state.Alcohol_Percentage_Bottle_Filter,
          line2.Alcohol_Percentage
        ) === false
      ) {
        Record_Found = false;
      }

      if (Record_Found) {
        Conta_Registos++;
      }
    });
    this.setState({ Total_Bottles: Conta_Registos });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.Count_Filter_Records();
    });
  }

  render() {
    if (this.state.All_Bottles === undefined) {
      return (
        <div>
          <div className="center_loading">
            <h1>Loading...</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <TopBar />
          </div>
          <div className="margens_tabela">
            <table className="tabela">
              <thead>
                <tr>
                  {
                    //Begin Filter
                  }
                  <th colSpan="6">
                    {" "}
                    Filter By:
                    <input
                      autoFocus="true"
                      type="text"
                      name="Name_Bottle_Filter"
                      placeholder="Name"
                      onChange={this.handleChange}
                      defaultValue={this.state.Name_Bottle_Filter}
                      style={{
                        marginLeft: "10px",
                        width: "70px",
                        textAlign: "center"
                      }}
                    />
                    <input
                      type="text"
                      name="Brand_Bottle_Filter"
                      placeholder="Brand"
                      onChange={this.handleChange}
                      defaultValue={this.state.Brand_Bottle_Filter}
                      style={{
                        marginLeft: "10px",
                        width: "70px",
                        textAlign: "center"
                      }}
                    />
                    <input
                      type="text"
                      name="Vineyard_Bottle_Filter"
                      placeholder="Vineyard"
                      onChange={this.handleChange}
                      defaultValue={this.state.Vineyard_Bottle_Filter}
                      style={{
                        marginLeft: "10px",
                        width: "70px",
                        textAlign: "center"
                      }}
                    />
                    <input
                      type="number"
                      name="Year_Bottle_Filter"
                      placeholder="Year"
                      onChange={this.handleChange}
                      defaultValue={this.state.Year_Bottle_Filter}
                      min="0"
                      style={{
                        marginLeft: "10px",
                        width: "70px",
                        textAlign: "center"
                      }}
                    />
                    <input
                      type="number"
                      name="Alcohol_Percentage_Bottle_Filter"
                      placeholder="Alcohol %"
                      onChange={this.handleChange}
                      defaultValue={this.state.Alcohol_Percentage_Bottle_Filter}
                      min="0"
                      max="100"
                      style={{
                        marginLeft: "10px",
                        width: "80px",
                        textAlign: "center"
                      }}
                    />
                  </th>
                </tr>
              </thead>
              {
                //End Filter
                //Begin Table
              }
              <thead>
                <tr>
                  <th colSpan="6">
                    Total of Bottles Found: {this.state.Total_Bottles}
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th onClick={() => this.sortBy("Name")}>
                    Name{" "}
                    <i
                      className="fa fa-angle-down fa-sm" /*fa fa-sort fa-sm*/
                    />
                  </th>
                  <th onClick={() => this.sortBy("Brand")}>
                    Brand{" "}
                    <i
                      className="fa fa-angle-down fa-sm" /*fa fa-sort fa-sm*/
                    />
                  </th>
                  <th onClick={() => this.sortBy("Vineyard")}>
                    Vineyard{" "}
                    <i
                      className="fa fa-angle-down fa-sm" /*fa fa-sort fa-sm*/
                    />
                  </th>
                  <th onClick={() => this.sortBy("Year")}>
                    Year{" "}
                    <i
                      className="fa fa-angle-down fa-sm" /*fa fa-sort fa-sm*/
                    />
                  </th>
                  <th onClick={() => this.sortBy("Alcohol_Percentage")}>
                    Alcohol % {/*Percentage*/}{" "}
                    <i
                      className="fa fa-angle-down fa-sm" /*fa fa-sort fa-sm*/
                    />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.All_Bottles.map(line => {
                  var Record_Found = true;

                  //Checks For User Input in Every Filter Box
                  //In Short, If User Input is Found For a Field, Every Record That Contains That Input Will Be Displayed in The Table

                  if (
                    this.state.Name_Bottle_Filter !== null &&
                    Contains_Content_Filter(
                      this.state.Name_Bottle_Filter,
                      line.Name
                    ) === false
                  ) {
                    Record_Found = false;
                  }
                  if (
                    this.state.Brand_Bottle_Filter !== null &&
                    Contains_Content_Filter(
                      this.state.Brand_Bottle_Filter,
                      line.Brand
                    ) === false
                  ) {
                    Record_Found = false;
                  }
                  if (
                    this.state.Vineyard_Bottle_Filter !== null &&
                    Contains_Content_Filter(
                      this.state.Vineyard_Bottle_Filter,
                      line.Vineyard
                    ) === false
                  ) {
                    Record_Found = false;
                  }
                  if (
                    this.state.Year_Bottle_Filter !== null &&
                    Contains_Content_Filter(
                      this.state.Year_Bottle_Filter,
                      line.Year
                    ) === false
                  ) {
                    Record_Found = false;
                  }
                  if (
                    this.state.Alcohol_Percentage_Bottle_Filter !== null &&
                    Contains_Content_Filter(
                      this.state.Alcohol_Percentage_Bottle_Filter,
                      line.Alcohol_Percentage
                    ) === false
                  ) {
                    Record_Found = false;
                  }

                  //On Other Hand, If No Filter Input is Provided, Every Record Stored is Displayed
                  if (Record_Found === true) {
                    return (
                      <tr>
                        <td>{line.Name}</td>
                        <td>{line.Brand}</td>
                        <td>{line.Vineyard}</td>
                        <td>{line.Year}</td>
                        <td>{line.Alcohol_Percentage + "%"}</td>
                        <td>
                          <Link
                            to={{
                              pathname: "/details",
                              state: {
                                Number_Bottle: line.ID
                              }
                            }}
                            title="Edit/See Details"
                          >
                            <i className="fa fa-eye fa-lg" />
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            {
              // End Table
              // Snackbars
            }
            {this.Shows_Message_Added_Bottle_Success()}
            {this.Shows_Message_Edited_Bottle_Success()}
          </div>
        </div>
      );
    }
  }
}

export default Bottle_List;
