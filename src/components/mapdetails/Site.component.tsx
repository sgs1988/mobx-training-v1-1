import React, { Component, useState } from 'react';
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Collapse, Button, CardBody, Card, ListGroup, ListGroupItem, Tooltip } from 'reactstrap';
import './site.scss'
import CoordinateDetails1 from './../coordinatesDetails/CoordinateDetails'

@observer
export default class SiteComponent extends Component {

    constructor(props: any) {
        super(props);
        //const [isOpen, setIsOpen] = useState(false);
        //const [tooltipOpen, setTooltipOpen] = useState(false);
        this.state = {
            siteName: [{
                id: 1,
                name: "Site no. 1",
                active: true
            }],

            count: 1
        }

        this.handleAddSite = this.handleAddSite.bind(this);
        this.openModel = this.openModel.bind(this);

    }
    @observable
    private tooltipOpen: boolean = false;
    private setTooltipOpen: any;


    state: any = {};

    toggle: any = () => {
        console.log("work")
        this.tooltipOpen = !this.tooltipOpen
    }

    openModel: any = (item: any, index: number) => {
        this.state.siteName.map((site: any, index: number) => {
            site.active = false;
        });
        this.state.siteName[index].active = true;
        this.setState({ siteName: this.state.siteName });

        //call

    }


    handleAddSite: any = () => {

        this.state.count += 1;
        this.state.siteName.map((site: any, index: number) => {
            site.active = false;
        });
        this.state.siteName.push({
            id: this.state.count,
            name: "Site no. " + this.state.count,
            active: true
        });
        this.setState({ siteName: this.state.siteName });
        console.log("add site", this.state.siteName)
    }







    render() {
        const tooltipStyle: any = {
            placement: "top",
            text: "Top"
        }
        return (
            <div className=" clearfix sidebarInnerContainer">
                <br></br>
                <h6>Identify Site(s)</h6>
                <hr></hr>
                <ListGroup className="fontSmall">
                    {


                        this.state.siteName.map((item: any, index: number) => {
                            return <ListGroupItem active={item.active} tag="button" action key={index} onClick={() => this.openModel(item, index)}><span className="listGroupTxt" >{item.name}</span><span>:</span> </ListGroupItem>

                        })
                    }






                    {/* < ListGroupItem tag="button" action><span className="listGroupTxt">Site no. 2</span><span>:</span></ListGroupItem>
                    <ListGroupItem tag="button" action><span className="listGroupTxt">Site no. 3</span><span>:</span></ListGroupItem> */}
                </ListGroup>
                <span>
                    <button className="fontSmall" id="addSitebtn" onClick={this.handleAddSite}>Add Site</button>
                </span>
                <br></br>
                <br></br>
                <p className="fontXSmall">You can identify as many sites as you need by drawing polygon, adding coordinates, and uploading file from your computer</p>
                <span>
                    <button className="fontSmall" id="polygonBtn" >P</button >
                    <Tooltip placement={tooltipStyle.placement}
                        isOpen={this.tooltipOpen}
                        target={"polygonBtn"}
                        toggle={this.toggle}>
                        Use icon available on the map
                     </Tooltip>
                </span>
                <span>&nbsp;</span>
                <span>
                    <button className="fontSmall">Add coordinates</button>
                </span> <span>
                    <button className="fontSmall">Upload file</button>
                </span>

                <div className="fixed-bottom sidebarStyle backgroundWhite text-center" >
                    <div><span><button>Save Projects</button></span></div>

                </div>

                <CoordinateDetails1 />

            </div >
        )
    }

}