import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Files from 'react-files'
import Loader from "react-loader-spinner";
import './User-details.css';
import {getPrintableDate} from "../utils";
import {uploadXray} from "../api/user";


const classes = {
  table: {
    minWidth: '80vw',
  },
};

export class UserDetails extends React.Component {

  state = {
    filePreview: '',
    loading: false,
    data: null
  }


  componentDidMount() {
    // const {id} = useParams();
    const {data} = this.props.location;
    this.setState({data});
  }

  onFilesChange = async (files) => {
    this.setState({loading: true, filePreview: files[0]['preview']['url']})
    let formData = new FormData();
    formData.append("mediaContent", files[0]);
    const response = await uploadXray(this.state.data._id, formData);
    if (response && response.data) {
      const {data}= response;
      this.setState({data});
      alert(`Patient ${data.userId.name} has tested ${data.status}`);
    }
    this.setState({loading: false});
  }

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  };

  render() {
    const {data, filePreview, covRes, loading} = this.state;
    return (
      <div className="user-details__main">
        <div className="user-details__details">
          <div className="user-details__form">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    data && (
                      <TableRow>
                        <TableCell component="th" scope="row"
                                   style={{display: 'flex', 'alignItems': 'center'}}>
                          <img src={data.userId?.picture} height={35} width={35}
                               style={{borderRadius: '50%', marginRight: 8}}/>
                          {data.userId?.name}
                        </TableCell>
                        <TableCell>{data.userId?.address}</TableCell>
                        <TableCell>{data.userId?.email}</TableCell>
                        <TableCell>{getPrintableDate(data.updatedAt)}</TableCell>
                        <TableCell>{data.status}</TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {
            (filePreview || data?.imageUrl) && (
              <img src={data.imageUrl || filePreview} className="preview"/>
            )
          }
        </div>
        <div className="files">
          {
            loading && (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={150}
                width={150}
              />
            )
          }
          {
            !loading && (data?.status ==='REQUESTED') && (
              <Files
                className='files-dropzone'
                onChange={this.onFilesChange}
                onError={this.onFilesError}
                accepts={['image/*']}
                multiple
                maxFileSize={10000000}
                minFileSize={0}
                clickable
              >
                Drop X-Ray image here or click to upload
              </Files>
            )
          }
        </div>
      </div>
    );
  }
}
