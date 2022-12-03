/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
// import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', width: 130 },
  { field: 'createdAt', headerName: 'Created at', width: 130 },
  { field: 'updatedAt', headerName: 'Updated at', width: 130 },

];



const rows = [
  { id: 1, name: 'Snow', createdAt: 'Jon', updatedAt: 35 },
  { id: 2, name: 'Lannister', createdAt: 'Cersei', updatedAt: 42 },
  { id: 3, name: 'Lannister', createdAt: 'Jaime', updatedAt: 45 },
  { id: 4, name: 'Stark', createdAt: 'Arya', updatedAt: 16 },
  { id: 5, name: 'Targaryen', createdAt: 'Daenerys', updatedAt: null },
  { id: 6, name: 'Melisandre', createdAt: null, updatedAt: 150 },
  { id: 7, name: 'Clifford', createdAt: 'Ferrara', updatedAt: 44 },
  { id: 8, name: 'Frances', createdAt: 'Rossini', updatedAt: 36 },
  { id: 9, name: 'Roxie', createdAt: 'Harvey', updatedAt: 65 },
];

// eslint-disable-next-line no-unused-vars
export default function PresentationList({ data }) {
  const navigate = useNavigate();

  const handleEvent = (
    params
  ) => {
    const url = `presentation/${params._id}`;
    navigate(url)
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection,
        onRowClick={handleEvent}
      />
    </div>
  );
}

PresentationList.propTypes = {
  data: PropTypes.array,
};

PresentationList.defaultProps = {
  data: [],
}