import React, { useCallback } from 'react'
import Icon from '@mdi/react'
import { mdiLockOutline } from '@mdi/js'
import {
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import R from 'ramda'
import { Button, Link } from 'gatsby-material-ui-components'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { useSnackbar } from 'notistack'
import { isLoggedIn, setUser } from '../services/auth'
import { Auth } from 'aws-amplify'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '98vw',
    margin: '0 auto',
    padding: theme.spacing(3, 1, 6),
    [`${theme.breakpoints.up('sm')}`]: {
      width: 600,
      padding: theme.spacing(3, 6, 6),
    },
  },
  hidden: {
    display: 'none',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: theme.spacing(2),
    // alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  input: {
    marginTop: theme.spacing(3),
  },
  remember: {},
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}))

interface FormValues {
  firstName: string
  email: string
  password: string
  remember: boolean
}

const defaultValues: FormValues = {
  firstName: '',
  email: '',
  password: '',
  remember: false,
}

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const loginForm = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues,
  })

  const {
    register,
    errors,
    handleSubmit,
    reset,
    setError,
    control,
    formState,
  } = loginForm

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (values) => {
      console.log(values)
      if (values.firstName !== '') {
        enqueueSnackbar('You appear to be a robot', {
          variant: 'error',
          autoHideDuration: 3000,
        })
        return reset(defaultValues)
      }
      try {
        await Auth.signIn(values.email, values.password)
        const user = await Auth.currentAuthenticatedUser()
        const userInfo = {
          ...user.attributes,
          username: user.username,
        }
        setUser(userInfo)
        navigate('/app/home')
      } catch (err) {
        if (err === 'not authenticated') {
          enqueueSnackbar('User not Authenicated', {
            variant: 'warning',
          })
        }
        enqueueSnackbar(typeof err === 'string' ? err : err.message, {
          variant: 'error',
        })
      }
    },
    [reset, enqueueSnackbar, navigate]
  )

  if (isLoggedIn()) {
    navigate('/app/home')
  }

  return (
    <section className={classes.root}>
      <Paper elevation={6} className={classes.formWrapper}>
        <Avatar className={classes.avatar} color="primary">
          <Icon path={mdiLockOutline} size={1} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Employee Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            className={classes.hidden}
            id="firstName"
            name="firstName"
            type="text"
            label="First name"
            margin="none"
            aria-hidden="true"
            inputRef={register}
            inputProps={{
              'aria-hidden': true,
            }}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            inputRef={register({ required: true })}
            label="Email"
            type="text"
            name="email"
            id="login-email"
            autoComplete="email"
            error={R.pathOr(false, ['email'])(errors)}
            helperText={R.pathOr('', ['email', 'message'])(errors)}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            inputRef={register({ required: true })}
            label="Password"
            name="password"
            type="password"
            id="login-password"
            autoComplete="current-password"
            error={R.pathOr(false, ['password'])(errors)}
            helperText={R.pathOr('', ['password', 'message'])(errors)}
          />
          <Controller
            name="remember"
            control={control}
            defaultValue={false}
            render={({ value, onChange }) => (
              <FormControlLabel
                className={classes.remember}
                onChange={(e, v) => onChange(v)}
                control={
                  <Checkbox value={true} checked={value} color="primary" />
                }
                label="Remember me"
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formState.isSubmitting}
            className={classes.submit}
          >
            {formState.isSubmitting ? <CircularProgress /> : 'Login'}
          </Button>

          <Link to="/password-reset" variant="body2" align="right">
            Forgot password?
          </Link>
        </form>
        {/* <AmplifyAuthenticator>
          <div>
            My App
            <AmplifySignOut />
          </div>
        </AmplifyAuthenticator> */}
      </Paper>
    </section>
  )
}

export default Login
