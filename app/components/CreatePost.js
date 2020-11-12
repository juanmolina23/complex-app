import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import Page from './Page'

function CreatePost() {
	const history = useHistory()
	const [title, setTitle] = useState()
	const [body, setBody] = useState()
	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await Axios.post('/create-post', {
				token: localStorage.getItem('complexappToken'),
				title,
				body
			})
			//Redirect to new post URL
			history.push(`/post/${response.data}`)
		} catch (error) {
			console.log('There was an error.', error)
		}
	}

	return (
		<Page title='Create New Post'>
			<div className='container container--narrow py-md-5'>
				<form onSubmit={e => handleSubmit(e)}>
					<div className='form-group'>
						<label htmlFor='post-title' className='text-muted mb-1'>
							<small>Title</small>
						</label>
						<input
							onChange={e => setTitle(e.target.value)}
							autoFocus
							name='title'
							id='post-title'
							className='form-control form-control-lg form-control-title'
							type='text'
							placeholder=''
							autoComplete='off'
						/>
					</div>

					<div className='form-group'>
						<label htmlFor='post-body' className='text-muted mb-1 d-block'>
							<small>Body Content</small>
						</label>
						<textarea
							onChange={e => setBody(e.target.value)}
							name='body'
							id='post-body'
							className='body-content tall-textarea form-control'
							type='text'
						></textarea>
					</div>

					<button className='btn btn-primary'>Save New Post</button>
				</form>
			</div>
		</Page>
	)
}

export default CreatePost
