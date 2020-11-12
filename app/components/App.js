import React, { useEffect, useState, useReducer } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import Header from './Header'
import HomeGuest from './HomeGuest'
import Footer from './Footer'
import About from './About'
import Terms from './Terms'
import Home from './Home'
import CreatePost from './CreatePost'
import ViewSinglePost from './ViewSinglePost'
import FlashMessages from './FlashMessages'
import Profile from './Profile'

import StateContext from '../context/StateContext'
import DispatchContext from '../context/DispatchContext'
import ourReducer from '../reducers/OurReducer'

function App() {
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('complexappToken')),
		flashMessages: [],
		user: {
			token: localStorage.getItem('complexappToken'),
			username: localStorage.getItem('complexappUsername'),
			avatar: localStorage.getItem('complexappAvatar')
		}
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

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Header />
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
						<Route path='/post/:id'>
							<ViewSinglePost />
						</Route>
						<Route path='/about-us'>
							<About />
						</Route>
						<Route path='/terms'>
							<Terms />
						</Route>
					</Switch>

					<Footer />
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

export default App
