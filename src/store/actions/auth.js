import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        localId: localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkLogTime = (logTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout())
        }, logTime * 1000)
    }
    
}

export const auth = (email, password, isSignUp) => {
    return dispatch  => {
            dispatch(authStart()) ;
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKwoCHSy6oyOHXE3cahnyACka2dTxduak'
            if (!isSignUp) {
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKwoCHSy6oyOHXE3cahnyACka2dTxduak'
            }
            axios.post(url, authData )
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkLogTime(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthenticatePath = (path) => {
    return{
        type: actionTypes.SET_AUTHENTICATE_PATH,
        path: path
    }
}