import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from './constants/header';
import Footer from './constants/footer';
import { sanitize } from 'dompurify';
import Error from '../Admin/Constants/error';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BlogPage = () => {
  const slug = useParams();
  const slugURL = slug.slug;
  const [blogPage, setBlogPage] = useState([]);
  const [loading, setLoading] = useState(false);

  let API = `http://localhost:8000/${slugURL}`;

  const fetchBlog = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          setLoading(true);
          if (result.data === '') {
            setBlogPage('Notfound');
          } else {
            setBlogPage(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBlog(API);
  }, []);

  const printDate = (date) => {
    return new Date(date).toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={blogPage.metadescription} />
          <title>{blogPage.metatitle}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header />
        {loading ? (
          <div>
            {blogPage === 'Notfound' ? (
              <Error />
            ) : (
              <Container>
              <div className="blogPage">
                <h1>{blogPage.title}</h1>
                <div className="blogpage-img">
                  <img
                    src={`http://localhost:8000/public/uploaded-images/${blogPage.uploadedImage}`}
                    alt="blogimage"
                  />
                </div>
                <p>
                  Last Update On: <b>{printDate(blogPage.updatedAt)}</b> by{' '}
                  {blogPage.author}
                </p>
                <p className="blogBody">{blogPage.description}</p>
                {/* <p>{blogPage.pagecontent}</p> */}
                <div
                  className="container"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(blogPage.pagecontent),
                  }}
                />
                <br />
              </div>
              </Container>
            )}
          </div>
        ) : (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Footer />
      </HelmetProvider>
    </>
  );
};

export default BlogPage;
