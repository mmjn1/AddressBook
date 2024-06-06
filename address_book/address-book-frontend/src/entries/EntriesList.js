import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@mui/material';
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
    const [deleteMode, setDeleteMode] = useState('single'); // 'single' or 'multiple'
    const [selectedEntryId, setSelectedEntryId] = useState(null);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleDeleteClick = (id) => {
        setSelectedEntryId(id);
        setDeleteMode('single');
        setOpenDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteMode === 'single') {
            axios.delete(`http://localhost:8000/api/delete-entry/${selectedEntryId}/`)
                .then(response => {
                    setEntries(entries.filter(entry => entry.id !== selectedEntryId));
                    setOpenDeleteModal(false);
                    setSelectedEntryId(null);
                })
                .catch(error => {
                    console.error('There was an error deleting the entry!', error);
                });
        } else if (deleteMode === 'multiple') {
            selectedEntries.forEach((id) => {
                axios.delete(`http://localhost:8000/api/delete-entry/${id}/`)
                    .then(() => {
                        setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
                    })
                    .catch((error) => {
                        console.error(`There was an error deleting entry with id ${id}!`, error);
                    });
            });
            setSelectedEntries([]);
            setOpenDeleteModal(false);
        }
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

    const handleSelectEntry = (id) => {
        setSelectedEntries((prevSelectedEntries) =>
            prevSelectedEntries.includes(id)
                ? prevSelectedEntries.filter((entryId) => entryId !== id)
                : [...prevSelectedEntries, id]
        );
    };

    const handleDeleteSelected = () => {
        setDeleteMode('multiple');
        setOpenDeleteModal(true);
    };

    const csvHeaders = [
        { label: 'ID', key: 'id' },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Phone', key: 'phone_number' },
        { label: 'Email', key: 'email' },
    ];

    const selectedEntriesData = sortedEntries.filter((entry) => selectedEntries.includes(entry.id));

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                <StyledTable>
                    <TableHead style={{ backgroundColor: '#F5763A' }}>
                        <TableRow>
                            <StyledTableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selectedEntries.length > 0 && selectedEntries.length < entries.length}
                                    checked={entries.length > 0 && selectedEntries.length === entries.length}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSelectedEntries(entries.map((entry) => entry.id));
                                        } else {
                                            setSelectedEntries([]);
                                        }
                                    }}
                                />
                            </StyledTableCell>
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
                            <StyledTableRow key={entry.id} selected={selectedEntries.includes(entry.id)}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={selectedEntries.includes(entry.id)}
                                        onChange={() => handleSelectEntry(entry.id)}
                                    />
                                </TableCell>
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
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '10px' }}
                    onClick={handleDeleteSelected}
                    disabled={selectedEntries.length === 0}
                >
                    Delete Selected
                </Button>
                <CSVLink
                    data={selectedEntriesData}
                    headers={csvHeaders}
                    filename={`selected_entries_${new Date().toISOString()}.csv`}
                    style={{ textDecoration: 'none', color: '#fff' }}
                >
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#F5763A', marginTop: '10px', marginLeft: '10px' }}
                        disabled={selectedEntries.length === 0}
                    >
                        Export Selected to CSV
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
