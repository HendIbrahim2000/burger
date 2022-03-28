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

export const auth = (email, password, isSignUp) => {
    return dispatch  => {
            dispatch(authStart()) ;
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCsoWy4ST_4b0LyGY5qxdR8Eg5sG3n96I'
            if (!isSignUp) {
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCsoWy4ST_4b0LyGY5qxdR8Eg5sG3n96I'
            }
            axios.post(url, authData )
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFail(err.response.data.error))
            })
    }
}