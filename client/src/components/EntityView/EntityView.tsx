import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { CircularProgress, Typography, Button, Stack, Paper, TextField, Checkbox, FormControlLabel } from '@mui/material';

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

const ChooseEntity = () => {
    const classes = useStyles();
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState<any>(null);

    const postFilter = () => fetch('/api/postEntity', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: JSON.parse(fields), id }) })

    useEffect(() => {
        setLoading(true);
        fetch('/api/entityDetails/' + id).then(response => response.json).then((result) => {
            setLoading(false);
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
                        <TextField label={"Объект"} multiline onChange={(e) => setFields(e.target.value)} rows={5} />
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

export default ChooseEntity;