import { Avatar, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import LockOutLinedIcon from '@mui/icons-material/LockOutlined';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signUpUser, signIn } from '../../features/user/userSlice'

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const initialState = { firstName: "", lastName: "", username: "", email: "", password: "", confirmPassword: "" };

    const userState = useSelector(state => state.user);

    const [formData, setFormData] = useState(initialState);
    const [errorText, setErrorText] = useState("");
    const [isError, setIsError] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if(isSignUp){
            if (
                formData.firstName.length > 1 &&
                formData.lastName.length > 1 &&
                formData.username.length > 2 &&
                formData.email.length > 0 &&
                formData.password.length > 0 &&
                formData.confirmPassword.length > 0 && 
                formData.password == formData.confirmPassword && 
                formData.password.length > 5
            ) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        } else {
            if ( 
                formData.email.length > 0 &&
                formData.password.length > 5
            ) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }

    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignUp) {
            dispatch(signUpUser(formData)).unwrap().then(() => {
                navigate("/");
              }).catch((error) => {
                setErrorText(error.message);
            })
        } else {
            dispatch(signIn(formData)).unwrap().then(() => {
                navigate("/");
            }).catch((error) => {
                // TODO handle failure. Show notification
            })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((prevState) => !prevState);
    }

    return (
        <Container maxWidth="xs" component="main" sx={{ mt: "60px" }}>
            <Paper elevation={6} sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ backgroundColor: "red", }}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5' sx={{ mb: "20px" }}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Grid container spacing={2} >
                        {isSignUp && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField name='firstName' required label="First Name" onChange={handleChange} autoFocus fullWidth />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField name='lastName' required label="Last Name" onChange={handleChange} fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='username' required label="Username" onChange={handleChange} fullWidth />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <TextField name='email' label="Email" required onChange={handleChange} type="email" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='password' label="Password" required onChange={handleChange} type="password" fullWidth />
                        </Grid>
                        {isSignUp &&
                            <Grid item xs={12}>
                                <TextField name='confirmPassword' required label="Confirm Password" onChange={handleChange} type="password" fullWidth />
                            </Grid>
                        }
                    </Grid>

                    <Button type='submit' variant='contained' fullWidth sx={{ mt: "20px" }} disabled={buttonDisabled}>
                    {isLoading ? <CircularProgress style={{color: "white"}}/> : isSignUp ? "Sign Up" : "Sign In"}
                        
                    </Button>
                    <Container>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
                        </Button>
                    </Container>
                    {
                        isError ? <Typography color="error.main">{errorText}</Typography> : null
                    }
                    <Container>
                       
                    </Container>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;

// TODO -> add username field, when the user clicks save will need to check if the username is unique or not if not display a message saying so
// TODO -> names should not contain spaces, create a regex that tests for bad inputs, and check if firebase handles this automatically