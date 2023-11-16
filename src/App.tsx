import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { useEffect } from "react"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import { setTheme } from "./data/userSettings/userSettings"
import RootLayout from "./layout/RootLayout"
import Notes from "./components/notes&components/sidebar/fileSystem/FileSystemSection"
import NotesLayout from "./layout/NotesLayout"
import FontLibraryPage from "./pages/fontLibrary/FontLibraryPage"
import BlueprintsPage from "./pages/selection/BlueprintsPage"
import ImageManagerPage from "./pages/selection/ImageManagerPage"
import SettingsPage from "./pages/selection/SettingsPage"
import ToDoPage from "./pages/selection/ToDoPage"
import WhiteBoardPage from "./pages/selection/WhiteBoardPage"
import SvgLibraryPage from "./pages/svgLibrary/SvgLibraryPage"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="root" element={<MainLayout/>}>
            <Route path="storage" element={<NotesLayout/>}>
                <Route path=":id" element={<Notes/>}/>
                {/* <Route path=":id" element={<>notes</>}/> */}
            </Route>
            <Route path="whiteboard" element={<WhiteBoardPage/>}/>
            <Route path="toDos" element={<ToDoPage/>}/>
            <Route path="svgLibrary" element={<SvgLibraryPage/>}/>
            <Route path="fontLibrary" element={<FontLibraryPage/>} />
            <Route path="imageManager" element={<ImageManagerPage/>}/>
            <Route path="settings" element={<SettingsPage/>}/>
            <Route path="blueprints" element={<BlueprintsPage/>}/>
        </Route>
    </Route>
))

function App() {
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [])
    return (
            <RouterProvider router={router} fallbackElement={<>loading hole app</>}/>
    )
}

export default App