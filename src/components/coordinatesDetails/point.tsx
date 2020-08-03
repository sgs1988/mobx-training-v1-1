import React, { useState } from "react";
import { Button } from "reactstrap";
import { Label, Input } from "reactstrap";
interface ICoordinate {
  lat: string;
  long: string;
}


const CoordinatePoint = () => {
  const initialCoordinates: ICoordinate[] = [
    { lat: "", long: "" },
    { lat: "", long: "" },
    { lat: "", long: "" },
  ];
  const [coordinates, setCoordinates] = useState(initialCoordinates);

  const addCoordinates = () => {
    setCoordinates([...coordinates, { lat: "", long: "" }]);
  };

  const deleteCoordinate = (index: number) => {
    // let newCoordinates = [...coordinates];
    let newCoordinates = coordinates.filter(
      (item, arrayIndex) => index != arrayIndex
    );
    setCoordinates(newCoordinates);
  };

  const handleChange = (value: string, index: number, type: string) => {
    let newCoordinates = coordinates.slice();
    let newCoordinate = newCoordinates[index];
    type === "lat" ? (newCoordinate.lat = value) : (newCoordinate.long = value);
    setCoordinates(newCoordinates);
  };

  const getCoordinates = () => {
      console.log(coordinates);
  }

  return (
    <div className="container">
      <div className="row">
        {coordinates.map((item, index) => {
          return (
            <div key={index} className="input-group row mt-3">
                 <Label className="col-sm-2 col-form-label">Point {index + 1}</Label>
              <Input
                type="text"
                className="form-control col-3 mr-3"
                onChange={(e) => handleChange(e.target.value, index, "lat")}
                value={item.lat}
              />
              <Input
                type="text"
                className="form-control col-3"
                onChange={(e) => handleChange(e.target.value, index, "long")}
                value={item.long}
              />

              {index > 2 ? (
               
                 <Button type="button" className="btn btn-default deleteBtn"   onClick={() => {
                    deleteCoordinate(index);
                  }} >
                 <i className="fa fa-trash deleteIcon" aria-hidden="true"></i>
             </Button>
              ) : null}
            </div>
            
          );
        })}
        <div className="form-group row">
            <Label className="col-sm-3 col-form-label"></Label>
            <div className="col-sm-5">
                <Input type="button" value="Add Point" className="btn addPointBtn" onClick={() => addCoordinates()} />

            </div>
            <Button className="m-5" variant="primary" onClick={getCoordinates}>
         showValues
         </Button>

        </div>
       
      
      </div>
    </div>
  );
};

export default CoordinatePoint;
