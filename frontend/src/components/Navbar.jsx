import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()
  
  const logout =() => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userId")
    navigate('/auth')
  }
  return (
    <nav className="w-full flex items-center justify-center gap-10 bg-black p-4 text-2xl text-white">
        <Link to='/'>Home</Link>
        {!cookies.access_token ? 
          (<Link to='/auth'>Login / register</Link>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        <Link to='/create-recipe'>Create recipe</Link>
        <Link to='/saved-recipe'>saved Recipe</Link>
    </nav>
  )
}

export default Navbar