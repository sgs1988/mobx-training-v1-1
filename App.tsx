import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { observer, Provider } from "mobx-react";
import CommonHeader from './components/headercontainer/Header.component';
import ModalComponent from './components/projectDetails/projDetails';
import { ProjectDetailState } from './common/model/ProjectDetailsState';
import { ProjectStore } from './common/Store/newProjectStore';
import { createStores } from './common/Store/CreateStore';
import './custom.css'


const rootStore = createStores(
   new ProjectDetailState()
);

@observer

class App extends Component {
    public render() {
        return (
            
            <Provider {...rootStore}>
                <div>
                    
                    <Router>

                        <Route exact component={CommonHeader} />
                       
                            <div id="content">
                                <Switch>

                                    <Route path="/" exact component={ModalComponent} />
                                   
                                </Switch>
                           
                       </div>
                    </Router>
                </div>
            </Provider>
        );
    }
}
export default App;
