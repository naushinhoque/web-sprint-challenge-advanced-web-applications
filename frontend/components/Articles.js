import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import PT from 'prop-types'
import axiosWithAuth from '../axios/index';

export default function Articles(props) {

  const { articles, getArticles, deleteArticle, currentArticleId, setCurrentArticleId, successMessage } = props;
  // console.log(articles);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      return navigate('/');
    } else {
      getArticles();
    }
    console.log("Fetching articles...");
  }, []);

  // const editArticle = (art) => {
  //   setCurrentArticleId(art.article_id)
  //   console.log(articles);
  // }

  return (
    <div className="articles">
      <h2>Articles</h2>
      {articles?.length === 0 ? (
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
              <button disabled={!!currentArticleId} onClick={() => setCurrentArticleId(art.article_id)}>Edit</button>
              <button disabled={!!currentArticleId} onClick={() => deleteArticle(art.article_id)}>Delete</button>
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
