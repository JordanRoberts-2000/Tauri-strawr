import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./HomePage/Home"
import NotesLayout from "./components&Notes/NotesLayout"
import RootLayout from "./RootLayout"
import Notes from "./components&Notes/sidebar/fileSystem/Notes"
import ToDoPage from "./toDo/ToDoPage"
import SvgLibrary from "./svgLibrary/SvgLibrary"
import TitleBar from "./TitleBar"
import WhiteBoard from "./whiteboard/WhiteBoard"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<TitleBar/>}>
        <Route index element={<Home/>}/>
        <Route path="root" element={<RootLayout/>}>
            <Route path="storage" element={<NotesLayout/>}>
                <Route path=":id" element={<Notes/>}/>
            </Route>
            <Route path="whiteboard" element={<WhiteBoard/>}/>
            <Route path="toDo" element={<ToDoPage/>}/>
            <Route path="svgLibrary" element={<SvgLibrary/>}/>
        </Route>
    </Route>
))

function App() {
  return (
        <RouterProvider router={router}/>
  )
}

export default App