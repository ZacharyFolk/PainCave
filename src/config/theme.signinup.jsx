import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    /*     backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50], */
    body: {
        backgroundColor: "#f4f2aa"
    },
    root: {
        height: '100vh',
    },
    image: {

        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f4f2aa',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        [theme.breakpoints.down('md')]: {
            margin: theme.spacing(8, 0)
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2em',
    },
    logoText: {
        fontWeight: 'bold'
    },
    error: {
        color: 'red'
    }
}));

export default useStyles;