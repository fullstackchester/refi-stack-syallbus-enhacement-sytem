import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from './components/Root'
import Layout, { Container } from './components/Template/Layout'
import { FirebaseProvider } from './js/FirebaseContext'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Subjects from './pages/Subjects/Subjects'
import Curriculum from './pages/Curriculum'
import Files from './pages/Files'
import Faculty from './pages/Faculty'
import { Profile } from './pages/Profile/Profile'
import { ProfileEdit } from './pages/Profile/ProfileEdit'
import NotFound from './pages/404'
import Settings from './pages/Settings'
import { Subject } from './pages/Subjects/Subject'
import { SubjectEdit } from './pages/Subjects/SubjectEdit'

export default function App() {
	return (
		<div className='w-full h-auto'>
			<FirebaseProvider>
				<Router>
					<Routes>
						<Route exact path='/' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/' element={<Layout />} >
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='curriculum' element={<Curriculum />} />
							<Route path='files' element={<Files />} />
							<Route path='faculty' element={<Faculty />} />
							<Route exact path='subjects' element={<Subjects />} />
							<Route exact path='subjects/:id' element={<Subject />} />
							<Route exact path='subjects/:id/edit' element={<SubjectEdit />} />
							<Route path='profile' element={<Profile />} />
							<Route path='edit-profile' element={<ProfileEdit />} />
							<Route path='settings' element={<Settings />} />
						</Route>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</Router>
			</FirebaseProvider>
		</div>
	)
}
