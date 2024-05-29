import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"

const Navbar = () => {
  const [cookies,removeCookie] = useCookies(["access_token"])
  const navigate = useNavigate()

  
  const logout =() => {
    removeCookie("access_token", "")
    window.localStorage.removeItem("userId")
    navigate('/auth')
  }
  return (
    <nav className="w-full flex items-center justify-center gap-10 bg-black p-4 text-2xl text-white">
        <Link to='/'>Home</Link>
        {!cookies?.access_token ? 
          (<Link to='/auth'>Login / register</Link>
          ) : (
            <div className="flex items-center gap-10">
              <Link to='/saved-recipe'>saved Recipe</Link>
              <Link to='/create-recipe'>Create recipe</Link>
              <button onClick={logout}>Logout</button>
            </div>
          )}
    </nav>
  )
}

export default Navbar