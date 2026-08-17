import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from 'components/Template/Layout'
import { FirebaseProvider } from 'context/FirebaseContext'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import Subjects from 'pages/Subjects/Subjects'
import Files from 'pages/Files/Files'
import Faculty from 'pages/Faculty/Faculty'
import { Profile } from 'pages/Profile/Profile'
import NotFound from 'pages/404'
import Settings from 'pages/Settings'
import { Subject } from 'pages/Subjects/Subject'
import SubjectEdit from 'pages/Subjects/SubjectEdit'
import { SubjectAdd } from 'pages/Subjects/SubjectAdd'
import FacultyAccount from 'pages/Faculty/FacultyAccount'
import Posts from 'pages/Syllabus/Posts'
import ViewPost from 'pages/Syllabus/ViewPost'
import FacultyEdit from 'pages/Faculty/FacultyEdit'
import ViewFile from 'pages/Files/ViewFile'
import EditFile from 'pages/Files/EditFile'
import DisplayInformation from 'pages/Profile/DisplayInformation'
import Authentication from 'pages/Profile/Authentication'
import Information from 'pages/Syllabus/Information'
import Comments from 'pages/Syllabus/Comments'
import History from 'pages/Syllabus/History'
import FacultyProfile from 'pages/Faculty/FacultyProfile'
import FacultySyllabus from 'pages/Faculty/FacultySyllabus'
import FileInfo from 'pages/Files/FileInfo'
import FileComments from 'pages/Files/FileComment'
import FileHistory from 'pages/Files/FileHistory'
import FileAdd from 'pages/Files/FileAdd'
import Dashboard from 'pages/Dashboard/Dashboard'
import ProtectedRoute from 'components/ProtectedRoute'
import Restrcited from 'components/Restrcited'
import SubjectInfo from 'pages/Subjects/SubjectInfo'
import SubjectFiles from 'pages/Subjects/SubjectFiles'

export default function App() {


	return (

		<FirebaseProvider>
			<div className='w-full h-auto bg-gray-300/40'>
				<Router>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/' element={
							<ProtectedRoute>
								<Layout />
							</ProtectedRoute>
						} >
							<Route path='/reports' element={
								<Restrcited>
									<Dashboard />
								</Restrcited>
							} />

							<Route path='/posts' element={<Posts />} />
							<Route path='posts/create-post' element={<FileAdd />} />
							<Route path='posts/:postId' element={<ViewPost />} >
								<Route index element={<Information />} />
								<Route path='information' element={<Information />} />
								<Route path='comments' element={<Comments />} />
								<Route path='edit-history' element={<History />} />
							</Route>

							<Route path='faculty' element={<Faculty />} />
							<Route path='faculty/:uid' element={<FacultyAccount />} >
								<Route index element={<FacultyProfile />} />
								<Route path='profile' element={<FacultyProfile />} />
								<Route path='syllabus' element={<FacultySyllabus />} />
							</Route>
							<Route path='faculty/edit/:id' element={<FacultyEdit />} />

							<Route path='subjects' element={<Subjects />} />
							<Route path='subjects/add' element={<SubjectAdd />} />
							<Route path='subjects/:id' element={<Subject />} >
								<Route index element={<FacultyProfile />} />
								<Route path='information' element={<SubjectInfo />} />
								<Route path='files' element={<SubjectFiles />} />
							</Route>
							<Route path='subjects/:id/edit' element={<SubjectEdit />} />

							<Route path='files' element={<Files />} />
							<Route path='files/create-post' element={<FileAdd />} />
							<Route path='files/edit-post/:postId' element={<EditFile />} />
							<Route path='files/:id' element={<ViewFile />} >
								<Route index element={<FileInfo />} />
								<Route path='information' element={<FileInfo />} />
								<Route path='comments' element={<FileComments />} />
								<Route path='edit-history' element={<FileHistory />} />
							</Route>

							<Route path='profile' element={<Profile />}>
								<Route index element={<DisplayInformation />} />
								<Route path='display-information' element={<DisplayInformation />} />
								<Route path='security' element={<Authentication />} />
							</Route>

							<Route path='settings' element={<Settings />} />
						</Route>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</Router>
			</div>

		</FirebaseProvider>
	)
}
