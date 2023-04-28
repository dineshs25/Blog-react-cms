import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css';
import Error from './components/Admin/Constants/error';

// Admin Panel Components
// import Admin from './components/Admin/admin';

// import Blog from './components/Admin/blog';
// import BlogEdit from './components/Admin/blogedit';
// import Compose from './components/Admin/compose';

// Frontend Components
// import Home from './components/frontend/home';
// import BlogPage from './components/frontend/blogPage';

// import Header from "./components/Admin/Constants/header";

import Loading from './components/loading';

// Admin Panel Components
const Admin = React.lazy(() => import('./components/Admin/admin'));
const Blog = React.lazy(() => import('./components/Admin/blog'));
const BlogEdit = React.lazy(() => import('./components/Admin/blogedit'));
const Compose = React.lazy(() => import('./components/Admin/compose'));

// Frontend Components
const Home = React.lazy(() => import('./components/frontend/home'));
const BlogPage = React.lazy(() => import('./components/frontend/blogPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Panel Routes */}
        <Route path="*" element={<Error />} />
        <Route
          path="/admin"
          exact
          element={
            <React.Suspense fallback=<Loading />>
              <Admin />
            </React.Suspense>
          }
        />
        <Route
          path="/admin/:publish"
          exact
          element={
            <React.Suspense fallback=<Loading />>
              <Blog />
            </React.Suspense>
          }
        />
        <Route
          path="/admin/blog/edit/:id"
          exact
          element={
            <React.Suspense fallback=<Loading />>
              <BlogEdit />
            </React.Suspense>
          }
        />
        <Route
          path="/admin/compose"
          exact
          element={
            <React.Suspense fallback=<Loading />>
              <Compose />
            </React.Suspense>
          }
        />

        {/* Frontend Routes */}
        <Route
          path="/"
          exact
          element={
            <React.Suspense fallback=<Loading />>
              <Home />
            </React.Suspense>
          }
        />
       
        <Route
          path="/:slug"
          exact
          element={
            <React.Suspense fallback=<Loading />>
              <BlogPage />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
