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
  const [currentArticle, setCurrentArticle] = useState(null)

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

        window.localStorage.setItem('token', token);

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


  const getArticles = () => {
    setSpinnerOn(true);
    setMessage('');
    axiosWithAuth().get(articlesUrl)
      .then(res => {
        setMessage(res.data.message)
        setArticles(res.data.articles)
      })
      .catch(err => {
        setMessage(err?.response?.data?.message)
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
    return (
    axiosWithAuth()
      .post(articlesUrl, article)
      .then(res => {
        setMessage(res.data.message)
        articles.concat(res.data.article)
      })
      .catch((error) => {
        setMessage(error?.response?.data?.message);
        if (error.response.status === 401) {
          redirectToLogin();
        }
      })
    )
  }

  const updateArticle = ({ article_id, article }) => {
    setSpinnerOn(true);
    setMessage('');
    axios()
    .put(`${articlesUrl}/${article_id}`, article)
    .then((response) => {
      console.log(response.data.articles)
      setMessage(response.data.message );
      setArticles(articles => {
        return articles.map(art => {
          return art.article_id ===article_id ? response.data.article : art
        })
      })
    })
    .catch((error) => {
      setMessage(error?.response?.data?.message || 'Error updating article');
      if (error.response.status === 401) {
        redirectToLogin();
      }
    })
    .finally(() => {
      setSpinnerOn(false)
    })
  }

  const deleteArticle = article_id => {
    setSpinnerOn(true);
    setMessage('');
    axiosWithAuth() 
    .delete(`${articlesUrl}/${article_id}`)
    .then((response) => {
      setMessage(response.data.message);
      // setArticles(articles.id)
      setArticles(articles =>
        articles.filter((article) => article.article_id !== article_id)
      );
    })
    .catch((error) => {
      setMessage(error?.response?.data?.message || 'Error deleting article');
      if (error.response.status === 401) {
        // Handle unauthorized error if needed
        redirectToLogin();
      }
    })
    .finally(() => {
      setSpinnerOn(false)
    })
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
              currentArticleId={currentArticleId}
              currentArticle={currentArticle}
              setCurrentArticle={setCurrentArticle}
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
