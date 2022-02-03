import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { IEntity } from '../../types/interfaces';
import { CircularProgress, Typography, Button, Stack } from '@mui/material';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '300px',
        padding: '16px',
        margin: 'auto'
    },
}));

const EntityView = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [entity, setEntity] = useState<IEntity | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('/api/entity/' + id).then(response => response.json()).then((result) => {
            setLoading(false);
            setEntity(result.data);
        })
    }, []);

    return (
        <Box className={classes.root}>
            <Typography variant="h4">{entity?.name}</Typography>
            {loading && <CircularProgress />}
            <Stack spacing={2}>
                <Button variant="outlined" onClick={() => navigate('/view/')}>Создать</Button>
                <Button variant="outlined" onClick={() => navigate('/view/' + id)}>Редактировать</Button>
                <Button variant="outlined" onClick={() => null}>Отмена</Button>
            </Stack>
        </Box>
    );
};

export default EntityView;