const data = localStorage.getItem('_user') ? JSON.parse(localStorage.getItem('_user')) : ""
const profile = localStorage.getItem('_profile') ? JSON.parse(localStorage.getItem('_profile')) : ""
export const initialValue = {
    data: data,
    profile: profile,
    isLoading: false,
    errorMessage: null
}

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQ_LOGIN":
            return {
                ...initialState,
                isLoading: true
            }
        case "REQ_REGISTER":
            return {
                ...initialState,
                isLoading: true
            }
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                data: action.payload,
                profile: action.profile,
                isLoading: false,
                errorMessage: null
            }
        case "REGISTER_SUCCESS":
            return {
                ...initialState,
                isLoading: false,
                errorMessage: null
            }
        case "LOGOUT":
            return {
                ...initialState,
                data:""
            }
        case "LOGIN_ERROR":
            return  {
                ...initialState,
                errorMessage: action.error,
                isLoading: false
            }
        case "REGISTER_ERROR":
            return  {
                ...initialState,
                errorMessage: action.error,
                isLoading: false
            }
        case "AFTER_UPDATE_PROFILE":
            return  {
                ...initialState,
                isLoading: false,
                profile: action.profile
            }
        default:
            throw new Error('type not defined')
    }
}