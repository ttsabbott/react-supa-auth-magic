import { useState } from 'react'
import supabase from './supabaseClient'

export default function MLAuth() {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('handleLogin, emailRedirectTo:', document.location.origin + document.location.pathname);
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                // set this to false if you do not want the user to be automatically signed up
                // shouldCreateUser: false,
                emailRedirectTo: document.location.origin + document.location.pathname,
            },
        })
        if (error) {
            alert(error.error_description || error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    return (
        <div className="row flex flex-center">
            <div className="col-6 form-widget">
                <h1 className="header">Supabase + React</h1>
                <p className="description">Sign in via magic link with your email below</p>
                <form className="form-widget" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className={'button block'} disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}
