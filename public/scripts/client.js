// Fake data taken from initial-tweets.json
$(document).ready(function () {
    const data = [
        {
            "user": {
                "name": "Newton",
                "avatars": "https://i.imgur.com/73hZDYK.png"
                ,
                "handle": "@SirIsaac"
            },
            "content": {
                "text": "If I have seen further it is by standing on the shoulders of giants"
            },
            "created_at": 1461116232227
        },
        {
            "user": {
                "name": "Descartes",
                "avatars": "https://i.imgur.com/nlhLi3I.png",
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ]
    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    $("#text-input").submit(function (event) {
        event.preventDefault();
        let formData = document.getElementById('tweet-text').value
        formData = escape(formData)
        if (formData.length >= 140) {
            let errorLong = document.getElementById('error-message')
            errorLong.innerHTML = "❗tweet too long please have a limit of 140 character❗"
            return
        } else if (formData.length === 0) {
            let errorLong = document.getElementById('error-message')
            errorLong.innerHTML = "❗tweet cannot be empty❗"
            return
        }

        console.log("event,,,", formData)
        $.post("http://localhost:8080/tweets/", { text: formData }, function (data, status) {
            console.log("reult...", data)
            $.get("http://localhost:8080/tweets/", function (data, status) {
                renderTweets(data)
            })
        });

    });

    const renderTweets = function (tweets) {

        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
        tweets.forEach(tweet => {
            const givenTweet = createTweetElement(tweet)

            $(".tweet-post-container").append(givenTweet);
        });

    }

    const createTweetElement = function (tweet) {
        const $tweet = $(`
    <li class="tweet-published">

      <nav class="nav-tweet">
      <span class="name"><img src="${tweet.user.avatars} " class="profile-img" > ${tweet.user.name}</span>
        <span class="handle">${tweet.user.handle}</span>
      </nav>

      <div class="tweet-text">${tweet.content.text}</div>
      <nav class="bottom-tweet">
        <div class="days">${timeago.format((tweet.created_at))}  </div>

        <div class="icons">
          <button class="flag">
            <i class="fas fa-flag"></i>
          </button>

          <button class="share">
            <i class="fas fa-retweet"></i>
          </button>

          <button class="like">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </nav>
    </li>`);
        return $tweet
    }

    renderTweets(data);
})