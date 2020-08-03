//ModalComponent.js
import React, { HtmlHTMLAttributes } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Label, Input, InputGroup } from "reactstrap";
import CoordinateDetails1 from '../coordinatesDetails/CoordinateDetails';
import DatePicker from "react-datepicker";
import { ProjectStore } from "../../common/Store/newProjectStore";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { PROJECT } from "../../common/constants/stores";

import "react-datepicker/dist/react-datepicker.css";
import './projDetails.scss';
import history from '../../history';

export interface IModalComponentProps {
    project?: ProjectStore;
}

@inject(PROJECT)
@observer
export default class ProjectDetail extends React.Component<IModalComponentProps>  {
    refNo: string;
    notes: string;
    client: string;
    constructor(props: IModalComponentProps) {
        super(props);
        this.projectName = '';
        this.nextEnabled = false;
        this.refNo = '';
        this.client = '';
        this.notes = '';
        this.prjctNameValid = false;
        this.errorMsg = "";
        this.startDate = new Date();
        this.handleDatenewChange = this.handleDatenewChange.bind(this);
        this.updateName = this.updateName.bind(this);
        this.saveProjectDetails = this.saveProjectDetails.bind(this);
    }

    @observable
    private isModalOpen: boolean = false;
    @observable
    private projectName: string = "";
    @observable
    private prjctNameValid: boolean = true;
    @observable
    private nextEnabled: boolean = false;
    @observable
    private errorMsg: string = 'This is error';
    @observable
    private startDate: Date = new Date();

    componentDidMount() {
        this.props.project?.fetchAllProjectName();
    }

    getAllProjectData() {
        this.props.project?.fetchAllProjectName();
    }
    handleDatenewChange(date: any) {
        this.startDate = date;
    }

    toggle = () => {
        this.isModalOpen = !this.isModalOpen;
    };
    nextClicked = () => {
        this.projectName = '';
        this.errorMsg = "";
        this.isModalOpen = !this.isModalOpen;
        //history.push('/coordinatedet', CoordinateDetail);
    }
    saveProjectDetails() {

        this.toggle();

        //console.log();
        let triangleCoords: any = [
            { lat: 37.42390182131783, lng: -122.0914977709329 },
            { lat: 37.42419403634421, lng: -122.0926995893311 },
            { lat: 37.42301710721216, lng: -122.0922532985281 }
        ];
        history.push('/map', triangleCoords);

    }
    updateTextAreaVal = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.notes = ev.target.value ?? "";
    }
    updateVal = (ev: React.ChangeEvent<HTMLInputElement>) => {
        // const re = /^[0-9\b]+$/;
        switch (ev.target.id) {
            case "projectName": {
                this.projectName = ev.target.value ?? "";
                break;
            }
            case "refNo": {
                this.refNo = ev.target.value ?? "";
                break;
            }
            case "client": {
                this.client = ev.target.value ?? "";
                break;
            }
        }
        const obj = {
            projectName: this.projectName,
            refNo: this.refNo,
            notes: this.notes,
            client: this.client,
            // isActive: true,
            startDate: new Date().toISOString(),
        };
        console.log(obj);
    }
    updateName = (ev: React.ChangeEvent<HTMLInputElement>) => {

        const allNames = this.props.project?.getState.projectDetailData ?? [];
        this.projectName = ev.target.value;
        let er = false;
        this.errorMsg = ""
        this.prjctNameValid = false;
        allNames.filter((pn) => {

            if (pn.projectName === this.projectName) {
                er = true;
                this.prjctNameValid = false;
                this.errorMsg = "Project name already present, Please use other name"
            }
        });

    }
    render() {

        return (
            <div className='mainDiv'>
                <div className='modalMain'>

                    <Button className='btn openPrjct' onClick={this.toggle}>

                        CREATE A PROJECT</Button>
                    <Modal isOpen={this.isModalOpen}>
                        <form >
                            <ModalHeader>

                                {!this.nextEnabled ?
                                    <div className='newprjct'> New Project </div>
                                    : <div className='newprjct'> Co-ordinates</div>
                                }


                                <button type="button" className="close" aria-label="Close" onClick={this.toggle}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </ModalHeader>
                            <ModalBody>

                                <div>
                                    {!this.nextEnabled ?
                                        <div className='mainModalDiv'>
                                            <div className='generalhead'>General</div>
                                            <div className="form-group row">
                                                <Label htmlFor='username' className="col-sm-2 col-form-label required">Name</Label>
                                                <div className="col-sm-6">

                                                    <Input type='text' id='projectName' name='projectName' className='form-field'
                                                        value={this.projectName} onChange={this.updateName} />
                                                    <span className="error">{this.errorMsg}</span>

                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Ref No.</Label>
                                                <div className="col-sm-6">
                                                    <Input type="text" id="refNo" value={this.refNo} onChange={this.updateVal} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Client</Label>
                                                <div className="col-sm-6">
                                                    <Input type="text" id="client" value={this.client} onChange={this.updateVal} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Notes</Label>
                                                <div className="col-sm-6">
                                                    <textarea className="form-control" onChange={this.updateTextAreaVal} value={this.notes} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Start Date</Label>
                                                <div className="col-sm-6">

                                                    <DatePicker
                                                        selected={this.startDate}
                                                        onChange={this.handleDatenewChange}
                                                        name="startDate"
                                                        className="form-control"
                                                    />
                                                    <div className="calen" >
                                                        <i className="fa fa-calendar"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Creator</Label>
                                                <div className="col-sm-6">
                                                    <Input type="text" value='Priyanka Saxena' readOnly={true} className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        : <div>
                                            <CoordinateDetails1></CoordinateDetails1>
                                        </div>
                                    }
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {!this.nextEnabled ?
                                    <Button type="button" value="Next" disabled={!this.projectName} onClick={() => { this.nextEnabled = true; }} className="btn nextBtn col-md-2" >NEXT</Button>
                                    : <Button type="button" value="Save" onClick={this.saveProjectDetails} className="btn nextBtn col-md-2">Save</Button>
                                }

                            </ModalFooter>
                        </form>
                    </Modal>
                </div>

            </div>
        );

    }
}