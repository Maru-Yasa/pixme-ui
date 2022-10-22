import { supabase } from "./supabase"

export const login = async (dispatch, formData) => {
    dispatch({type: 'REQ_LOGIN'})
    const {data, error} = await supabase.auth.signInWithPassword(formData)
    if(error){
        console.log(error);
        dispatch({type: 'LOGIN_ERROR', error: error.message})
        throw error
    }
    const profile = await me(data.user.id)
    localStorage.setItem('_user', JSON.stringify(data))
    localStorage.setItem('_profile', JSON.stringify(profile))
    dispatch({type: 'LOGIN_SUCCESS', payload: data, profile: profile})
    return data
}

export const loginWithGoogle = async () => {
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options:{redirectTo:`${window.origin}/google`}
    })

    if(error){
        throw error
    }

    console.log(data);
    return data

}


export const register = async (dispatch, formData) => {

    dispatch({type: 'REQ_REGISTER'})
    const {data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
    })

    if (error) {
        dispatch({type: 'REGISTER_ERROR', error: error.message})
        throw error
    }
    const { data2, error2 } = await supabase
    .from('profiles')
    .insert([
      { email: data.user.email, username: formData.username, user_id: data.user.id },
    ])

    if (error2){
        dispatch({type: 'REGISTER_ERROR', error: error.message})
        throw error2
    }
    dispatch({type: 'REGISTER_SUCCESS'})
    window.location.pathname = '/login'
    return data2
    
}

export const logout = async (dispatch) => {
    const {error} = await supabase.auth.signOut();
    if(error){
        throw error
    }
    
    localStorage.clear()
    dispatch({type: 'LOGOUT'})
    
}

export const me = async (user_id) => {
    let { data: profiles, error } = await supabase
    .from('profiles')
    .select('*').eq('user_id', user_id)
    
    if(error){
        throw error
    }
    
    return profiles[0] ? profiles[0] : null
}

export const getMessagaes = async (user_id) => {
    let {data: messages, error} = await supabase.from('messages').select('*').eq('user_id', user_id).order('created_at', {ascending: false})

    if(error){
        throw error
    }
    
    return messages
}

export const getMessageById = async (user_id,id) => {
    let {data: message, error} = await supabase.from('messages').select('*').eq('id', id).eq('user_id', user_id).order('created_at', {ascending: false})

    if(error){
        throw error
    }
    
    return message[0] ? message[0] : null
}

export const postAuth = async (dispatch) => {
    const {data, error} = await supabase.auth.getUser()
    const {data: session, errorSession} = await supabase.auth.getSession()

    if (errorSession) {
        throw errorSession
    }

    if(error){
        throw error
    }

    const dataAuth = {
        user: data.user,
        session: session.session
    }

    let { data: me, error3 } = await supabase
        .from('profiles')
        .select('*').eq('user_id', dataAuth.user.id)
    if(me.length === 0){
        const { data: profile, error2 } = await supabase
        .from('profiles')
        .insert([
            {email: data.user.email, username: data.user.email, user_id: data.user.id },
        ])
        if(error2) throw error2
        localStorage.setItem('_profile', JSON.stringify(profile))
        localStorage.setItem('_user', JSON.stringify(dataAuth))
        dispatch({type: 'LOGIN_SUCCESS', payload: dataAuth, profile: profile})
        return data
    }

    localStorage.setItem('_profile', JSON.stringify(me[0]))
    localStorage.setItem('_user', JSON.stringify(dataAuth))
    dispatch({type: 'LOGIN_SUCCESS', payload: dataAuth, profile: me[0]})
    return data
}

export const getUserById = async (user_id) => {
    const {data: profile, error} = await supabase.from('profiles').select('*').eq('user_id', user_id)
    if(error){
        throw error
    }

    return profile[0]

}

export const sendMessage = async (formData) => {
    const { data, error } = await supabase
        .from('messages')
        .insert([
            {user_id: formData.user_id, message: formData.message},
        ])

    if(error){
        throw error
    }

    console.log(data);

    return data

}

export const setMessageOpened = async (user_id,id) => {
    const { data, error } = await supabase.from('messages').update({
        opened: true
    }).eq('id', `${id}`).eq('user_id', user_id)

    if(error){
        throw error
    }

    return data

}

export const deleteMessageById = async (id) => {
    const { data, error } = await supabase.from('messages').delete().eq('id', id)

    if(error){
        throw error
    }

    return data

}

export const editProfile = async (user_id, formData) => {
    const {data, error} = await supabase.from('profiles').update({username: formData.username}).eq('user_id', user_id);

    if(error){
        throw error
    }

    return data

}

export const sendResetPassword = async (email) => {
    const {data, error} = await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${location.origin}/reset-password`})
    if(error){
        throw error
    }

    return data
}

export const resetPassword = async (formData) => {
    const {data, error} = await supabase.auth.updateUser({
        password: formData.password
    })

    if (error) {
        throw error
    }

    return data

}