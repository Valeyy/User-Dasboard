import { Box, Button, List, ListItem, ListItemText, Modal, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function NewModal() {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundColor: 'grey',
                opacity: 0.8,
                position: 'absolute',
                top: 0,
            }}
            onClick={() => null}
        >
            <Box 
                height='50vh' 
                width='20vw' 
                bgcolor='white' 
                sx={{ 
                    opacity: 1, 
                    backgroundColor: 'white', 
                    position: 'absolute', 
                    right: '50%' 
                }}
            >
                <Stack gap={3}>
                    <Typography variant='h5' align='center'>
                        Vali's roles
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
            </Box>
        </Box>
    )
}