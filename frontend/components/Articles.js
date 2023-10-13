import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'
import axiosWithAuth from '../axios/index';

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
 
  const { articles, getArticles, deleteArticle, setCurrentArticleId, currentArticleId, successMessage } = props;
  console.log(articles);


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return;
    } else {
      const fetchArticles = () => {
        axiosWithAuth()
          .get('/articles')
          .then(res => {
            getArticles(res.data);
          })
          .catch(err => {
            if (err.response && err.response.status === 401 ) {
              localStorage.removeItem('token');
              <Navigate to="/" />
            }
          })
      }
      fetchArticles();
    }
  }, []);

  return (
    <div className="articles">
      <h2>Articles</h2>
      {articles.length === 0 ? (
        'No articles yet'
      ) : (
        articles.map((art) => (
          <div className="article" key={art.article_id}>
            <div>
              <h3>{art.title}</h3>
              <p>{art.text}</p>
              <p>Topic: {art.topic}</p>
            </div>
            <div>
              <button onClick={() => setCurrentArticleId(art.article_id)}>Edit</button>
              <button onClick={() => deleteArticle(art.article_id)}>Delete</button>
            </div>
          </div>
        ))
      )}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
