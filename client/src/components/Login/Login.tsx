import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Typography, Button, CircularProgress } from '@mui/material';
import { EmailContext } from '../hoc/Layout';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '300px',
        padding: '16px',
        margin: 'auto'
    },
    form: {
        padding: '16px'
    }
}));

const Login = () => {
    const classes = useStyles();
    const { setContextEmail } = useContext(EmailContext);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const postLogin = () => {
        setMessage('');
        setLoading(true);
        fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
            .then((response) => response.json())
            .then(result => {
                setLoading(false);
                if (result.success) {
                    navigate('/entities');
                    setContextEmail(email);
                } else {
                    setMessage(result.message);
                }
            })
    };

    return (
        <Box className={classes.root}>
            <Paper elevation={3} className={classes.form}>
                <Stack spacing={2}>
                    <Typography variant="h4">Login</Typography>
                    <TextField id="login" label="Login" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField id="password" label="Password" variant="outlined" onChange={(e) => { setPassword(e.target.value) }} />
                    {!loading && <Button variant="outlined" onClick={postLogin}>Submit</Button>}
                    {loading && <CircularProgress />}
                    {message && <Typography variant="h6">{message}</Typography>}
                </Stack>
            </Paper>
        </Box >
    );
};

export default Login;