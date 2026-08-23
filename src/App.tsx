import {  RouterProvider } from 'react-router'
import { FirebaseProvider } from 'context/FirebaseContext'
import { ThemeProvider } from '@mui/material/styles';
import router from './router'
import muiThemeOverrides from './shared/ThemeOverrides';

export default function App() {


	return (

		<FirebaseProvider>
			<ThemeProvider theme={muiThemeOverrides}>
				<RouterProvider router={router}></RouterProvider>
			</ThemeProvider>
		</FirebaseProvider>
	)
}
