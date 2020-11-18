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
		case 'toggleChat':
			draft.isChatOpen = !draft.isChatOpen
			return
		case 'closeChat':
			draft.isChatOpen = false
			return
		case 'incrementUnreadChatCount':
			draft.unreadChatCount++
			return
		case 'clearUnreadChatCount':
			draft.unreadChatCount = 0
			return
	}
}

export default ourReducer
