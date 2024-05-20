// client.js

$(document).ready(function () {
  const charLimit = 140;
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //////////////////////////////////
  // Function that returns tweet <article>
  //////////////////////////////////
  const createTweetElement = function (tweetData) {
    const formattedTimeAgo = timeago.format(tweetData.created_at);
    const tweetHTML = `
      <article class="tweet" data-id="${tweetData.id}">
        <header>
          <span class="tweet-avatar">
            <img src="${tweetData.user.avatars}" alt="User avatar" />
            <p>${tweetData.user.name}</p>
          </span>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <p class="content">${escape(tweetData.content.text)}</p>
        <footer>
          <time class="timeago">${formattedTimeAgo}</time>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-repeat"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
    return $(tweetHTML);
  };

  //////////////////////////////////
  // Function that displays the tweets
  //////////////////////////////////
  const renderTweets = function (tweets) {
    $(".all-tweets").empty(); // Clear existing tweets

    // If there are tweets, render them
    tweets.forEach(function (tweetData) {
      const $tweet = createTweetElement(tweetData);
      $(".all-tweets").prepend($tweet);
    });
  };

  //////////////////////////////////
  // Attach an event listener to the form for posting new tweets
  //////////////////////////////////
  $("#tweet-form").on("submit", function (event) {
    // Prevent the default form submission behaviour
    event.preventDefault();

    // Serialize the form data
    let $str = $(this).serialize();

    // Validate tweet content
    const tweetContent = $(this).find("textarea").val().trim(); // Remove leading and trailing white spaces

    // If tweet form is empty
    if (!tweetContent) {
      showError("Tweet cannot be empty!");
      return;
    }

    // If user types more than the character limit
    if (tweetContent.length > charLimit) {
      showError("Character limit exceeded!");
      return;
    }

    // Hide error message if validation passes
    hideError();

    // Make an AJAX POST request to submit the serialized form data to the server
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $str,
      success: function () {
        loadTweets(); // Reload tweets after posting
        $("#tweet-form")[0].reset(); // Clear the form
        $(".counter").text(charLimit); // Reset the character counter
      },
      error: function (error) {
        showError("Error posting tweet:", error);
      },
    });
  });

  //////////////////////////////////
  // Function to show error message
  //////////////////////////////////
  const showError = function (message) {
    $("#error-message").text(message);
    $(".error").slideDown();
  };
  
  //////////////////////////////////
  // Function to hide error message
  //////////////////////////////////
  const hideError = function () {
    $(".error").slideUp();
  }
  
  //////////////////////////////////
  // Function to load tweets from the server
  //////////////////////////////////
  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data);
      },
      error: function (error) {
        showError("Error loading tweets:", error);
      },
    });
  };

  // Initial load of tweets
  loadTweets();
});
