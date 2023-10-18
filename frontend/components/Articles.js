import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'
import axiosWithAuth from '../axios/index';

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
 
  const { articles, getArticles, deleteArticle, setCurrentArticleId, successMessage } = props;
  // console.log(articles);


  useEffect(() => {
    // if (!localStorage.getItem('token')) {
    //   return;
    // } else {
        // getArticles();
  // }
  console.log("Fetching articles...");
  getArticles()
    // .then((data) => {
    //   console.log("Articles data received:", data);
    // })
    // .catch((error) => {
    //   console.error("Error fetching articles:", error);
    // });
    }, []);
    
  const editArticle = (art) => {
    setCurrentArticleId(art.article_id)
    console.log(articles);
  }

  console.log(articles);
  // return (
  //   <div className="articles">
  //     <h2>Articles</h2>
  //     {articles.length === 0 ? (
  //       'No articles yet'
  //     ) : (
  //       articles.map((art) => (
  //         <div className="article" key={art.article_id}>
  //           <div>
  //             <h3>{art.title}</h3>
  //             <p>{art.text}</p>
  //             <p>Topic: {art.topic}</p>
  //           </div>
  //           <div>
  //             <button onClick={() => {setCurrentArticleId(art.article_id)
              
  //             }}>Edit</button>
  //             <button onClick={() => deleteArticle(art.article_id)}>Delete</button>
  //           </div>
  //         </div>
  //       ))
  //     )}
  //     {successMessage && <p>{successMessage}</p>}
  //   </div>
  // );
  const articlesExist = Array.isArray(articles) && articles.length > 0;

  return (
    <div className="articles">
      <h2>Articles</h2>
      {articlesExist ? (
        articles.map((art) => (
          <div className="article" key={art.article_id}>
            <div>
              <h3>{art.title}</h3>
              <p>{art.text}</p>
              <p>Topic: {art.topic}</p>
            </div>
            <div>
              <button onClick={() => { setCurrentArticleId(art.article_id) }}>Edit</button>
              <button onClick={() => deleteArticle(art.article_id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        'No articles yet'
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
