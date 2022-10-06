import { useParams, Link, useNavigate } from 'react-router-dom' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function EditBlog(){
    const [form, setForm] = useState({
        name: '',
        title: 0,
        content: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog`)

                setForm(response.data)
            }catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }

        getBlogs()
    }, [])

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            // axios.put/.post('url', data for the reqeust body)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bounty/${id}`, form)
            // navigate back to the details page for this bounty
            navigate(`/blogs/${id}`)
            
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return (
        <div>
            <h1>New Blogs:</h1>

            <p>{errorMessage}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type='text'
                        id='name'
                        value={form.name}
                        placeholder='Name'
                        onChange={e => setForm({...form, name: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type='number'
                        id='title'
                        value={form.title}
                        placeholder='title'
                        onChange={e => setForm({...form, title: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="content">Content:</label>
                    <input
                        type='text'
                        id='content'
                        value={form.content}
                        placeholder='content'
                        onChange={e => setForm({...form, content: e.target.value })}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
            <Link to={`/blogs/${id}`}>Go Back</Link>
        </div>
    )
}