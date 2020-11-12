import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import HomeGuest from './HomeGuest'
import Footer from './Footer'
import About from './About'
import Terms from './Terms'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path='/' exact>
					<HomeGuest />
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
