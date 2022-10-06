
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {
    // blogs from the backend
    const [blogs, setblogs] = useState([])
    // state for messages from the backend
    const [errorMessage, setErrorMessage] = useState('')

    console.log('server url', process.env.REACT_APP_SERVER_URL)
    useEffect(() => {
        const getblogs = async () => {
            try {  
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog`)
                // console.log(response.data)
                // TODO: sort by date and only show the most recent blogs
                setblogs(response.data)
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }

        getblogs()
    }, []) // only fire on page load

    const blogLinks = blogs.map(blog => {
        return (
            <div key={blog._id}>
                <Link to={`/blogs/${blog._id}`}>{blog.name}</Link>
            </div>
        )
    })

    return (
        <div>
            <h1>Welcome to the blog app!</h1>

            <h2>Most Recent blogs:</h2>

            {blogLinks}

            <p>{errorMessage}</p>

           
        </div>
    )
}