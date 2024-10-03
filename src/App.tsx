import { useEffect } from 'react'
import RoutesMiddleware from './routes/routes_middleware'
import { useAppDispatch } from './stores'
import { AuthThunk } from './stores/services/auth'
import { redirect } from 'react-router-dom'

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isHasToken = localStorage.getItem("access_token");
    if(isHasToken) {
      dispatch(AuthThunk({}));
    }else{
      redirect("/signin")
    }
  }, [])

  return (
    <>
      <RoutesMiddleware />
    </>
  )
}

export default App
