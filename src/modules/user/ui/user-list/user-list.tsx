import React, {useState} from 'react';
import {useUsers} from '../../api/user-api';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

export const UserList: React.FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const {data, error, isLoading} = useUsers({limit, skip: (page - 1) * limit});

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Typography color="error">Failed to load users. Please try again.</Typography>;
    }

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeLimit = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Birth Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{new Date(user.birthDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {data && (
                <TablePagination
                    component="div"
                    count={Math.ceil(data.total / limit)}
                    onPageChange={handleChangePage}
                    rowsPerPage={limit}
                    onRowsPerPageChange={handleChangeLimit}
                    page={page}
                />
            )}
        </div>
    );
};

