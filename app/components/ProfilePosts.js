import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import LoadingDotsIcon from './LoadingDotsIcon'

function ProfilePosts() {
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const { username } = useParams()

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()

		async function fetchPosts() {
			try {
				const response = await Axios.get(`/profile/${username}/posts`, {
					cancelToken: ourRequest.token
				})
				setPosts(response.data)
				setIsLoading(false)
			} catch (error) {
				console.log('There was a problem', error)
			}
		}
		fetchPosts()
		return () => {
			ourRequest.cancel()
		}
	}, [])

	if (isLoading) return <LoadingDotsIcon />

	return (
		<div className='list-group'>
			{posts.map(post => {
				const date = new Date(post.createdDate)
				const dateFormatted = `${
					date.getMonth() + 1
				}/${date.getDay()}/${date.getFullYear()}`
				return (
					<Link
						to={`/post/${post._id}`}
						key={post._id}
						className='list-group-item list-group-item-action'
					>
						<img className='avatar-tiny' src={post.author.avatar} />{' '}
						<strong>{post.title}</strong>{' '}
						<span className='text-muted small'>on {dateFormatted}</span>
					</Link>
				)
			})}
		</div>
	)
}

export default ProfilePosts
