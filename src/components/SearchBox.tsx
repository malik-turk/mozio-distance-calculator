// MUI
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';

// Styled Components
const SearchWrapper = styled(Paper)(({}) => ({
    width: '460px',
    padding: 30
}));
const DatePickerWrapper = styled('div')(({}) => ({
    marginTop: 16,
    width: '100%',

    '.date-picker': {
        width: '100%'
    }
}));
const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    width: '100%',
    marginTop: 8,
    height: 50,
    borderRadius: 35
}));

// Custom Styles
const textFieldCS = {
    width: '100%',

    '&:not( :first-of-type )': {
        marginTop: '25px'
    }
};

export default function SearchBox(): JSX.Element {
    const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));

    return (
        <SearchWrapper>
            <TextField
                sx={textFieldCS}
                id="outlined-basic"
                label="Enter city of origin (city)"
                variant="outlined"
                placeholder="e.g. London"
            />
            <TextField
                sx={textFieldCS}
                id="outlined-basic"
                label="Enter destination (city)"
                variant="outlined"
                placeholder="e.g. London"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePickerWrapper>
                    <DatePicker
                        className="date-picker"
                        label="Date of the Trip"
                        value={value}
                        minDate={dayjs(new Date())}
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
