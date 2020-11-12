import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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

function App() {
	const [loggedIn, setLoggedIn] = useState(
		Boolean(localStorage.getItem('complexappToken'))
	)
	return (
		<BrowserRouter>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Switch>
				<Route path='/' exact>
					{loggedIn ? <Home /> : <HomeGuest />}
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
	)
}

export default App
