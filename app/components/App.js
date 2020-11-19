import React, { useEffect, useState, useReducer, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import { CSSTransition } from 'react-transition-group'
import Axios from 'axios'

import Header from './Header'
import HomeGuest from './HomeGuest'
import Footer from './Footer'
import About from './About'
import Terms from './Terms'
import Home from './Home'
const CreatePost = React.lazy(() => import('./CreatePost'))
const ViewSinglePost = React.lazy(() => import('./ViewSinglePost'))
const Search = React.lazy(() => import('./Search'))
const Chat = React.lazy(() => import('./Chat'))

import FlashMessages from './FlashMessages'
import Profile from './Profile'
import EditPost from './EditPost'
import NotFound from './NotFound'
import StateContext from '../context/StateContext'
import DispatchContext from '../context/DispatchContext'
import ourReducer from '../reducers/OurReducer'
import LoadingDotsIcon from './LoadingDotsIcon'

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('complexappToken')),
		flashMessages: [],
		user: {
			token: localStorage.getItem('complexappToken'),
			username: localStorage.getItem('complexappUsername'),
			avatar: localStorage.getItem('complexappAvatar')
		},
		isSearchOpen: false,
		isChatOpen: false,
		unreadChatCount: 0
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState)

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('complexappToken', state.user.token)
			localStorage.setItem('complexappUsername', state.user.username)
			localStorage.setItem('complexappAvatar', state.user.avatar)
		} else {
			localStorage.clear()
		}
	}, [state.loggedIn])

	//Check if token has expired on first render
	useEffect(() => {
		if (state.loggedIn) {
			const ourRequest = Axios.CancelToken.source()
			async function fetchResults() {
				try {
					const response = await Axios.post(
						`/checkToken`,
						{ token: state.user.token },
						{ cancelToken: ourRequest.token }
					)
					if (!response.data) {
						dispatch({ type: 'logout' })
						dispatch({
							type: 'flashMessage',
							value: 'Your session has expired. Please log in again'
						})
					}
				} catch (error) {
					console.log('There was a problem or the request was cancelled', error)
				}
			}
			fetchResults()
			return () => ourRequest.cancel()
		}
	}, [])

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
					<Suspense fallback={<LoadingDotsIcon />}>
						<Switch>
							<Route path='/profile/:username'>
								<Profile />
							</Route>
							<Route path='/' exact>
								{state.loggedIn ? <Home /> : <HomeGuest />}
							</Route>
							<Route path='/create-post'>
								<CreatePost />
							</Route>
							<Route path='/post/:id' exact>
								<ViewSinglePost />
							</Route>
							<Route path='/post/:id/edit' exact>
								<EditPost />
							</Route>
							<Route path='/about-us'>
								<About />
							</Route>
							<Route path='/terms'>
								<Terms />
							</Route>
							<Route>
								<NotFound />
							</Route>
						</Switch>
					</Suspense>
					<CSSTransition
						timeout={330}
						in={state.isSearchOpen}
						classNames='search-overlay'
						unmountOnExit
					>
						<div className='search-overlay'>
							<Suspense fallback=''>
								<Search />
							</Suspense>
						</div>
					</CSSTransition>
					<Suspense fallback=''>{state.loggedIn && <Chat />}</Suspense>
					<Footer />
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

export default App
