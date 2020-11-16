import React from 'react'

function ourReducer(draft, action) {
	switch (action.type) {
		case 'login':
			draft.loggedIn = true
			draft.user = action.data
			return
		case 'logout':
			draft.loggedIn = false
			return
		case 'flashMessage':
			draft.flashMessages.push(action.value)
			return
		case 'openSearch':
			draft.isSearchOpen = true
			return
		case 'closeSearch':
			draft.isSearchOpen = false
			return
	}
}

export default ourReducer
