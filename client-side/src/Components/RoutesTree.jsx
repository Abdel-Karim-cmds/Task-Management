import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import LayoutWrap from './Layout/LayoutWrap'
import TaskInfo from './Pages/TaskInfo'
function RouteTrees(){
    return(
        <div>
            <LayoutWrap>
                <Routes>
                    <Route path='/' element={<Home/>} > </Route>
                    <Route path='/contact' element={<Contact/>} > </Route>
                    <Route path='/:id/taskInfo' element={<TaskInfo />} />
                </Routes>
            </LayoutWrap>
        </div>
    )
}
export default RouteTrees;