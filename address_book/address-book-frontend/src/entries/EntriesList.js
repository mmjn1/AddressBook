// src/components/entries/EntriesList.js
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import axios from 'axios';

const StyledTable = styled(Table)(({ theme }) => ({
    minWidth: 650,
    maxWidth: 1000,
    margin: '0 auto'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#333',
    padding: theme.spacing(1.5)
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const EntriesList = ({ entries, setEntries, onEdit }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedEntryId, setSelectedEntryId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedEntryId(id);
        setOpenDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        axios.delete(`http://localhost:8000/api/delete-entry/${selectedEntryId}/`)
            .then(response => {
                setEntries(entries.filter(entry => entry.id !== selectedEntryId));
                setOpenDeleteModal(false);
                setSelectedEntryId(null);
            })
            .catch(error => {
                console.error('There was an error deleting the entry!', error);
            });
    };

    const handleDeleteCancel = () => {
        setOpenDeleteModal(false);
        setSelectedEntryId(null);
    };

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                <StyledTable>
                    <TableHead style={{ backgroundColor: '#F5763A' }}>
                        <TableRow>
                            <StyledTableCell style={{ color: '#fff' }}>ID</StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }}>First Name</StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }}>Last Name</StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }}>Phone</StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }}>Email</StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }}>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map(entry => (
                            <StyledTableRow key={entry.id}>
                                <TableCell>{entry.id}</TableCell>
                                <TableCell>{entry.first_name}</TableCell>
                                <TableCell>{entry.last_name}</TableCell>
                                <TableCell>+{entry.phone_number}</TableCell>
                                <TableCell>{entry.email}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => onEdit(entry.id)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary"
                                        onClick={() => handleDeleteClick(entry.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            <DeleteConfirmationModal 
                open={openDeleteModal}
                handleClose={handleDeleteCancel}
                handleConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default EntriesList;
