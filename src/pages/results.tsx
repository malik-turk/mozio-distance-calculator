// MUI
import { styled } from "@mui/material/styles";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { StepConnector } from '@mui/material';

// Styled Components
const ResultsWrapper = styled('section')(({ }) => ({
    '.background-image': {
        zIndex: -1,
        objectFit: 'cover'
    }
}));
const ToolbarWrapper = styled(Toolbar)(({ theme }) => ({
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(6.3px)',
    border: '1px solid rgba(255, 255, 255, 0.86)',
    margin: 16
}));
const StepperIcon = styled(FmdGoodOutlinedIcon)(({ }) => ({
    fontSize: 30
}));
const StepperContainer = styled('div')(({ }) => ({
    margin: '30px 16px 16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
}));
const StepLabelEl = styled(StepLabel)(({ }) => ({
    position: 'relative',

    '.distance': {
        position: 'absolute',
        top: '-50%',
        left: '-50%'
    }
}));

// Temp
const steps = ['Dubai', 'Amman', 'Istanbul', 'Ankara', 'Paris'];

export default function Results(): JSX.Element {
    return (
        <ResultsWrapper>
            <ToolbarWrapper>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2, cursor: 'pointer' }}
                    >
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Results
                    </Typography>
                </Toolbar>
            </ToolbarWrapper>
            <StepperContainer>
                <Stepper orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabelEl StepIconComponent={StepperIcon}>
                                <span>{label}</span>
                                {index !== 0 && <span className="distance">48KM </span>}
                            </StepLabelEl>
                        </Step>
                    ))}
                </Stepper>
            </StepperContainer>
        </ResultsWrapper>
    )
}
