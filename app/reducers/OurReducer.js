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
	}
}

export default ourReducer
