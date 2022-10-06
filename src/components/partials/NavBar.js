import { Link } from 'react-router-dom'

export default function NavBar(){
    return (
        <nav>
            <ul style={{listStyleType: 'none'}}>
                <li>
                    <Link to='/'>Home</Link>
                </li>

                <li>
                    <Link to='/blogs'>The blogging blogs</Link>
                </li>

                <li>
                    <Link to='/blogs/new'>Make your own blog</Link>
                </li>
            </ul>
        </nav>
    )
}