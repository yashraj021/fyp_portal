import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, name, address, email, sex, phone, result) {
  return {id, name, address, email, sex, phone, result };
}



export const BasicTable = ({data}) => {

  const [rows, setRows] = useState([]);

  useEffect(
    () => {
      data.forEach(row => {
        const obj= createData(
          row.id,
          row.name,
          row.address.city,
          row.email,
          row.sex,
          row.phone,
          row.result
          );
        setRows(prev => [...prev, obj])
      })
    },
  [data])

  console.log(data)
  const classes = useStyles();

  return (
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
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.address}</TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.sex}</TableCell>
              <TableCell >{row.phone}</TableCell>
              <TableCell >{row.result}</TableCell>
              <TableCell >
                <Link to={{
                  pathname: `/users/${row.id}`,
                  data: row
                }}>
                  View
                </Link>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}