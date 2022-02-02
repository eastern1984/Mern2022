import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './components/Login/Login';
import ChooseEntity from './components/ChooseEntity/ChooseEntity';
import EntityList from './components/EntityList/EntityList';
import EntityView from './components/EntityView/EntityView';
import { EmailContext, Layout } from './components/hoc/Layout';

function App() {
  const { email } = useContext(EmailContext);

  return (
    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path="/" element={<Login />} />
          {!email && <Route
            path="*"
            element={<Navigate to="/" />}
          />}
          <Route path="/entities" element={<ChooseEntity />} />
          <Route path="/list/:type" element={<EntityList />} />
          <Route path="/view/:id" element={<EntityView />} />
        </Routes>
      </Layout >
    </BrowserRouter>
  );
}

export default App;
