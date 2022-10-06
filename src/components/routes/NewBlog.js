import { useNavigate } from 'react-router-dom' 
import { useState } from 'react'
import axios from 'axios'

export default function NewBlog(){
    const [form, setForm] = useState({
        name: '',
        title: 0,
        content: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()


    const handleSubmit = async e => {
        try {
            e.preventDefault()
            // post form data to the backend API
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blog`, form)
            // navigate back to /bounties to see the new bounty
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
        </div>
    )
}