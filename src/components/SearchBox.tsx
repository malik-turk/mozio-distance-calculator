import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

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

export default function SearchBox(): JSX.Element {
    const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
    const [intermediate, setIntermediate] = useState<IntermediateCites[]>([]);
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
        <SearchWrapper>
            <Autocomplete
                sx={textFieldCS}
                freeSolo
                disableClearable
                options={citiesData?.map((city: Cities) => city.name)}
                loading={isLoading}
                renderInput={(params) => (
                    <TextField
                        {...params}
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
                            options={citiesData?.map((city: Cities) => city.name)}
                            loading
                            renderInput={(params) => (
                                <TextField
                                    {...params}
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
                            <TextField {...params} />
                        }
                    />
                </DatePickerWrapper>
            </LocalizationProvider>
            <TextField
                type="number"
                sx={textFieldCS}
                id="outlined-basic"
                label="Number of passengers"
                variant="outlined"
                placeholder="e.g. 4"
            />
            <SubmitButton variant="contained">
                Check your distance!
            </SubmitButton>
        </SearchWrapper>
    )
}
