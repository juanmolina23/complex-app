import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import LoadingDotsIcon from './LoadingDotsIcon'

import StateContext from '../context/StateContext'

function ProfileFollow(props) {
	const [isLoading, setIsLoading] = useState(true)
	const [follow, setFollow] = useState([])
	const { username } = useParams()
	const appState = useContext(StateContext)

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source()

		async function fetchPosts() {
			try {
				const response = await Axios.get(
					`/profile/${username}/${props.action}`,
					{
						cancelToken: ourRequest.token
					}
				)
				setFollow(response.data)
				setIsLoading(false)
			} catch (error) {
				console.log('There was a problem', error)
			}
		}
		fetchPosts()
		return () => {
			ourRequest.cancel()
		}
	}, [username])

	if (isLoading) return <LoadingDotsIcon />

	if (follow.length == 0) {
		if (appState.user.username == username) {
			if (props.action == 'followers') {
				return <p>You do not have any followers, yet.</p>
			} else if (props.action == 'following') {
				return <p>You are not following anyone, yet.</p>
			}
		} else if (appState.user.username != username) {
			if (props.action == 'followers') {
				return <p>This user does not have any followers, yet. Be the first!</p>
			} else if (props.action == 'following') {
				return <p>This user is not following anyone, yet.</p>
			}
		}
	}

	return (
		<div className='list-group'>
			{follow.map((follower, index) => {
				return (
					<Link
						to={`/profile/${follower.username}`}
						key={index}
						className='list-group-item list-group-item-action'
					>
						<img className='avatar-tiny' src={follower.avatar} />{' '}
						{follower.username}
					</Link>
				)
			})}
		</div>
	)
}

export default ProfileFollow
