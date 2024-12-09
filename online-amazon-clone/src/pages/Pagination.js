import React from "react";
import { Pagination as MUI_Pagination, Stack } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginTop: 3 }}>
            <MUI_Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                color="primary"
                size="large"
                shape="rounded"
            />
        </Stack>
    );
};

export default Pagination;
