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

const ChooseEntity = () => {
    const classes = useStyles();
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        fetch('/api/entityDetails/' + id).then(response => response.json).then((result) => {
            setLoading(false);
        })
    }, []);
    console.log(fields);
    return (
        <Box className={classes.root}>
            <Typography variant="h4">Entity {id}</Typography>
            {loading && <CircularProgress />}
            {!loading &&
                <Paper className={classes.form} elevation={2}>
                    <Stack spacing={2} alignItems="flex-start">
                        <Typography variant="h4">Поля сущности</Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button variant="contained" onClick={() => { setFields([...fields, ['Название', 'string']]); }}>Текстовое поле</Button>
                            <Button variant="contained" onClick={() => { setFields([...fields, ['Название', 'boolean']]); }}>Флажок</Button>
                        </Stack>
                        {fields.map((field: [string, string], index: number) => {
                            let newField;
                            switch (field[1]) {
                                case 'string': { newField = (<TextField label={""} disabled />); break; }
                                case 'boolean': { newField = (<FormControlLabel control={<Checkbox disabled />} label={""} />); break; }
                            }
                            return (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <TextField label={"Название"} value={fields[index][0]} onChange={(e) => { fields[index][0] = e.target.value; setFields([...fields]) }} />
                                    {newField}
                                </Stack>
                            );
                        })}
                        <Button variant="outlined" onClick={() => null}>Отправить</Button>
                    </Stack>
                </Paper>
            }
        </Box>
    );
};

export default ChooseEntity;