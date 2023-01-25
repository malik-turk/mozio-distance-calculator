import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import Router from 'next/router';

// MUI
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Hooks
import { useCitiesData } from '@/hooks/useCitiesData';

// Styled Components
const SearchWrapper = styled(Paper)(({ }) => ({
    width: '460px',
    padding: 30
}));
const DatePickerWrapper = styled('div')(({ }) => ({
    marginTop: 16,
    width: '100%',

    '.date-picker': {
        width: '100%'
    }
}));
const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    width: '100%',
    marginTop: 16,
    height: 50,
    borderRadius: 35
}));
const AddIntermediateCityButton = styled(Button)(({ theme }) => ({
    marginTop: 16
}));
const IntermediateField = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 10
}));

// Custom Styles
const textFieldCS = {
    width: '100%',

    '&:not( :first-of-type )': {
        marginTop: '16px'
    }
};

// Types
import { IntermediateCites } from '@/types/search';
import { Cities } from '@/types/common';
import { FormData } from '@/types/search';

export default function SearchBox(): JSX.Element {
    const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
    const [intermediate, setIntermediate] = useState<IntermediateCites[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showBackdrop, setshowBackdrop] = useState<boolean>(false);

    /**
     * Submit handler
     * @param data form data
     */
    const onSubmit = (data: FormData) => {
        setshowBackdrop(true);
        const queryParams = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');

        setTimeout(() => {
            Router.push(`/results?${queryParams}`);
        }, 1000);
    }

    // Fetch Cities Data
    const { citiesData, isLoading } = useCitiesData();

    /**
     * Add new intermediate fields
     */
    const handleIntermediateClick = (): void => {
        setIntermediate([
            ...intermediate,
            {
                id: uuidv4()
            }
        ]);
    };

    /**
     * Remove intermediate fields
     * @param index index of field
     */
    const handleRemoveIntermediateField = (index: number): void => {
        setIntermediate(intermediate.filter((field, i) => i !== index));
    };

    return (
        <>
            {showBackdrop &&
                (<Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>)
            }
            <SearchWrapper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Autocomplete
                        sx={textFieldCS}
                        freeSolo
                        disableClearable
                        options={citiesData?.map((city: Cities) => city.name)}
                        loading={isLoading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...register('origin', { required: true })}
                                error={!!errors.origin}
                                label="Enter city of origin (city)"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    {
                        intermediate.map((intermediateField, i) => (
                            <IntermediateField key={intermediateField.id}>
                                <Autocomplete
                                    sx={textFieldCS}
                                    freeSolo
                                    disableClearable
                                    options={citiesData?.map((city: Cities, i: number) => city.name)}
                                    loading
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            {...register(`intermediate-city-${i}`, { required: true })}
                                            error={!!errors[`intermediate-city-${i}`]}
                                            label="Enter city of origin (city)"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                                <div onClick={() => handleRemoveIntermediateField(i)}>
                                    <ClearOutlinedIcon />
                                </div>
                            </IntermediateField>
                        ))
                    }
                    <AddIntermediateCityButton
                        variant="text"
                        onClick={handleIntermediateClick}
                    >
                        + Add Intermediate City
                    </AddIntermediateCityButton>
                    <Autocomplete
                        sx={textFieldCS}
                        freeSolo
                        disableClearable
                        options={citiesData?.map((city: Cities) => city.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...register('destination', { required: true })}
                                error={!!errors.destination}
                                label="Enter destination (city)"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePickerWrapper>
                            <DatePicker
                                className="date-picker"
                                label="Date of the Trip"
                                value={value}
                                minDate={dayjs()}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        {...register('date', { required: true })}
                                        error={!!errors.date}
                                    />
                                }
                            />
                        </DatePickerWrapper>
                    </LocalizationProvider>
                    <TextField
                        type="number"
                        sx={textFieldCS}
                        id="outlined-basic"
                        label="Number of passengers"
                        {...register('passengers', { required: true, min: 1 })}
                        inputProps={{
                            min: 1
                        }}
                        error={!!errors.passengers}
                        variant="outlined"
                        placeholder="e.g. 4"
                    />
                    <SubmitButton
                        type="submit"
                        variant="contained"
                    >
                        Check your distance!
                    </SubmitButton>
                </form>
            </SearchWrapper>
        </>
    )
}
