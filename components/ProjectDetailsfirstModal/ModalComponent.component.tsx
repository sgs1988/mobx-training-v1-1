//ModalComponent.js
import React, { HtmlHTMLAttributes } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Label, Input, InputGroup } from "reactstrap";
import DatePicker from "react-datepicker";
import { ProjectStore } from "../../common/Store/newProjectStore";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { PROJECT } from "../../common/constants/stores";
import "react-datepicker/dist/react-datepicker.css";
import './modal.style.scss';

export interface IModalComponentProps {
    project?: ProjectStore;    
}

@inject(PROJECT)
@observer
export default class ModalComponent extends React.Component<IModalComponentProps>  {
    constructor(props: IModalComponentProps) {
        super(props);        
        this.projectName = '';
        this.nextEnabled = false;
        this.geoLoc = '';
        this.hemis = false;
        this.changecordinate = true;
        this.inputs = [];
        this.inputsHemi = [];
        this.prjctNameValid = false;
        this.errorMsg = "";
        this.startDate = new Date();
        this.handleDatenewChange = this.handleDatenewChange.bind(this); 
        this.updateName = this.updateName.bind(this);
        this.handleChangeGeo = this.handleChangeGeo.bind(this);
        this.addPointHemis = this.addPointHemis.bind(this);
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
    private geoLoc: string = "";
    @observable
    private changecordinate: boolean = true;
    
    @observable
    private inputs: Array<string>;
    @observable
    private hemis: boolean = false;
    @observable
    private inputsHemi: any[];
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

    saveProjectDetails(){
        this.toggle();
        this.nextEnabled = false;
        this.projectName = '';
        this.errorMsg = "";
    }
    deleteRow(index: number) {
      
        this.inputs.splice(index,1); 
    }
     
    addGeoInput() {

        var newInput = `input-${this.inputs.length}`;
        this.inputs.push(newInput);
    }
    addPointHemis() {
       
        var newHemiInput = `input-${this.inputsHemi.length}`;
        this.inputsHemi.push([newHemiInput]);
    }
   deleteHemiRow(index: number) {

      this.inputsHemi.splice(index,1); 
    }
    handleChangeGeo(event: React.ChangeEvent<HTMLInputElement>) {

        this.geoLoc = event.target.value
      
        if (event.currentTarget.value === 'UTM') {
            this.hemis = true
            this.changecordinate = false
        }
        else {
            this.hemis = false
            this.changecordinate = true;
        }

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
                                {!this.nextEnabled ?
                                    <div>
                                        <div className='mainModalDiv'>
                                            <div className='generalhead'>General</div>
                                            <div className="form-group row">
                                                <Label htmlFor='username' className="col-sm-2 col-form-label required">Name</Label>
                                                <div className="col-sm-6">

                                                    <Input type='text' id='projectName' name='projectName' className='form-field'
                                                        value={this.projectName} onChange={this.updateName} />
                                                    <span className = "error">{this.errorMsg}</span>

                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Ref No.</Label>
                                                <div className="col-sm-6">
                                                    <Input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Client</Label>
                                                <div className="col-sm-6">
                                                    <Input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <Label className="col-sm-2 col-form-label">Notes</Label>
                                                <div className="col-sm-6">
                                                    <textarea className="form-control" />
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
                                    </div> : <div>
                                        <div className='mainModalDiv'>
                                            <div className='cordinate'>Co-ordinate system</div>
                                            <div className="form-group row typeDiv">
                                                <label className="col-sm-2 col-form-label">Type</label>
                                                <div className="col-sm-6">
                                                   
                                                    <Input
                                                        type="select"
                                                        name="country"
                                                        id="country"
                                                        value={this.geoLoc}
                                                        className="geoLocation"
                                                        onChange={this.handleChangeGeo}
                                                    >
                                                        <option value="Geographical">Geographical</option>
                                                        <option value="UTM">UTM</option>
                                                        
                                                    </Input>
                                                </div>
                                            </div>
                                            <div className='cordinate'>Co-ordinates of the site</div>
                                            {this.changecordinate ?
                                                <div className='changecordinateMainDiv'>
                                                    <div className="form-group row pointOne">
                                                        <Label className="col-sm-2 col-form-label"></Label>
                                                        <div className="col-sm-3">
                                                            <Label className="col-form-label">Latitude</Label>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <Label className="col-form-label">Longitude</Label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label">Point 1</Label>
                                                        <div className="col-sm-3">
                                                            <InputGroup>
                                                                <Input type="text" id="pointIn" className="form-control" />
                                                                
                                                            </InputGroup>
                                                            <span className="north">&deg;N</span>

                                                        </div>
                                                        <div className="col-sm-3">
                                                            <Input type="text" className="form-control" />
                                                            <span className="north">E&deg;</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label">Point 2</Label>
                                                        <div className="col-sm-3">
                                                            <Input type="text" className="form-control" />
                                                            <span className="north">&deg;N</span>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <Input type="text" className="form-control" />
                                                            <span className="north">E&deg;</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label">Point 3</Label>
                                                        <div className="col-sm-3">
                                                            <Input type="text" className="form-control" />
                                                            <span className="north">&deg;N</span>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <Input type="text" className="form-control" />
                                                            <span className="north">E&deg;</span>
                                                        </div>
                                                    </div>
                                                    {this.inputs.map((row, i) =>
                                                        <div className="form-group row addpointDiv" key={i}>
                                                            <Label className="col-sm-2 col-form-label">Point {i + 4}</Label>
                                                            <div className="col-sm-3">
                                                                <Input type="text" className="form-control" />
                                                                <span className="north">&deg;N</span>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <Input type="text" className="form-control" />
                                                                <span className="north">E&deg;</span>
                                                            </div>
                                                            <Button type="button" className="btn btn-default deleteBtn" onClick={() => this.deleteRow(i)} >
                                                                <i className="fa fa-trash deleteIcon" aria-hidden="true"></i>
                                                            </Button>
                                                        </div>
                                                    )}
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label"></Label>
                                                        <div className="col-sm-3">
                                                            <Input type="button" value="Add Point" className="btn addPointBtn" onClick={() => this.addGeoInput()} />

                                                        </div>

                                                    </div>
                                                </div>
                                                : ''
                                            }
                                            {this.hemis
                                                ? <div className='hemisphereDiv pointOne'>
                                                    <div className="form-group row hemisDiv">
                                                        <label className="col-sm-2 col-form-label">Hemisphere</label>
                                                        <div className="col-sm-7">
                                                          
                                                            <Input
                                                                type="select"
                                                                name="country"
                                                                id="country"
                                                            >
                                                                <option value="north">Northen(N)</option>
                                                                <option value="south">Southern(S)</option>
                                                            </Input>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label">Point 1</Label>
                                                        <div className="col-sm-2">
                                                            <Input type="text" className="form-control" />
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <Input type="text" className="form-control " />
                                                            <span className="hemipoint">m E</span>
                                                        </div>
                                                        <div className="col-sm-2 secondIn">
                                                            <Input type="text" className="form-control" />
                                                            <span className="hemipoint">m N</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label">Point 2</Label>
                                                        <div className="col-sm-2">
                                                            <Input type="text" className="form-control" />
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <Input type="text" className="form-control" />
                                                            <span className="hemipoint">m E</span>
                                                        </div>
                                                        <div className="col-sm-2 secondIn">
                                                            <Input type="text" className="form-control" />
                                                            <span className="hemipoint">m N</span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label">Point 3</Label>
                                                        <div className="col-sm-2">
                                                            <Input type="text" className="form-control" />
                                                        </div>
                                                        <div className="col-sm-2 ">
                                                            <Input type="text" className="form-control" />
                                                            <span className="hemipoint">m E</span>
                                                        </div>
                                                        <div className="col-sm-2 secondIn">
                                                            <Input type="text" className="form-control" />
                                                            <span className="hemipoint">m N</span>
                                                        </div>
                                                    </div>

                                                    {this.inputsHemi.map((row, i) =>
                                                        <div className="form-group row" key={i}>
                                                            <Label className="col-sm-2 col-form-label">Point {i + 4}</Label>
                                                            <div className="col-sm-2">
                                                                <Input type="text" className="form-control" />
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <Input type="text" className="form-control" />
                                                                <span className="hemipoint">m E</span>
                                                            </div>
                                                            <div className="col-sm-2 secondIn">
                                                                <Input type="text" className="form-control " />
                                                                <span className="hemipoint">m N</span>
                                                            </div>
                                                            <Button type="button" className="btn btn-default deleteHemisBtn" onClick={() => this.deleteHemiRow(i)} >
                                                                <i className="fa fa-trash deleteHemisBtnIcon" aria-hidden="true"></i>
                                                            </Button>
                                                        </div>
                                                    )}
                                                    <div className="form-group row">
                                                        <Label className="col-sm-2 col-form-label"></Label>
                                                        <div className="col-sm-3">
                                                            <Input type="button" value="Add Point" className="btn addPointBtn" onClick={() => this.addPointHemis()} />

                                                        </div>

                                                    </div>
                                                </div>
                                                : null
                                            }
                                        </div>

                                    </div>}

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