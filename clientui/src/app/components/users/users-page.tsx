import { Box, Button, Chip, Container, Grid, Icon, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Navbar from "../global/navbar";
import User from "../../../api/interfaces/User";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserRolesModal from "./modals/user-roles-modal";
import NewModal from "./modals/new-modal";

const users: User[] = [
    { email: 'valey1@example.com', signedUp: new Date(2003, 7, 17), roles: ["User"]},
    { email: 'valey2@example.com', signedUp: new Date(2003, 7, 17), roles: ["User", "Admin"]},
    { email: 'valey3@example.com', signedUp: new Date(2003, 7, 17), roles: ["User"]},
    { email: 'valey4@example.com', signedUp: new Date(2003, 7, 17), roles: ["User", "Admin"]},
    { email: 'valey5@example.com', signedUp: new Date(2003, 7, 17), roles: ["User"]},
]

export default function UsersPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    return (
        <div style={{
            display: 'flex',
            width: 'full',
            height: '90vh',
            justifyItems: 'center',
            alignItems: 'center'
        }}>
            <Container sx={{ my: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>E-Mail</TableCell>
                                <TableCell>Roles</TableCell>
                                <TableCell>SigedUp</TableCell>
                                <TableCell align='right' sx={{ pr: 3 }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.email}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        <Stack spacing={1} direction='row'>
                                            {user.roles.map((role) => (
                                                <Chip label={role} />
                                            ))}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{Intl.DateTimeFormat('de-DE').format(user.signedUp)}</TableCell>
                                    <TableCell align='right'>
                                        <Button 
                                            variant='text' 
                                            color='info' 
                                            sx={{ color: 'black' }}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <MoreVertIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <NewModal />
            <UserRolesModal user={selectedUser} close={() => setSelectedUser(null)} />
        </div>
    )
}