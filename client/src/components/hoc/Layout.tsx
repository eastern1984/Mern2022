import React, { useEffect, useState } from "react";
import {
    Box,
    Toolbar,
    AppBar,
    Button,
    Stack,
    Typography,
    CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

export const EmailContext = React.createContext({ email: '', setContextEmail: (v: string) => { } });

export const Layout = ({ children }: Props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const context = { email, setContextEmail: setEmail };

    useEffect(() => {
        fetch('/api/isAuth')
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                setEmail(result.email);
                if (!result.email) {
                    navigate('/');
                }
            });
    }, [])

    const postLogout = () => fetch('/api/logout', { method: "POST" })
        .then(response => response.json())
        .then(result => {
            setEmail('');
            navigate('/');
        });
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Stack direction='row' justifyContent="space-between" className={classes.root}>
                        <Typography variant="h6">{email || 'No user'}</Typography>
                        {email !== '' &&
                            <>
                                <Button color="primary" variant="contained" onClick={() => navigate('/entities')}>Entities</Button>
                                <Button color="secondary" variant="contained" onClick={postLogout}>Logout</Button>
                            </>
                        }
                    </Stack>
                </Toolbar>
            </AppBar>
            {loading && <CircularProgress />}
            {!loading &&
                < EmailContext.Provider value={context}>
                    {children}
                </EmailContext.Provider>
            }
        </Box >
    );
}

