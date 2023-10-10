import React, { useState, useEffect } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axiosWithAuth from '../axios/index';

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') }
  const redirectToArticles = () => { navigate('/articles') }

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

  const login = async ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage('');
    setSpinnerOn(true);
    // and launch a request to the proper endpoint.
    try {
      const response = await axiosWithAuth.post(loginUrl, { username, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      setMessage('Login successful!');
      getArticles();
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    } finally {
      setSpinnerOn(false);
    };
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
  }

  const getArticles = async () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage('');
    setSpinnerOn(true);
    // and launch an authenticated request to the proper endpoint.
    try {
      const response = await axiosWithAuth.get(articlesUrl);
      setArticles(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        setMessage('Error fetching articles');
      }
    } finally {
      setSpinnerOn(false);
    }
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
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
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
