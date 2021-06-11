import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import Files from 'react-files'
import Loader from "react-loader-spinner";
import './User-details.css';

export const UserDetails = props => {

    const [filePreview, setFilePreview] = useState('');
    const [covRes, setCovRes] = useState('');
    const [loading,setLoading] = useState(false);

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    const classes = useStyles();

    const { id } = useParams();
    const { data } = props.location;

    const onFilesChange = async (files) => {
        setFilePreview(files[0]['preview']['url']);
        let formData = new FormData();

        formData.append("mediaContent", files[0]);
        setLoading(true);
        const response = await fetch('http://localhost:3005/predict', {method: "POST", body: formData});
        const data = await response.json();
        const {result} = data;
        if(result.result==0){
            setCovRes("Positive");
        }else setCovRes("Negative");
        setLoading(false);
        console.log(result, covRes)
    }

    const onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    return (
        <div className="user-details__main">
            <div className="user-details__details">
                <div className="user-details__form">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell >Address</TableCell>
                                    <TableCell >E-mail</TableCell>
                                    <TableCell >Gender</TableCell>
                                    <TableCell >Phone</TableCell>
                                    <TableCell >Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {data.name}
                                    </TableCell>
                                    <TableCell >{data.address}</TableCell>
                                    <TableCell >{data.email}</TableCell>
                                    <TableCell >{data.sex}</TableCell>
                                    <TableCell >{data.phone}</TableCell>
                                    <TableCell >{covRes ||  data.result}</TableCell>
                                    <TableCell >
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <img src={filePreview} className="preview"/>
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
                !loading && (
                    <Files
                    className='files-dropzone'
                    onChange={onFilesChange}
                    onError={onFilesError}
                    accepts={['image/*']}
                    multiple
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    Drop files here or click to upload
                </Files>
                )
            }

            </div>
        </div>
    );
}
