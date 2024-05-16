// client.js

$(document).ready(function () {
  // Function that returns tweet <article>
  const createTweetElement = function (tweetData) {
    // Create the main article element for tweet
    let $tweet = $("<article>").addClass("tweet");

    // Create the header section
    const $header = $("<header>");
    const $span = $("<span>").addClass("tweet-avatar");
    const $avatar = $("<img>").attr("src", tweetData.user.avatars);
    const $name = $("<p>").text(tweetData.user.name);
    $span.append($avatar, $name); // Insert avatar and name into the span element
    const $handle = $("<p>").addClass("handle").text(tweetData.user.handle);
    $header.append($span, $handle); // Insert span children and handle into header
    $tweet.append($header); // Insert header into tweet

    // Create the content section
    const $content = $("<p>").addClass("content").text(tweetData.content.text);
    $tweet.append($content); // Insert content into tweet

    // Create the footer section
    const $footer = $("<footer>");
    const $timeAgo = $("<p>").text(tweetData.created_at);
    const $icons = $("<div>").addClass("icons");
    const $flagIcon = $("<i>").addClass("fa-solid fa-flag");
    const $repeatIcon = $("<i>").addClass("fa-solid fa-repeat");
    const $heartIcon = $("<i>").addClass("fa-solid fa-heart");
    $icons.append($flagIcon, $repeatIcon, $heartIcon); // Insert the icons into the div element
    $footer.append($timeAgo, $icons); // Insert the time of tweet and icons into the footer

    $tweet.append($header, $footer); // Insert the header and footer into the article element

    return $tweet;
  };

  const renderTweets = function (tweets) {
    data.forEach(function (tweetData) {
      const $tweet = createTweetElement(tweetData);
      $(".all-tweets").append($tweet);
    });
  };

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  renderTweets(data);
});
