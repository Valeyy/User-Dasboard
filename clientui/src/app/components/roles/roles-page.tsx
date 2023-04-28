import { Button, Chip, Container, Menu, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

const roles: string[] = [
    "User",
    "Admin"
]

export default function RolesPage() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <div style={{
            display: 'flex',
            width: 'full',
            height: '90vh',
            justifyItems: 'center',
            alignItems: 'center'
        }}>
            <Container sx={{ my: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 3 }}>
                <Button variant='contained' color='primary'>
                    Create new
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align='right' sx={{ pr:5 }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow
                                    key={role}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {role}
                                    </TableCell>
                                    <TableCell align='right' sx={{ pr: 4 }}>
                                        <Button 
                                            variant='text' 
                                            color='info' 
                                            sx={{ color: 'black' }}
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon />
                                        </Button>
                                        <Menu
                                            open={open}
                                            anchorEl={anchorEl}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <DeleteIcon />
                                                Delete
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <CloseIcon />
                                                Close
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}