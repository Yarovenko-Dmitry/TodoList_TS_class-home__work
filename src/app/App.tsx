import React, {useEffect} from 'react'
import './App.css'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from '@material-ui/core'
import {logoutTC} from '../features/Login/auth-reducer'

type PropsType = {
  demo?: boolean
}

function App({demo = false}: PropsType) {
  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized);
  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }
  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>
            <Button color="inherit">Login</Button>
            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
          </Toolbar>
          {status === 'loading' && <LinearProgress/>}
        </AppBar>
        <Container fixed>
          <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
          <Route path={'/login'} render={() => <Login/>}/>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
