/* eslint-disable no-inner-declarations */
/* eslint-disable semi */
/* eslint-disable indent */
{
    'use strict';
    
    // document.getElementById('test-button').addEventListener('click', function(){const links = document.querySelectorAll('.titles a'); console.log('links: ', links);});
    
    const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;
        // console.log('Link was clicked!');
      
        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }
    
        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        // console.log('clickedElement:', clickedElement);
      
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.post');
        for (let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }
        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        // console.log(articleSelector);
      
        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        // console.log(targetArticle);
    
        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';

    function generateTitleLinks(customSelector = ''){

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        let html = '';
        for (let article of articles) {
            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
 
            /* insert link into titleList */
            // titleList.innerHTML = titleList.innerHTML + linkHTML;
            // [EXERCISE] titleList.insertAdjacentHTML("beforeend", linkHTML);
            html = html + linkHTML;
        }
        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');
        for(let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }
    generateTitleLinks();

    function generateTags(){
        const articles = document.querySelectorAll(optArticleSelector); /* find all articles */
        // console.log(articles);
      
        for (let article of articles) { /* START LOOP: for every article: */
            
            const tagsWrapper = article.querySelector(optArticleTagSelector); /* find tags wrapper */
            // console.log(tagsWrapper);

            let html = ''; /* make html variable with empty string */
            
            const articleTags = article.getAttribute('data-tags'); /* get tags from data-tags attribute */
            // console.log(articleTags);
      
            const articleTagsArray = articleTags.split(' '); /* split tags into array */
            // console.log(articleTagsArray);
            // console.log(typeof articleTagsArray);
      
            for (let tag of articleTagsArray) { /* START LOOP: for each tag */
                // console.log(tag);
                
                const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; /* generate HTML of the link */
                // console.log(tagHTML);

                html += tagHTML /* add generated code to html variable */

            } /* END LOOP: for each tag */

            tagsWrapper.innerHTML = html;/* insert HTML of all the links into the tags wrapper */     
        } /* END LOOP: for every article: */
      }
      
    generateTags();

    function tagClickHandler(event){
        event.preventDefault(); /* prevent default action for this event */
        const clickedElement = this; /* make new constant named "clickedElement" and give it the value of "this" */
        const href = clickedElement.getAttribute('href'); /* make a new constant "href" and read the attribute "href" of the clicked element */
        const tag = href.replace('#tag-', ''); /* make a new constant "tag" and extract tag from the "href" constant */
        const allActiveTagLinks = document.querySelectorAll('a.active[href^="#tag-"]'); /* find all tag links with class active */
        for(let activeTagLink of allActiveTagLinks){ /* START LOOP: for each active tag link */
            activeTagLink.classList.remove('active'); /* remove class active */
        } /* END LOOP: for each active tag link */
        const allTagLinks = document.querySelectorAll('a[href="' + href + '"]'); /* find all tag links with "href" attribute equal to the "href" constant */
        for(let tagLink of allTagLinks){ /* START LOOP: for each found tag link */
            tagLink.classList.add('active'); /* add class active */
        } /* END LOOP: for each found tag link */
        generateTitleLinks('[data-tags~="' + tag + '"]'); /* execute function "generateTitleLinks" with article selector as argument */
      }
      
      function addClickListenersToTags(){
        const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]'); /* find all links to tags */
        for(let tagLink of allTagsLinks){ /* START LOOP: for each link */
            tagLink.addEventListener('click', tagClickHandler); /* add tagClickHandler as event listener for that link */
        } /* END LOOP: for each link */
      }

      addClickListenersToTags();

      function generateAuthors(){
        const allArticles = document.querySelectorAll(optArticleSelector);
        //console.log(allArticles);

        for(let article of allArticles){

            const authorWrapper = article.querySelector(optArticleAuthorSelector)
            //console.log(authorWrapper);

            let html = '';

            const author = article.getAttribute('data-author');
            //console.log(author);

            const authorLinkHTML = '<a href="#author-' + author + '"><span>by ' + author + '</span></a>';

            html = html + authorLinkHTML;
            //console.log(html);

            authorWrapper.innerHTML = html;
        }
    }
    generateAuthors();

    function authorClickHandler(event){
        event.preventDefault();
        
        const clickedElement = this;
        // console.log(clickedElement);

        const href = clickedElement.getAttribute('href');
        // console.log(href);

        const author = href.replace('#author-', '');
        // console.log(author);

        const allActiveAuthorLinks = document.querySelectorAll('a.active[href^="#author-"');
        // console.log(allActiveAuthorLinks);

        for(let activeAuthorLink of allActiveAuthorLinks){
            activeAuthorLink.classList.remove('active');
        }
        const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
        // console.log(allAuthorLinks);

        for(let authorLink of allAuthorLinks){
            authorLink.classList.add('active');
            // console.log(authorLink);
        }
        generateTitleLinks('[data-author="' + author + '"]');
    }

    function addClickListenerToAuthors(){
        const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
        // console.log(allAuthorsLinks);

        for(let authorLink of allAuthorsLinks){
            authorLink.addEventListener('click', authorClickHandler);
            // console.log(authorLink);
        }
    }
    addClickListenerToAuthors();
}
