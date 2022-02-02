import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Stack, CircularProgress } from '@mui/material';
import { IEntity } from '../../types/interfaces';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '16px',
        margin: 'auto'
    },
    entity: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            opacity: '0.7'
        }
    }
}));

const ChooseEntity = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [entities, setEntities] = useState<IEntity[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch('/api/entities')
            .then(response => response.json())
            .then((result => {
                setLoading(false);
                setEntities(result.data || []);
            }))
    }, []);

    return (
        <Box className={classes.root}>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    {loading && <CircularProgress />}
                    {!loading && entities.map((entity) =>
                        <Grid item xs={6} md={3} key={entity.name}>
                            <Paper elevation={3} className={classes.entity} onClick={() => navigate('/list/' + entity.id)}>
                                <Typography variant="h4">{entity.name}</Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Stack>
        </Box >
    );
};

export default ChooseEntity;