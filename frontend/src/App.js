import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import RecipeDetails from './pages/RecipeDetails';
import MyRecipeDetails from './pages/MyRecipeDetails';

function App() {
  return (
    <>
      
      <BrowserRouter>
      
        <Routes>
          <Route path='/'></Route>
          <Route path='/dashboard/*' element={<Dashboard/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}/>

          <Route path='/dashboard/recipe/:id' element={<RecipeDetails/>}/>
          <Route path='/dashboard/recipe/my/:id' element={<MyRecipeDetails/>}/> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
