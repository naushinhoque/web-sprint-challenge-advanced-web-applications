import React, { useState, useEffect } from 'react'
import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axiosWithAuth from '../axios/index'



const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () =>  navigate('/') 
  const redirectToArticles = () =>  navigate('/articles') 

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    localStorage.removeItem('token');
    // and a message saying "Goodbye!" should be set in its proper state.
    setMessage('Goodbye!')
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    redirectToLogin();
  }

  const login = (username, password) => {
    setSpinnerOn(true);
    setMessage('');
    axiosWithAuth()
      .post(loginUrl, { username, password })
      .then(res => {
        const { token } = res.data;

        localStorage.setItem('token', token);

        setMessage(res.data.message)
        setIsAuthenticated(true);
        redirectToArticles();
      })
      .catch(err => {
        setMessage(err.data.message)
      })
      .finally(() => {
        setSpinnerOn(false);
      })
  }

  // const login = async ( username, password ) => {
  //   // ✨ implement
  //   // We should flush the message state, turn on the spinner
  //   setMessage('');
  //   setSpinnerOn(true);
  //   console.log(username, password);

  //   // and launch a request to the proper endpoint.
  //   try {
  //     const response = await axiosWithAuth().post(loginUrl, { username, password });
  //     const { token } = response.data;
      
  //     console.log(token);

  //     localStorage.setItem('token', token);

  //     setMessage('Login successful!');
  //     setIsAuthenticated(true); // Set user as authenticated
  //     redirectToArticles();
  //   } catch (error) {
  //     console.log(error);
  //     setMessage('Login failed. Please check your credentials.');
  //   } finally {
  //     setSpinnerOn(false);
  //   };
  //   // On success, we should set the token to local storage in a 'token' key,
  //   // put the server success message in its proper state, and redirect
  //   // to the Articles screen. Don't forget to turn off the spinner!
  // }

  // const getArticles = async () => {
  //   // ✨ implement
  //   // We should flush the message state, turn on the spinner
  //   setMessage('');
  //   setSpinnerOn(true);
  //   // and launch an authenticated request to the proper endpoint.
  //   try {
  //     const response = await axiosWithAuth.get(articlesUrl);
  //     setArticles(response.data);
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       logout();
  //     } else {
  //       setMessage('Error fetching articles');
  //     }
  //   } finally {
  //     setSpinnerOn(false);
  //   }
  //   // On success, we should set the articles in their proper state and
  //   // put the server success message in its proper state.
  //   // If something goes wrong, check the status of the response:
  //   // if it's a 401 the token might have gone bad, and we should redirect to login.
  //   // Don't forget to turn off the spinner!
  // }
  const getArticles = () => {
    setSpinnerOn(true);
    setMessage('');
    axios().get(articlesUrl)
      .then(res => {
        setMessage(res.data.message)
        setArticles(res.data.articles)
      })
      .catch(err => {
        setMessage(err?.response?.data?.message || 'Something bad happened')
        if (err.response.status === 401) {
          redirectToLogin()
        }
      })
      .finally(() => {
        setSpinnerOn(false)
      })
  };


  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setSpinnerOn(true);
    setMessage('');
    axios()
      .post(articlesUrl, article)
      .then(res => {
        setMessage(res.data.message)
      })
      .catch((error) => {
        setMessage(error?.response?.data?.message || 'Error posting article');
        if (error.response.status === 401) {
          // Handle unauthorized error if needed
          redirectToLogin();
        }
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  setSpinnerOn(true);
  setMessage('');

  axios()
    .put(`${articlesUrl}/${article_id}`, article)
    .then((response) => {
      // Assuming the response contains a success message or updated article data
      setMessage(response.data.message || 'Article updated successfully');
      // If you need to do something with the updated article data, you can use it here
    })
    .catch((error) => {
      setMessage(error?.response?.data?.message || 'Error updating article');
      if (error.response.status === 401) {
        // Handle unauthorized error if needed
        redirectToLogin();
      }
    })
    .finally(() => {
      setSpinnerOn(false);
    });
  }

  const deleteArticle = article_id => {
    // ✨ implement\
    axios()
    .delete(`${articlesUrl}/${article_id}`)
    .then((response) => {
      // Assuming the response contains a success message
      setMessage(response.data.message || 'Article deleted successfully');
      // If you need to perform additional actions upon successful deletion, you can do it here
    })
    .catch((error) => {
      setMessage(error?.response?.data?.message || 'Error deleting article');
      if (error.response.status === 401) {
        // Handle unauthorized error if needed
        redirectToLogin();
      }
    })
    .finally(() => {
      setSpinnerOn(false);
    });
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} setMessage={setMessage}/>} />
          <Route path="articles" element={
            isAuthenticated ? (
            <>
            
              <ArticleForm 
              postArticle={postArticle}
              updateArticle={updateArticle}
              setCurrentArticleId={setCurrentArticleId}
              />
              <Articles 
              articles={articles}
              getArticles={getArticles}
              deleteArticle={deleteArticle}
              setCurrentArticleId={setCurrentArticleId}
              currentArticleId={currentArticleId}
              successMessage={message}
              />
            </>
            ) : (
              <Navigate to="/" />
            )
          } 
          />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
