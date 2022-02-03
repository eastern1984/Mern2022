import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { CircularProgress, Typography, Button, Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 0
    }
}));

const ChooseEntity = () => {
    const classes = useStyles();
    let { type } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/entityDetails/' + type).then(response => response.json).then((result) => {
            setLoading(false);
        })
    }, []);

    return (
        <Box className={classes.root}>
            <Typography variant="h4">Entity {type}</Typography>
            {loading && <CircularProgress />}
            <Stack spacing={2}>
                <Button variant="outlined" onClick={() => null}>Сохранить</Button>
            </Stack>
        </Box>
    );
};

export default ChooseEntity;