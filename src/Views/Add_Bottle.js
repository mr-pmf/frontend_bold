import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Views.css";
import TopBar from "./TopBar.js";

import { isEmptyObject } from "../Aux_Functions/Aux_Functions.js";

class Add_Bottle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Information About Bottle to Add
      Name_Bottle: null,
      Brand_Bottle: null,
      Vineyard_Bottle: null,
      Year_Bottle: null,
      Alcohol_Percentage_Bottle: null,
      Country_Origin_Bottle: null,

      //Redirects to Bottle List When True
      Bottle_Added_Successfully: null,

      //Checks If There Is Any Problem When Validating Form Fields
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Checks If Every Mandatory Field Was Filled
  handleValidation() {
    let errors = {};
    let formIsValid = false;

    if (!this.state.Name_Bottle) {
      errors["Name_Bottle"] = "*Name is Mandatory";
    }
    if (!this.state.Brand_Bottle) {
      errors["Brand_Bottle"] = "*Brand is Mandatory";
    }
    if (!this.state.Vineyard_Bottle) {
      errors["Vineyard_Bottle"] = "*Vineyard is Mandatory";
    }
    if (!this.state.Year_Bottle) {
      errors["Year_Bottle"] = "*Year is Mandatory";
    }
    if (!this.state.Alcohol_Percentage_Bottle) {
      errors["Alcohol_Percentage_Bottle"] = "*Alcohol Percentage is Mandatory";
    }
    if (!this.state.Country_Origin_Bottle) {
      errors["Country_Origin_Bottle"] = "*Country of Origin is Mandatory";
    }

    if (isEmptyObject(errors)) {
      formIsValid = true;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //If All Mandatory Fields Were Filled, Adds Record to LocalStorage
  handleSubmit(event) {
    event.preventDefault();

    if (this.handleValidation()) {
      var Aux_Copy_All_Bottles = JSON.parse(
        localStorage.getItem("All_Bottles")
      );

      var Aux_ID_Bottles = Aux_Copy_All_Bottles.Bottles.length; //Aux_Copy_All_Bottles.Bottles.length + 1;
      Aux_Copy_All_Bottles["Bottles"].push({
        ID: Aux_ID_Bottles,
        Name: this.state.Name_Bottle,
        Brand: this.state.Brand_Bottle,
        Vineyard: this.state.Vineyard_Bottle,
        Year: String(this.state.Year_Bottle),
        Alcohol_Percentage: String(this.state.Alcohol_Percentage_Bottle),
        Country_Origin: this.state.Country_Origin_Bottle
      });

      localStorage.setItem("All_Bottles", JSON.stringify(Aux_Copy_All_Bottles));

      this.setState({ Bottle_Added_Successfully: true });
    }
  }

  //Function to Create Data If No Records Are Found
  Extract_Data() {
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
    }
  }

  componentDidMount() {
    this.Extract_Data();
  }

  render() {
    //If Bottle Was Added Successfully, Redirects to Bottle List
    if (this.state.Bottle_Added_Successfully === true) {
      this.props.history.push({
        pathname: "/main",
        state: { Bottle_Added: true }
      });
    }

    const border_error = "1px solid #ff0000";

    return (
      <div>
        <div>
          <TopBar />
        </div>

        <div className="novas_margens_volta_novos_forms">
          <div className="centra_novos_forms">
            <form onSubmit={this.handleSubmit}>
              <div className="centra_titulos_tabs">
                <Tabs>
                  <TabList>
                    <Tab
                      style={{
                        border:
                          this.state.errors["Name_Bottle"] ||
                          this.state.errors["Brand_Bottle"] ||
                          this.state.errors["Alcohol_Percentage_Bottle"]
                            ? border_error
                            : ""
                      }}
                    >
                      Bottle Info
                    </Tab>
                    <Tab
                      style={{
                        border:
                          this.state.errors["Vineyard_Bottle"] ||
                          this.state.errors["Year_Bottle"] ||
                          this.state.errors["Country_Origin_Bottle"]
                            ? border_error
                            : ""
                      }}
                    >
                      Origin
                    </Tab>
                    <button type="submit" style={{ marginLeft: "10px" }}>
                      Add Bottle
                    </button>
                  </TabList>
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  <TabPanel>
                    <div className="form">
                      <div>
                        <label className="bolder">
                          Name
                          <span className="bolder" style={{ color: "#e60000" }}>
                            {" (*)"}
                          </span>
                        </label>
                        <input
                          style={{
                            border: this.state.errors["Name_Bottle"]
                              ? border_error
                              : "",
                            textAlign: "center"
                          }}
                          type="text"
                          name="Name_Bottle"
                          placeholder="Name"
                          onChange={this.handleChange}
                          defaultValue={this.state.Name_Bottle}
                        />
                        <span className="bolder" style={{ color: "#e60000" }}>
                          {this.state.errors["Name_Bottle"]}
                        </span>
                        <div className="espaco_span" />
                        <label className="bolder">
                          Brand
                          <span className="bolder" style={{ color: "#e60000" }}>
                            {" (*)"}
                          </span>
                        </label>
                        <input
                          style={{
                            border: this.state.errors["Brand_Bottle"]
                              ? border_error
                              : "",
                            textAlign: "center"
                          }}
                          type="text"
                          name="Brand_Bottle"
                          placeholder="Brand"
                          onChange={this.handleChange}
                          defaultValue={this.state.Brand_Bottle}
                        />
                        <span className="bolder" style={{ color: "#e60000" }}>
                          {this.state.errors["Brand_Bottle"]}
                        </span>
                        <div className="espaco_span" />
                        <label className="bolder">
                          Alcohol Percentage
                          <span className="bolder" style={{ color: "#e60000" }}>
                            {" (*)"}
                          </span>
                        </label>
                        <input
                          style={{
                            border: this.state.errors[
                              "Alcohol_Percentage_Bottle"
                            ]
                              ? border_error
                              : "",
                            textAlign: "center"
                          }}
                          type="number"
                          name="Alcohol_Percentage_Bottle"
                          placeholder="Alcohol Percentage"
                          onChange={this.handleChange}
                          defaultValue={this.state.Alcohol_Percentage_Bottle}
                          min="0"
                          max="100"
                        />
                        <span className="bolder" style={{ color: "#e60000" }}>
                          {this.state.errors["Alcohol_Percentage_Bottle"]}
                        </span>
                        <div className="espaco_span" />
                        <span className="bolder" style={{ color: "#e60000" }}>
                          {" (*)"}
                        </span>{" "}
                        <span className="bolder"> Mandatory Fields</span>
                      </div>
                    </div>
                  </TabPanel>
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  {/*****************************************************************************/}
                  <TabPanel>
                    <div className="form">
                      <div>
                        <label className="bolder">
                          Vineyard
                          <span className="bolder" style={{ color: "#e60000" }}>
                            {" (*)"}
                          </span>
                        </label>
                        <input
                          style={{
                            border: this.state.errors["Vineyard_Bottle"]
                              ? border_error
                              : "",
                            textAlign: "center"
                          }}
                          type="text"
                          name="Vineyard_Bottle"
                          placeholder="Vineyard"
                          onChange={this.handleChange}
                          defaultValue={this.state.Vineyard_Bottle}
                        />
                        <span className="bolder" style={{ color: "#e60000" }}>
                          {this.state.errors["Vineyard_Bottle"]}
                        </span>
                        <div className="espaco_span" />
                        <label className="bolder">
                          Year
                          <span className="bolder" style={{ color: "#e60000" }}>
                            {" (*)"}
                          </span>
                        </label>
                        <input
                          style={{
                            border: this.state.errors["Year_Bottle"]
                              ? border_error
                              : "",
                            textAlign: "center"
                          }}
                          type="number"
                          name="Year_Bottle"
                          placeholder="Year"
                          onChange={this.handleChange}
                          defaultValue={this.state.Year_Bottle}
                          min="0"
                        />
                        <span className="bolder" style={{ color: "#e60000" }}>
                          {this.state.errors["Year_Bottle"]}
                        </span>
                        <div className="espaco_span" />
                      </div>
                      <label className="bolder">
                        Country of Origin
                        <span className="bolder" style={{ color: "#e60000" }}>
                          {" (*)"}
                        </span>
                      </label>
                      <input
                        style={{
                          border: this.state.errors["Country_Origin_Bottle"]
                            ? border_error
                            : "",
                          textAlign: "center"
                        }}
                        type="text"
                        name="Country_Origin_Bottle"
                        placeholder="Country of Origin"
                        onChange={this.handleChange}
                        defaultValue={this.state.Country_Origin_Bottle}
                      />
                      <span className="bolder" style={{ color: "#e60000" }}>
                        {this.state.errors["Country_Origin_Bottle"]}
                      </span>
                      <div className="espaco_span" />
                      <span className="bolder" style={{ color: "#e60000" }}>
                        {" (*)"}
                      </span>{" "}
                      <span className="bolder"> Mandatory Fields</span>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_Bottle;
