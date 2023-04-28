import { Button, Paper, TextField, Typography } from "@mui/material"
import { useStore } from "../../../api/state/stores/store"
import { observer } from "mobx-react-lite"
import { Link, useNavigate } from "react-router-dom"

export default observer(function RegisterPage() {
    const {accountStore: {register, loadingUser}} = useStore()

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
                <h2>Register</h2>
                <form onSubmit={(e) => {
                        e.preventDefault()

                        // @ts-ignore
                        const email = document.getElementById("email").value
                        // @ts-ignore
                        const password = document.getElementById('password').value
                        // @ts-ignore
                        const rPassword = document.getElementById('password2').value

                        if (password === rPassword)
                            register({email: email, password: password}, navigate)
                        else
                            alert("Passwords don't match")
                    }}
                >
                    <TextField id='email' label='E-Mail' placeholder='Enter E-Mail' type='email' variant="outlined" fullWidth required sx={{ mt: 5 }} />
                    <TextField id='password' label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required sx={{ mt:2 }} />
                    <TextField id='password2' label='Repeat Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required sx={{ my:2 }} />
                    <Button 
                        type='submit' 
                        color='primary' 
                        variant="contained" 
                        style={btnstyle} 
                        fullWidth
                        disabled={loadingUser}
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography > Already have an account? 
                    <Link to="/login" style={{ color: 'blue' }} >
                        &nbsp;Sign In 
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
})