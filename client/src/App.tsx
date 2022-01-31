import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import ChooseEntity from './components/ChooseEntity/ChooseEntity';
import EntityList from './components/EntityList/EntityList';
import EntityView from './components/EntityView/EntityView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/entities" element={<ChooseEntity />} />
        <Route path="/list/:type" element={<EntityList />} />
        <Route path="/view/:id" element={<EntityView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
