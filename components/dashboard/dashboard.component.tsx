import React from 'react';


import { Button } from 'reactstrap';

import ModalComponent from '../ProjectDetailsfirstModal/ModalComponent.component';
import './dashboard.style.scss';



class Dashboard extends React.Component {
   

  render(){
    return (
        <div>
            <ModalComponent></ModalComponent>
          
        </div>
    );
  }
}

export default Dashboard;