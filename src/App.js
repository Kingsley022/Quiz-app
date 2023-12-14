import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import { useEffect } from 'react';
import Home from './pages/home';
import Board from './pages/dashboard/board/board';
import Account from './pages/dashboard/account/account';
import Messages from './pages/dashboard/message/message';
import Favorite from './pages/dashboard/favorite/favorite';
import Analytics from './pages/dashboard/analytics/analytics';
import Setting from './pages/dashboard/settings/setting';
import CreateQuiz from './pages/dashboard/create-quiz/createQuiz';
import Authentication from './pages/authentication/authentication';
import SignOut from './pages/dashboard/signOut/signOut';
import Quiz from './pages/quiz/quiz';
import PrivateRoute1 from './common/privateRoute1';
import PrivateRoute2 from './common/privateRoute2';
import { jwtDecode } from 'jwt-decode';

export const AppContext = createContext();

function App() {
  const client = new QueryClient();
  const[user, setUser] = useState();

  // Mounts the user Details
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("quizzyToken"));
    if (userToken) {
      const userDetails = jwtDecode(userToken);
      setUser(userDetails?.user);
    }
  },[]);

  return (
    <AppContext.Provider value={{user, setUser}}>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/dashboard' element={<Board/>}/>
              {/* <Route path='/dashboard' element={<PrivateRoute1/>}>
                <Route index element={<Board/>} />
              </Route> */}

              <Route path='/dashboard/account' element={<PrivateRoute1/>}>
                <Route index element={<Account/>}  />
              </Route>

              <Route path='/dashboard/messages' element={<PrivateRoute1/>}>
                <Route index element={<Messages/>}/>
              </Route>
              {/* <Route path='/dashboard/messages' element={<Messages/>}/> */}

              <Route path='/dashboard/favorites' element={<PrivateRoute1/>}>
                <Route index element={<Favorite/>}/>
              </Route>

              <Route path='/dashboard/analytics' element={<PrivateRoute1/>}>
                <Route index element={<Analytics/>}/>
              </Route>

              <Route path='/dashboard/setting' element={<PrivateRoute1/>}>
                <Route index element={<Setting/>}/>
              </Route>
              
              <Route path='/user/new-quiz' element={<PrivateRoute1/>}>
                <Route index element={<CreateQuiz/>}/>
              </Route>

              <Route path='/signOut' element={<PrivateRoute1/>}>
                <Route index element={<SignOut/>}/>
              </Route>

              <Route path='/auth' element={<PrivateRoute2/>}>
                <Route index element={<Authentication/>}/>
              </Route>
              
              <Route path='/quiz' element={<Quiz/>}/>

              <Route path='*' element={<h3>Not Found</h3>}/>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
    </AppContext.Provider>
    
  );
}

export default App;
