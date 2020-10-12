/* eslint-disable no-inner-declarations */
/* eslint-disable semi */
/* eslint-disable indent */
{
    'use strict';
    
    // document.getElementById('test-button').addEventListener('click', function(){const links = document.querySelectorAll('.titles a'); console.log('links: ', links);});

    //Handlebars Module 7.4
    const templates = { 
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
        articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML)
    } 

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
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-',
        optAuthorListSelector ='.authors.list';


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

            // Module 7.4 Handlebars Modyfied
            // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /* create HTML of the link */
            const linkHTMLData = {id: articleId, title: articleTitle}; 
            const linkHTML = templates.articleLink(linkHTMLData);
 
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

    function calculateTagsParams(tags){
        const params = {min: '99999', max: '0'};
        for(let tag in tags){
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }
        return params;
    }

    function calculateTagClass (count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
        return optCloudClassPrefix + '' + classNumber;
    }

    function generateTags(){
        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};

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
                // const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; /* generate HTML of the link */
                
                // Module 7.4 Halndlebars Modyfied
                const linkHTMLData = {id: tag, title: tag};
                const tagHTML = templates.articleTag(linkHTMLData);
                // console.log(tagHTML);

                html += tagHTML /* add generated code to html variable */

                /* [NEW] check if this link is NOT already in allTags */
                if(!allTags[tag]){
                    /* [NEW] add generated code to allTags array */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
            } /* END LOOP: for each tag */

            tagsWrapper.innerHTML = html;/* insert HTML of all the links into the tags wrapper */    
            
            /* [NEW] find list of tags in right column */
            const tagList = document.querySelector(optTagsListSelector);
            const tagsParams = calculateTagsParams(allTags);

            /* [NEW] create variable for all links HTML code */
            let allTagsHTML = '';

            /* [NEW] START LOOP: for each tag in allTags: */
            for(let tag in allTags){
            /* [NEW] generate code of a link and add it to allTagsHTML */
            // const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="tag-size ' + calculateTagClass(allTags[tag], tagsParams) +'">' + tag + '</a> <span>' + ' (' + allTags[tag] + ') ' + '</span></li>';
            
            const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="tag-size ' + calculateTagClass(allTags[tag], tagsParams) +'">' + tag + '</a></li>';

            allTagsHTML += tagLinkHTML;
            } /* [NEW] END LOOP: for each tag in allTags: */

            /*[NEW] add HTML from allTagsHTML to tagList */
            tagList.innerHTML = allTagsHTML;
            
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

        /* [NEW] create a new variable allAuthors with an empty object */
        let allAuthors = {};

        const allArticles = document.querySelectorAll(optArticleSelector);
        //console.log(allArticles);

        for(let article of allArticles){
            const authorWrapper = article.querySelector(optArticleAuthorSelector)
            //console.log(authorWrapper);
            let html = '';
            const author = article.getAttribute('data-author');
            // console.log(author);
            // const authorLinkHTML = '<a href="#author-' + author + '"><span>by ' + author + '</span></a>';
            const linkHTMLData = {id: author, title: author};
            const authorLinkHTML = templates.articleAuthor(linkHTMLData);
            html += authorLinkHTML;
            authorWrapper.innerHTML = html;

            /* [NEW] check if this link is NOT already in allTags */
            if(!allAuthors[author]){
                /* [NEW] add generated code to allTags array */
                allAuthors[author] = 1;
            } else {
                allAuthors[author]++;
            }

            /* [NEW] find list of tags in right column */
            const authorList = document.querySelector(optAuthorListSelector);
            const authorParams = calculateTagsParams(allAuthors);

            /* [NEW] create variable for all links HTML code */
            let allAuthorsHTML = '';

            /* [NEW] START LOOP: for each tag in allTags: */
            for(let author in allAuthors){

            /* [NEW] generate code of a link and add it to allTagsHTML */
            const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>'; 
            allAuthorsHTML += authorLinkHTML;

            } /* [NEW] END LOOP: for each tag in allTags: */

            /*[NEW] add HTML from allTagsHTML to tagList */
            authorList.innerHTML = allAuthorsHTML;
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
