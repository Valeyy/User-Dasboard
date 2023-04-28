import { Box, Modal, Typography } from "@mui/material";
import User from "../../../../api/interfaces/User";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

interface Props {
    user: User | null
    close: () => void
}

export default function UserRolesModal(props: Props) {
    return (
        <Box sx={{
            height: '100vh',
            widht: '100vw',
            backgroundColor: 'red',
            color: 'red',
            position: 'absolute',
        }}>
            <Modal
                open={true}
                onClose={props.close}
                sx={style}
            >
                <Box>
                    <Typography variant='h5'>
                        {`${props.user?.email}'s roles`}
                    </Typography>

                </Box>
            </Modal>
        </Box>
    )
}