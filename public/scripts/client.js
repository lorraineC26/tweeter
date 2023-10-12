/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Prevent XXS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// add each tweet to index.html
const renderTweets = function(tweetsArr) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweetObj of tweetsArr) {
    const $tweet = createTweetElement(tweetObj);
    $('.all-tweets').prepend($tweet); // make $tweet html always the first child so can appear on top
  }
};

// return a html layout for tweet
const createTweetElement = function(tweetObj) {
  let daysAgo = timeago.format(tweetObj["created_at"]);
  const layout = `
      <article>
        <header>
          <div id="left">
            <img class="avatars" src="${tweetObj.user.avatars}"/>
            ${escape(tweetObj.user.name)}
          </div>
          <div id="right">${escape(tweetObj.user.handle)}</div>
        </header>

        <p>${escape(tweetObj.content.text)}</p>

        <footer>
          <div class="timeago">${daysAgo}</div>
          <div>
            <i class="fa-solid fa-flag" ></i>
            <i class="fa-solid fa-retweet" ></i>
            <i class="fa-solid fa-heart" ></i>
          </div>
        </footer>
      </article>
    `;

  return layout;
};

$(document).ready(function() {
  
  // browse tweets array and turn each tweet into html
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };
  loadTweets();

  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    // get the exact input values from users
    let inputText = $('form').children('textarea').val();
    //check if the input is validated
    if (! inputText) {
      return alert("Oops! It's empty. Empty tweets cannot be posted :(");
    }
    if (inputText.length > 140) {
      return alert("Oops! Your tweet is too long. Tweets go beyond 140 characters cannot be posted :(");
    }

    // turns validated input form data into a query string so can be well recevied by the server
    const text = $('form').serialize();

    // let input shows on html page
    $.ajax({ url: "/tweets", method: 'POST', data: text })
      // fetch new tweets array data
      .then(() => {
        return $.ajax('/tweets', { method: 'GET' });
      })
      .then(function(newTweetsArr) {
        $('form').children('textarea').val(''); // clear text in the textarea
        $('form').find('.counter').text(140); // reset counter to 140 for a new tweet
        const newTweet = [newTweetsArr[newTweetsArr.length - 1]];
        renderTweets(newTweet);
      });

  });
  

});




