import * as actionTypes from '../actions/actionTypes'

const initialState = {
    categories: null,
    selectedCategoryId: null,
    token: null,
    error: false,
    loading: false,
    screenplays: null,
    isAuthenticated: false,
    authRedirectPath: '/',
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
                selectedCategoryId: action.selectedCategoryId,
                error: false,
                loading: false,
            };
        case actionTypes.SELECT_CATEGORY:
            return {
                ...state,
                selectedCategoryId: action.selectedCategoryId
            };
        case actionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories,
                selectedCategoryId: action.selectedCategoryId,
                error: false,
                loading: false,
            };
        case actionTypes.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
            };
        case actionTypes.SET_SCREENPLAYS:
            return {
                ...state,
                screenplays: action.screenplays,
                error: false,
                loading: false,
            };
        case actionTypes.FETCH_SCREENPLAYS_SUCCESS:
            return {
                ...state,
                screenplays: action.screenplays,
                error: false,
                loading: false,
            };
        case actionTypes.FETCH_SCREENPLAYS_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
            };
        case actionTypes.UPDATE_SCREENPLAY_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
            };
        case actionTypes.UPDATE_SCREENPLAY_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case actionTypes.UPDATE_SCREENPLAY_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.accessToken,
                error: false,
                loading: false,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: true,
                loading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state, 
                isAuthenticated: false,
                token: null,
                error: false,
                loading: false,
            };
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path,
                error: false,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;