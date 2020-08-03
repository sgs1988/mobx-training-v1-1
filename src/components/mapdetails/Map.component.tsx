import React, { Component, createRef } from 'react';
import { observable } from "mobx";
import { observer } from "mobx-react";
import SiteComponent from "./Site.component";

const GOOGLE_MAP_API_KEY = 'AIzaSyDjVdfFI2EG9sYyqTkWxu2X1FjXUgQgrkw';




@observer
export default class MapComponent extends Component {


    constructor(props: any) {
        super(props);
        this.state = {
            center: {
                lat: 30.42419403634421,
                lng: 90.0926995893311
            },
            zoom: 15
        };

        this.setSelection = this.setSelection.bind(this);
    }
    // styles


    @observable
    private googleMapRef: any = React.createRef();
    @observable
    private googleMap: any = createRef;
    // @observable
    // private marker:any = createRef;
    public state: any = {};
    public map: any = {};
    public drawingManager: any = {};

    @observable
    private siteMapEnable: boolean = false;
    private selectedShape: any;
    private curseldiv: any;
    private selectedColor: any


    clearSelection() {

        if (this.selectedShape) {
            if (typeof this.selectedShape.setEditable == 'function') {
                this.selectedShape.setEditable(false);
                this.selectColor(this.selectedShape.set('fillColor', 'rgba(255, 255, 255, 0.5)'));
                //this.selectColor("blue");
                //this.selectedShape.fillColor = '#009999';
                // this.selectedShape.
            }
            this.selectedShape = null;
        }
        //this.curseldiv.innerHTML = "<b>cursel</b>:";
    }

    setSelection = (shape: any, isNotMarker: any) => {


        this.clearSelection();
        this.selectedShape = shape;
        if (isNotMarker)
            shape.setEditable(true);
        //this.selectColor("rgba(255, 255, 255, 0.5)");
        console.log(shape.get('fillColor'))
        this.selectColor(shape.get('fillColor'));
        shape.set('fillColor', '#009999');

        this.updateCurSelText(shape);

    }


    updateCurSelText(shape: any) {
    }

    selectColor = (color: any) => {

        this.selectedColor = color;
        let polygonOptions = this.drawingManager.get('polygonOptions');
        polygonOptions.strokeColor = this.selectedColor;
        polygonOptions.fillColor = '#009999';
        this.drawingManager.set('polygonOptions', polygonOptions);
    }


    // helper functions
    createGoogleMap(triangleCoords: any) {


        this.drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingMode: window.google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            },
            markerOptions: {

                draggable: true,
                editable: true,

            },
            polygonOptions: {
                fillColor: 'rgba(255, 255, 255, 0.5)',
                strokeWeight: 1,
                editable: true,
                zIndex: 1,
                strokeColor: '#009999',
                strokeOpacity: 0.8,
                fillOpacity: 0.35,

            }
        });



        if (triangleCoords.length > 0) {
            this.setState({ center: triangleCoords[0] });
        }
        this.map = new window.google.maps.Map(this.googleMapRef.current, {
            zoom: this.state.zoom,
            center: this.state.center,
            // mapTypeId: "terrain"
        });

        // Construct the polygon.
        const bermudaTriangle = new window.google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: "#009999",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "rgba(255, 255, 255, 0.5)",
            fillOpacity: 0.35,
            editable: false
        });
        bermudaTriangle.setMap(this.map);

        window.google.maps.event.addListener(bermudaTriangle, 'click', () => {
            this.setSelection(bermudaTriangle, bermudaTriangle);

        });
        this.drawingManager.setMap(this.map);



        this.curseldiv = document.getElementById('cursel');
        window.google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (e) => {

            //~ if (e.type != google.maps.drawing.OverlayType.MARKER) {
            var isNotMarker = (e.type != window.google.maps.drawing.OverlayType.MARKER);
            // Switch back to non-drawing mode after drawing a shape.
            this.drawingManager.setDrawingMode(null);

            var newShape = e.overlay;
            newShape.type = e.type;
            window.google.maps.event.addListener(newShape, 'click', () => {
                this.setSelection(newShape, isNotMarker);

            });



        })


        const centerControlDiv = document.createElement("div");
        this.CenterControl(centerControlDiv, this.map); // @ts-ignore TODO(jpoehnelt)

        centerControlDiv.index = 1;
        this.map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
            centerControlDiv
        );
    }



    CenterControl(centerControlDiv: HTMLDivElement, map: any) {
        // Set CSS for the control border.
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.border = "2px solid #fff";
        controlUI.style.borderRadius = "3px";
        controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.textAlign = "center";
        controlUI.title = "Click to View Sidebar";
        centerControlDiv.appendChild(controlUI); // Set CSS for the control interior.

        const controlText = document.createElement("div");
        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.fontSize = "16px";
        controlText.style.lineHeight = "38px";
        controlText.style.paddingLeft = "5px";
        controlText.style.paddingRight = "5px";
        controlText.innerHTML = "Sidebar";
        controlUI.appendChild(controlText); // Setup the click event listeners: simply set the map to Chicago.

        controlUI.addEventListener("click", () => {


            this.siteMapEnable = !this.siteMapEnable;


        });
    }






    componentDidMount() {
        const match: any = this.props;
        console.log(match.location.state, '...');
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=drawing`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener('load', () => {
            let triangleCoords: any = match.location.state;
            this.googleMap.current = this.createGoogleMap(triangleCoords);
        })
    }



    render() {

        let mapStyles: any = {
            width: '100%',
            height: '550px',
            float: 'left',
        };

        if (!this.siteMapEnable) {
            mapStyles.width = '100%';
        } else {
            mapStyles.width = '80%';
        }



        return (

            <div>
                <div className=" clearfix sidebarStyle "> {this.siteMapEnable ? <SiteComponent /> : null}</div>
                <div
                    id="google-map"
                    ref={this.googleMapRef}
                    style={mapStyles}
                />

            </div >
        );
    }

}