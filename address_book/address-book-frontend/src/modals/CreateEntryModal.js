import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    FormLabel
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CreateEntryModal = ({ open, handleClose, handleSave, isEdit, currentEntryId }) => {
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phone: Yup.string().required('Phone number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const transformedValues = {
                first_name: values.firstName,
                last_name: values.lastName,
                phone_number: values.phone,
                email: values.email,
            };

            try {
                if (isEdit) {
                    const response = await axios.patch(`http://localhost:8000/api/update-entry/${currentEntryId}/`, transformedValues);
                    handleSave(response.data);
                } else {
                    const response = await axios.post('http://localhost:8000/api/create-entry/', transformedValues);
                    handleSave(response.data);
                }
                formik.resetForm();
                handleClose();
            } catch (error) {
                console.error('There was an error saving the entry!', error);
            }
        },
    });

    useEffect(() => {
        const fetchEntry = async () => {
            if (isEdit && currentEntryId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/fetch-entry/${currentEntryId}/`);
                    const entry = response.data;
                    formik.setValues({
                        firstName: entry.first_name,
                        lastName: entry.last_name,
                        phone: entry.phone_number,
                        email: entry.email
                    });
                } catch (error) {
                    console.error('There was an error fetching the entry data!', error);
                }
            } else {
                formik.resetForm();
            }
        };

        fetchEntry();
    }, [isEdit, currentEntryId]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle style={{ backgroundColor: '#F5763A', color: '#fff', textAlign: 'center' }}>
                {isEdit ? 'Edit Address' : 'Add Address'}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <FormLabel style={{ fontWeight: 'bold' }}>Email</FormLabel>
                        <TextField
                            margin="normal"
                            type="email"
                            fullWidth
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel style={{ fontWeight: 'bold' }}>First Name</FormLabel>
                        <TextField
                            autoFocus
                            margin="normal"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel style={{ fontWeight: 'bold' }}>Last Name</FormLabel>
                        <TextField
                            margin="normal"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel style={{ fontWeight: 'bold' }}>Phone</FormLabel>
                        <PhoneInput
                            country={'gb'}
                            value={formik.values.phone}
                            onChange={(value) => formik.setFieldValue('phone', value)}
                            inputStyle={{ width: '100%' }}
                            onBlur={() => formik.setFieldTouched('phone', true)}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div style={{ color: 'red', marginTop: '8px' }}>{formik.errors.phone}</div>
                        )}
                    </FormControl>
                </DialogContent>
                <DialogActions style={{ padding: '16px' }}>
                    <Button onClick={handleClose} style={{ color: '#F5763A' }}>
                        Cancel
                    </Button>
                    <Button type="submit" style={{ backgroundColor: '#F5763A', color: '#fff' }}>
                        {isEdit ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateEntryModal;
