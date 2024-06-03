import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const StyledPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        color: '#F5763A',
    },
}));

const PaginationComponent = ({ totalEntries, entriesPerPage, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(totalEntries / entriesPerPage);

    return (
        <StyledPagination
            count={pageCount}
            page={currentPage}
            onChange={(event, value) => onPageChange(value)}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    components={{ previous: ArrowBack, next: ArrowForward }}
                />
            )}
            showFirstButton
            showLastButton
        />
    );
};

export default PaginationComponent;
