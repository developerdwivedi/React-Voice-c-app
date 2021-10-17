import React, {  useState, useEffect } from 'react';
// import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
// import useStyles from './components/NewsCards/styles';
import useStyles from './styles.js';



const alankey = '424de5be401371bda114bff83843012d2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  // const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const [activeArticle, setActiveArticle] =  useState (-1);
  const classes = useStyles();


    useEffect(() => {
       alanBtn({
         key: alankey,
         onCommand: ({ command, articles, number }) => {
           if(command === 'newHeadlines') {
               setNewsArticles(articles);
               setActiveArticle(-1);
           } else if(command === 'highlight') {
             setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
           } else if(command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true}) : number;
              const articles = articles[parsedNumber - 1];

              if(parsedNumber > 20) {
                alanBtn().playText('Please try that again.')
              } else if(articles) {

                  window.open(articles.url, '-blank');
                  alanBtn().playText('Opening...');

              }
           }
         }
       })
    }, [])

    return (
      <div>
        <div className={classes.logoContainer}>

            <img src="https://repository-images.githubusercontent.com/217049587/3e07cd00-fa7f-11e9-86bd-123b47b846c9" className={classes.alanLogo} alt="logo" />
        </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
    );
}

export default App;
