import { Link } from "react-router-dom"

export const Navbar = () => {
    return <div> Nav Bar
        <p><Link to="/"> Home</Link></p>
        <Link to="/menu"> Menu</Link>
        <Link to="/contact"> Contact</Link></div>
}