import { Backdrop, Button, CircularProgress } from "@mui/material";

export default function LoadingScreen() {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 1 }}
            open={true}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    )
}