import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';

// WE COULD SPLIT THESE ACTIONS AND REDUCERS INTO 3 FILES,
// AND THEN COMBINE REDUCERS WHEN CREATING A STORE

// CATEGORIES ACTIONS 

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories: categories,
        selectedCategoryId: categories[0]._id
    }
};

export const selectCategory = (categoryId) => {
    return {
        type: actionTypes.SELECT_CATEGORY,
        selectedCategoryId: categoryId,
    }
}

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categories,
        selectedCategoryId: categories[0]._id
    };
};

export const fetchCategoriesStart = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_START,
    };
};

export const fetchCategoriesFailed = (err) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL
    }
}

export const initCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesStart());
        axios.get('/categories')
            .then(res => {
                dispatch(fetchCategoriesSuccess(res.data));
                dispatch(initScreenplays(res.data[0]._id, '', 1))
            })
            .catch(err => {
                dispatch(fetchCategoriesFailed(err));
            });
    };
};


// SCREENPLAY ACTIONS

export const setScreenplays = (screenplays) => {
    return {
        type: actionTypes.SET_SCREENPLAYS,
        screenplays: screenplays,
    }
};

export const fetchScreenplaysSuccess = (screenplays) => {
    return {
        type: actionTypes.FETCH_SCREENPLAYS_SUCCESS,
        screenplays: screenplays,
    };
};

export const fetchScreenplaysStart = () => {
    return {
        type: actionTypes.FETCH_SCREENPLAYS_START,
    };
};

export const fetchScreenplaysFailed = (err) => {
    return {
        type: actionTypes.FETCH_SCREENPLAYS_FAIL
    }
}

export const initScreenplays = (categoryId, search = '', page=1) => {
    return dispatch => {
        dispatch(fetchScreenplaysStart());
        axios.get('/screenplays', {
            params: {
                category: categoryId,
                search: search,
                page: page
            }
        }).then(res => {
                    dispatch(fetchScreenplaysSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchScreenplaysFailed(err));
            });
    };
};

export const updateScreenplay = (rate, screenplayId) => {
    console.log("Ulazi u func")
    return dispatch => {
        axios.put(`/screenplays/${screenplayId}`, {
            rate: rate
        }).then(res => {
                console.log("RESPNSE ACTIONS", res)
                dispatch(updateScreenplaySuccess(res.data));
            })
            .catch(err => {
                dispatch(updateScreenplayFailed(err));
            });
    };
};


export const updateScreenplaySuccess = (screenplay) => {
    return {
        type: actionTypes.FETCH_SCREENPLAYS_SUCCESS,
    };
};

export const updateScreenplayStart = () => {
    return {
        type: actionTypes.FETCH_SCREENPLAYS_START,
    };
};

export const updateScreenplayFailed = (err) => {
    return {
        type: actionTypes.FETCH_SCREENPLAYS_FAIL,
        error: err
    }
}

// AUTH ACTIONS

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (accessToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        accessToken: accessToken,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('accessToken');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expiresIn'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
           
        }
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        }
        let url = '/users';
        if(!isSignUp){
            url = '/sessions';
        }
        axios.post(url, authData)
            .then(response => {
                console.log("OVO JE RESPONSE", response)
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('expiresIn', expirationDate);
                dispatch(authSuccess(response.data.accessToken));
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error));
            })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
};