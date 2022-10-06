import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function Blog(){
    const [blog, setBlog] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    console.log('server url', process.env.REACT_APP_SERVER_URL)
    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)

                setBlog(response.data)
            }catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }

        getBlogs()
    }, [])

    const handleDelete = async () => {
        try {
            // axios to the backend to delete this bounty
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
            // after deletion, navigate back to /bounties
            navigate('/blogs')
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return (
        <div>
            <h1>Blog Specifics:</h1>

            <p>{errorMessage}</p>

            <div>
                <Link to={`/blogs/${id}/edit`}>
                    <button>Edit</button>
                </Link>

                <button
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>

            <div>
                <h2>{blog.name}</h2>

                <p>Title: {blog.title}</p>

                <p> Content: {blog.content}</p>
            </div>
        </div>
    )
}