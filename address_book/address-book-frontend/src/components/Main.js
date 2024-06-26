import React, { useState, useEffect } from 'react';
import Header from './Header';
import AddEntryButton from './AddEntryButton';
import EntriesList from '../entries/EntriesList';
import CreateEntryModal from '../modals/CreateEntryModal';
import axios from 'axios';
import Search from '../components/Search';
import PaginationComponent from '../components/PaginationComponent';


const Main = () => {
    const [entries, setEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEntryId, setSelectedEntryId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get-entries/');
            setEntries(response.data);
        } catch (error) {
            console.error('There was an error fetching the entries!', error);
        }
    };

    const handleAddClick = () => {
        setSelectedEntryId(null);
        setShowModal(true);
    };

    const handleEdit = (id) => {
        setSelectedEntryId(id);
        setShowModal(true);
    };

    const handleSave = (entry) => {
        if (selectedEntryId) {
            setEntries(entries.map((e) => (e.id === selectedEntryId ? entry : e)));
        } else {
            setEntries([...entries, entry]);
        }
        setShowModal(false);
    };


    const filteredEntries = entries.filter(entry =>
        entry.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.phone_number.includes(searchTerm)
    );

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Header />
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AddEntryButton onClick={handleAddClick} />
            <EntriesList entries={currentEntries} setEntries={setEntries} onEdit={handleEdit} />
            <PaginationComponent
                totalEntries={filteredEntries.length}
                entriesPerPage={entriesPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <CreateEntryModal
                open={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                isEdit={!!selectedEntryId}
                currentEntryId={selectedEntryId}
            />
        </div>
    );
};

export default Main;