import React from 'react'
import Main from './components/Main'
// import Login from './components/Login'
import NoRecordFound from './components/NoRecordFound'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<React.Fragment>
			<div className="flex flex-col justify-center items-center">
				<main className="w-11/12 lg:w-1/2">
					<Routes>
						{/* <Route path="/login/:uId" element={<Login />} /> */}
						<Route path="/visa-requirements/:uId" element={<Main />} />
						<Route path="*" element={<NoRecordFound />} />
					</Routes>
				</main>
			</div>
		</React.Fragment>
	)
}

export default App
