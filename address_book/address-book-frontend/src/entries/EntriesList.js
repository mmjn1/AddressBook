import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import { CSVLink } from 'react-csv';
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
    padding: theme.spacing(1.5),
    cursor: 'pointer'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const EntriesList = ({ entries, setEntries, onEdit }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedEntryId, setSelectedEntryId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEntries = React.useMemo(() => {
        let sortableEntries = [...entries];
        if (sortConfig.key !== null) {
            sortableEntries.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableEntries;
    }, [entries, sortConfig]);

    const csvHeaders = [
        { label: 'ID', key: 'id' },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Phone', key: 'phone_number' },
        { label: 'Email', key: 'email' },
    ];

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                <StyledTable>
                    <TableHead style={{ backgroundColor: '#F5763A' }}>
                        <TableRow>
                            <StyledTableCell style={{ color: '#fff' }} onClick={() => requestSort('id')}>
                                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }} onClick={() => requestSort('first_name')}>
                                First Name {sortConfig.key === 'first_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }} onClick={() => requestSort('last_name')}>
                                Last Name {sortConfig.key === 'last_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }} onClick={() => requestSort('phone_number')}>
                                Phone {sortConfig.key === 'phone_number' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }} onClick={() => requestSort('email')}>
                                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </StyledTableCell>
                            <StyledTableCell style={{ color: '#fff' }}>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedEntries.map(entry => (
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
                <CSVLink
                    data={sortedEntries}
                    headers={csvHeaders}
                    filename={`entries_${new Date().toISOString()}.csv`}
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <Button variant="contained" style={{ backgroundColor: '#F5763A', marginTop: '10px' }}>
                        Export to CSV
                    </Button>
                </CSVLink>
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
