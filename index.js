// VARIABLES
const form = document.querySelector('#form');
const list = document.querySelector('#list');
let tweets = [];

// EVENTS

eventListener();
function eventListener() {
  form.addEventListener('submit', addTweet);
  tweets = JSON.parse(localStorage.getItem('tweets')) || [];
  console.log(tweets);
  setTimeout(()=>{
    showTweets();
  },100)
  
  
}

// FUNCTIONS

function addTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector('#tweet').value;
  if (tweet === '') {
    showError('Debe de ingredar un tweet');
    return;
  }
  tweetObj = {
    id: Date.now(),
    tweet,
  };
  tweets = [...tweets, tweetObj];
  clearForm();
  showTweets();
}

function showError(error) {
  const div = document.createElement('div');
  div.classList.add('alert', 'alert-danger', 'mt-3');
  div.textContent = error;
  const errorMsg = form.parentElement.appendChild(div);
  setTimeout(() => {
    errorMsg.remove();
  }, 3000);
}

function clearForm() {
  form.reset();
}

function showTweets() {
  clearHtml();
  const group = document.createElement('ul');
  group.classList.add('list-group', 'mt-5');

  if (tweets.length > 0) {
    tweets.forEach(({ id, tweet }) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
      li.textContent = tweet;
      const deleteBtn = document.createElement('a');
      deleteBtn.style.color = 'red';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.textContent = 'X';
      li.appendChild(deleteBtn);
      deleteBtn.onclick = () => {
        deleteTweet(id);
      };
      group.appendChild(li);
    });
    list.appendChild(group);
    setLocalStorage();
  }
}

function setLocalStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
  console.log(localStorage.getItem('tweets'));
}

const clearHtml = () => {
  if (list.firstChild) {
    list.removeChild(list.firstChild);
  }
};

function deleteTweet(id) {
  tweets = tweets.filter((tweet) => {
    if (tweet.id != id) {
      return tweet;
    }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets));
  showTweets();
}
