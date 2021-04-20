import React from 'react';
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
import './User-details.css';

export const UserDetails = props => {

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    const classes = useStyles();

    const { id } = useParams();
    const { data } = props.location;

    const onFilesChange = (files) => {
        console.log(files)
    }

    const onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    console.log(props.location.data)



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
                                    <TableCell >{data.result}</TableCell>
                                    <TableCell >
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className="files">
                <Files
                    className='files-dropzone'
                    onChange={onFilesChange}
                    onError={onFilesError}
                    accepts={['image/png', '.pdf', 'audio/*']}
                    multiple
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    Drop files here or click to upload
                </Files>
            </div>
        </div>
    );
}