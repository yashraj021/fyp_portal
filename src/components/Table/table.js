import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

export const BasicTable = ({data}) => {
  const classes = useStyles();
  const getPrintableDate = (dateString) => {
    const primitive = Date(dateString);
    const date = new Date(primitive);
    return date.toLocaleString();
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">{row.userId?.name}</TableCell>
              <TableCell>{row.userId?.address}</TableCell>
              <TableCell>{row.userId?.email}</TableCell>
              <TableCell>{getPrintableDate(row.updatedAt)}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
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
