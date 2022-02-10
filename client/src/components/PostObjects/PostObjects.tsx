import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Typography, Button, TextField, Stack } from '@mui/material';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '960px',
        padding: '16px',
        margin: 'auto'
    },
    entity: {
        cursor: 'pointer',
        padding: '16px',
        '&:hover': {
            opacity: '0.7'
        }
    },
    filterForm: {
        padding: '16px'
    }
}));

interface IProps {
    data: any[],
    id: string
}

const isJSON = (str: string) => {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
};

const PostObjects = ({ data, id }: IProps) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<null | string>(null);
    const [objects, setObjects] = useState<string[]>(data.map(v => JSON.stringify(v)));
    const disableButton = objects.reduce((accum, v) => !isJSON(v) || accum, false);


    const postObjects = () => {
        setLoading(true);
        fetch('/api/post-objects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, objects }) })
            .then(response => response.json())
            .then(result => {
                setResult(result);
                setLoading(false);
            });
    }

    const updateData = (index: number, data: string) => {
        let tmp = [...objects];
        tmp[index] = data;
        setObjects(tmp);
    }

    return (
        <Box className={classes.root}>
            <Stack spacing={2}>
                {result && !loading && <Typography variant="h3">{JSON.stringify(result)}</Typography>}
                {loading && <CircularProgress />}
                <Stack spacing={2}>
                    {objects && objects.map((object, index) =>
                        <TextField
                            error={!isJSON(object)}
                            helperText={!isJSON(object) && "Invalid JSON"}
                            value={object} multiline minRows={10}
                            fullWidth
                            onChange={(e) => updateData(index, e.target.value)}
                        />
                    )}
                </Stack>
                <Button disabled={disableButton || !!result} variant="outlined" onClick={() => postObjects()} >Отправить</Button>
            </Stack>
        </Box>
    );
};

export default PostObjects;