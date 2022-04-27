import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Template/Layout'
import { FirebaseProvider } from './js/FirebaseContext'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Subjects from './pages/Subjects/Subjects'
import Files from './pages/Files/Files'
import Faculty from './pages/Faculty/Faculty'
import { Profile } from './pages/Profile/Profile'
import { ProfileEdit } from './pages/Profile/ProfileEdit'
import NotFound from './pages/404'
import Settings from './pages/Settings'
import { Subject } from './pages/Subjects/Subject'
import SubjectEdit from './pages/Subjects/SubjectEdit'
import { SubjectAdd } from './pages/Subjects/SubjectAdd'
import FacultyAccount from './pages/Faculty/FacultyAccount'
import Posts from './pages/Syllabus/Posts'
import CreatePost from './pages/Syllabus/CreatePost'
import ViewPost from './pages/Syllabus/ViewPost'
import FacultyEdit from './pages/Faculty/FacultyEdit'
import ViewFile from './pages/Files/ViewFile'
import EditFile from './pages/Files/EditFile'

export default function App() {
	return (
		<div className='w-full h-auto bg-gray-300/40'>
			<FirebaseProvider>
				<Router>
					<Routes>
						<Route exact path='/' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/' element={<Layout />} >
							<Route exact path='dashboard' element={<Dashboard />} />
							<Route path='posts' element={<Posts />} />
							<Route path='posts/create-post' element={<CreatePost />} />
							<Route path='posts/:postId' element={<ViewPost />} />

							<Route exact path='files' element={<Files />} />
							<Route exact path='files/:id' element={<ViewFile />} />
							<Route exact path='files/edit/:id' element={<EditFile />} />

							<Route exact path='faculty' element={<Faculty />} />
							<Route exact path='faculty/:id' element={<FacultyAccount />} />
							<Route exact path='faculty/edit/:id' element={<FacultyEdit />} />

							<Route exact path='subjects' element={<Subjects />} />
							<Route exact path='subjects/add' element={<SubjectAdd />} />
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
