import { Box, Button, List, ListItem, ListItemButton, ListItemText, Modal, Stack, Typography } from "@mui/material";
import User from "../../../../api/interfaces/User";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffffff',
    opacity: 1,
    boxShadow: 24,
    p: 4
};

interface Props {
    user: User | null
    close: () => void
}

export default function UserRolesModal(props: Props) {

    //Return null if user is null
    if (!Boolean(props.user)) return null

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundColor: 'grey',
                opacity: 0.4,
                position: 'absolute',
                top: 0,
            }}
            onClick={props.close}
        >
            <Modal
                open={Boolean(props.user)}
                onClose={props.close}
                sx={style}
            >
                <Stack gap={3}>
                    <Typography variant='h5' align='center'>
                        {`${props.user?.email}'s roles`}
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary='Wi-Fi' />
                            <Button variant='text' color='inherit'>
                                <DeleteIcon />
                            </Button>
                        </ListItem>
                    </List>
                </Stack>
            </Modal>
        </Box>
    )
}