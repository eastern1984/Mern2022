import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { IEntity, IMethod, METHOD_TYPES } from '../../types/interfaces';
import { CircularProgress, Typography, Button, Stack, Paper, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { Box } from '@mui/system';
import PostObjects from '../PostObjects/PostObjects';

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

const EntityView = () => {
    const classes = useStyles();
    let { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showInfoAndButtons, setShowInfoAndButtons] = useState(false);
    const [filter, setFilter] = useState<any>(null);
    const [filterData, setFilterData] = useState<any>(null);
    const [entity, setEntity] = useState<IEntity | null>(null);
    const [responseForGet, setResponseForGet] = useState<null | any[]>(null);

    const sendGetWithFilters = (body: any) => {
        setLoading(true);
        setFilter(null);
        fetch('/api/send-get-filters', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filter: body, id }) })
            .then(response => response.json())
            .then(result => {
                setResponseForGet(result.data);
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        fetch('/api/entity/' + id).then(response => response.json()).then((result) => {
            const filter = result.data.methods.find((method: IMethod) => method.type === METHOD_TYPES.GET)?.filterSchema;

            if (filter) {
                setFilter(filter);
            } else {
                setShowInfoAndButtons(true);
            }
            setLoading(false);
            setEntity(result.data);
        })
    }, []);

    return (
        <Box className={classes.root}>
            {loading && <CircularProgress />}
            {responseForGet && id && <PostObjects data={responseForGet} id={id} />}
            {entity && !responseForGet &&
                <Stack spacing={2}>
                    <Typography variant="h4" align="center">{entity.name}</Typography>
                    <Typography variant="h5">{entity.description}</Typography>
                    {filter &&
                        <Paper className={classes.filterForm} elevation={2}>
                            <Stack spacing={2} alignItems="flex-start">

                                <Typography variant="h4">????????????</Typography>
                                {Object.entries(filter).map(field => {
                                    switch (typeof field[1]) {
                                        case 'string': return <TextField label={field[0]} value={filterData && filterData.hasOwnProperty(field[0]) && filterData[field[0]] || ''} onChange={(e) => setFilterData({ ...filterData, [field[0]]: e.target.value })} />
                                        case 'number': return <TextField type="number" label={field[0]} value={filterData && filterData.hasOwnProperty(field[0]) && filterData[field[0]]} onChange={(e) => setFilterData({ ...filterData, [field[0]]: e.target.value })} />
                                        case 'boolean': return <FormControlLabel control={<Checkbox checked={filterData && filterData.hasOwnProperty(field[0]) && filterData[field[0]]} onChange={(e) => setFilterData({ ...filterData, [field[0]]: e.target.checked })} />} label={field[0]} />
                                    }
                                    return <div>Unknown type - {typeof field[1]}</div>;
                                })}
                                <Stack direction="row" spacing={2} justifyContent="space-between">
                                    <Button disabled={!filterData} variant="outlined" onClick={() => sendGetWithFilters(filterData)}>??????????????????</Button>
                                    <Button color="secondary" variant="contained" onClick={() => navigate('/filterForm/' + id)}>????????????????????????????</Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    }
                    {showInfoAndButtons &&
                        <Stack spacing={2}>
                            <Typography>???????????? ???? ????????????</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" onClick={() => navigate('/filterForm/' + id)}>??????????????</Button>
                                <Button variant="outlined" onClick={() => navigate('/entities')}>????????????</Button>
                            </Stack>
                        </Stack>
                    }
                </Stack>
            }
        </Box>
    );
};

export default EntityView;