
import { observer } from "mobx-react-lite"
import { useStore } from "../../../api/state/stores/store"
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, Stack, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export default observer(function LoginPage() {
    const {accountStore: {login, loadingUser}} = useStore()

    const navigate = useNavigate()

    const paperStyle={padding :20, height:'fit', width: '20vw', margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    return(
        <div style={{
            display: 'flex',
            height: '85%',
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            textAlign: 'center'
        }}>
            <Paper elevation={10} style={paperStyle}>
                <h2>Login</h2>
                <form onSubmit={(e) => {
                        e.preventDefault()

                        // @ts-ignore
                        const email = document.getElementById("email").value
                        // @ts-ignore
                        const password = document.getElementById('password').value

                        login({email: email, password: password}, navigate)
                    }}
                >
                    <TextField id='email' label='E-Mail' placeholder='Enter E-Mail' type='email' variant="outlined" fullWidth required sx={{ mt: 5 }} />
                    <TextField id='password' label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required sx={{ my:2 }} />
                    <Button 
                        type='submit' 
                        color='primary' 
                        variant="contained" 
                        style={btnstyle} 
                        fullWidth
                        disabled={loadingUser}
                    >
                        Sign in
                    </Button>
                </form>
                <Typography > Don't have an account? 
                    <Link to="/register" style={{ color: 'blue' }} >
                        &nbsp;Sign Up 
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
})