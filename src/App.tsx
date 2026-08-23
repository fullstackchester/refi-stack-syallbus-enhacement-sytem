import {  RouterProvider } from 'react-router'
import { FirebaseProvider } from 'context/FirebaseContext'
import router from './router'

export default function App() {


	return (

		<FirebaseProvider>
			{/* <div className='w-full h-auto bg-gray-300/40'> */}
				<RouterProvider router={router}></RouterProvider>
			{/* </div> */}
		</FirebaseProvider>
	)
}
