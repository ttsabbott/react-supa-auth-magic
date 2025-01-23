import './App.css'
import { useState, useEffect } from 'react'
import supabase from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import MLAuth from './MLAuth'
import Account from './Account'

function App() {

  const [session, setSession] = useState(null)

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()

  }, [])

  return (
    <div className="container">
      {!session ?
        <>
          <MLAuth />
          <p className="description">--OR--<br />Use the following features to sign in using another platform or via traditional methods:</p>
          <div className="row flex flex-center">
            <div className="col-6 form-widget">
              {/* <div class="supabase-auth-ui_ui-divider c-kbVGyA"></div> */}
              <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
            </div>
          </div>
        </>
        : <Account key={session.user.id} session={session} />}
    </div>
  )

}

export default App
