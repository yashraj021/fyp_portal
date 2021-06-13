import React from 'react';
import {BasicTable} from '../components/Table/table';
import './table-page.css'
import {getTests} from "../api/user";
import Loader from "react-loader-spinner";

export default class TablePage extends React.Component {

  state = {
    patientList: []
  }

  async componentDidMount() {
    const res = await getTests();
    if(res){
      this.setState({patientList:res.tests})
    }
  }

  render() {
    return (
      <div className="main-area">
            <span className="main-title">
                Patient List
            </span>
        {
          this.state.patientList.length===0 && (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={150}
              width={150}
              style={{paddingTop:'3rem'}}
            />
          )
        }
        {
          this.state.patientList.length!==0 && (
            <BasicTable data={this.state.patientList}/>
          )
        }
      </div>
    );
  }

}
