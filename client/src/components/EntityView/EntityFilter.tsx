import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { CircularProgress, Typography, Button, Stack, Paper, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { IMethod, METHOD_TYPES } from '../../types/interfaces';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '960px',
        padding: '16px',
        margin: 'auto'
    },
    form: {
        padding: '16px'
    }
}));

const isJSON = (str: string) => {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

const EntityFilter = () => {
    const classes = useStyles();
    let { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState<any>('');

    const postFilter = () => {
        setLoading(true);
        fetch(
            '/api/postEntity',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fields: JSON.parse(fields), id })
            })
            .then(response => response.json())
            .then((result) => {
                navigate('/entities');
            })
    }

    useEffect(() => {
        setLoading(true);
        fetch('/api/entity/' + id)
            .then(response => response.json())
            .then((result) => {
                const filterSchema = result.data?.methods.filter((v: IMethod) => v.type === METHOD_TYPES.GET)[0]?.filterSchema;
                setLoading(false);
                setFields(filterSchema ? JSON.stringify(filterSchema) : '');
            })
    }, []);

    return (
        <Box className={classes.root}>
            <Typography variant="h4">Entity {id}</Typography>
            {loading && <CircularProgress />}
            {!loading &&
                <Paper className={classes.form} elevation={2}>
                    <Stack spacing={2} alignItems="flex-start">
                        <Typography variant="h4">Поля сущности</Typography>
                        <TextField label={"Объект"} multiline onChange={(e) => setFields(e.target.value)} rows={5} value={fields} />
                        {!isJSON(fields) && <Typography>Введите JSON объект</Typography>}
                        {isJSON(fields) &&
                            <Stack spacing={2}>
                                <Typography>Результат:</Typography>
                                {Object.entries(JSON.parse(fields)).map((field) => {
                                    switch (typeof field[1]) {
                                        case 'number': return (<TextField label={field[0]} disabled type="number" />);
                                        case 'string': return (<TextField label={field[0]} disabled />);
                                        case 'boolean': return (<FormControlLabel control={<Checkbox disabled />} label={field[0]} />);
                                    }
                                })
                                }
                            </Stack>
                        }
                        <Button variant="outlined" onClick={() => postFilter()} disabled={!(isJSON(fields) && (Object.entries(JSON.parse(fields)).length > 0))} >Отправить</Button>
                    </Stack>
                </Paper>
            }
        </Box>
    );
};

export default EntityFilter;