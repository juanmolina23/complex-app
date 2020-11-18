import React, { useEffect, useContext, useRef } from 'react'
import { useImmer } from 'use-immer'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
const socket = io('http://localhost:8080')
import StateContext from '../context/StateContext'
import DispatchContext from '../context/DispatchContext'
function Chat() {
	const chatField = useRef(null)
	const chatLog = useRef(null)
	const appState = useContext(StateContext)
	const appDispatch = useContext(DispatchContext)
	const [state, setState] = useImmer({
		fieldValue: '',
		chatMessages: []
	})

	useEffect(() => {
		if (appState.isChatOpen) {
			chatField.current.focus()
			appDispatch({ type: 'clearUnreadChatCount' })
		}
	}, [appState.isChatOpen])

	useEffect(() => {
		socket.on('chatFromServer', message => {
			setState(draft => {
				draft.chatMessages.push(message)
			})
		})
	}, [])

	useEffect(() => {
		chatLog.current.scrollTop = chatLog.current.scrollHeight
		if (state.chatMessages.length && !appState.isChatOpen) {
			appDispatch({ type: 'incrementUnreadChatCount' })
		}
	}, [state.chatMessages])

	function handleFieldChange(e) {
		const value = e.target.value
		setState(draft => {
			draft.fieldValue = value
		})
	}

	function handleSubmit(e) {
		e.preventDefault()

		socket.emit('chatFromBrowser', {
			message: state.fieldValue,
			token: appState.user.token
		})

		setState(draft => {
			draft.chatMessages.push({
				message: draft.fieldValue,
				username: appState.user.username,
				avatar: appState.user.avatar
			})
			draft.fieldValue = ''
		})
	}

	return (
		<div
			id='chat-wrapper'
			className={
				'chat-wrapper shadow border-top border-left border-right ' +
				(appState.isChatOpen ? 'chat-wrapper--is-visible' : '')
			}
		>
			<div className='chat-title-bar bg-primary'>
				Chat
				<span
					onClick={() => appDispatch({ type: 'closeChat' })}
					className='chat-title-bar-close'
				>
					<i className='fas fa-times-circle'></i>
				</span>
			</div>
			<div id='chat' className='chat-log' ref={chatLog}>
				{state.chatMessages.map((message, index) => {
					if (message.username == appState.user.username) {
						return (
							<div className='chat-self' key={index}>
								<div className='chat-message'>
									<div className='chat-message-inner'>{message.message}</div>
								</div>
								<img className='chat-avatar avatar-tiny' src={message.avatar} />
							</div>
						)
					}

					return (
						<div className='chat-other' key={index}>
							<Link to={`/profile/${message.username}`}>
								<img className='avatar-tiny' src={message.avatar} />
							</Link>
							<div className='chat-message'>
								<div className='chat-message-inner'>
									<Link to={`/profile/${message.username}`}>
										<strong>{message.username}:</strong>
									</Link>
									{' ' + message.message}
								</div>
							</div>
						</div>
					)
				})}
			</div>
			<form
				onSubmit={e => handleSubmit(e)}
				id='chatForm'
				className='chat-form border-top'
			>
				<input
					ref={chatField}
					onChange={e => handleFieldChange(e)}
					value={state.fieldValue}
					type='text'
					className='chat-field'
					id='chatField'
					placeholder='Type a message…'
					autoComplete='off'
				/>
			</form>
		</div>
	)
}

export default Chat
