import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DeleteConfirmationModal = ({ open, handleClose, handleConfirm }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Entry</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this entry?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;