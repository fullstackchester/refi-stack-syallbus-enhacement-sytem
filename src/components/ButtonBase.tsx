import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export const ButtonBase = () => {
    const muiButtonApiUrl = 'https://mui.com/material-ui/api/button/';
    return (
        /**
         * 
         * 
         */
        <>
            <Link href={muiButtonApiUrl} target="_blank" rel="noopener noreferrer">MUI Button API</Link>
            <br></br>
            <code>Size small, medium, large</code>
            <br></br>
            <Button variant="contained" size="small">Hello world</Button>
            <Button variant="contained" size="medium">Hello world</Button>
            <Button variant="contained" size="large">Hello world</Button>
        </>

    )
}