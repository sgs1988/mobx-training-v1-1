import React, { HtmlHTMLAttributes } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Label, Input, InputGroup } from "reactstrap";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { ProjectStore } from "../../common/Store/newProjectStore";
import { PROJECT } from "../../common/constants/stores";

export interface IHemisCOordinateProps {
    project?: ProjectStore;
}

@inject(PROJECT)
@observer
export default class HemisCoordinateDetail extends React.Component<IHemisCOordinateProps> {
    constructor(props:IHemisCOordinateProps) {
        super(props);
        this.inputsHemi = [];
        this.addPointHemis = this.addPointHemis.bind(this);
        
    }
    @observable
    private inputsHemi: any[];

    
    addPointHemis() {

        var newHemiInput = `input-${this.inputsHemi.length}`;
        this.inputsHemi.push([newHemiInput]);
    }
    deleteHemiRow(index: number) {

        this.inputsHemi.splice(index, 1);
    }
    render() {

        return (
        <div>
            <div className='hemisphereDiv pointOne'>
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
        </div>
            );
    }
}