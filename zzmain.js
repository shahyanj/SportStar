const url = 'https://us-central1-omg-codemygear.cloudfunctions.net/comments/shahyan';

var content = document.getElementById('content');
var text = document.getElementById('text');
var submit = document.getElementById('submit');
var email = document.getElementById('email');

getComments();

async function getComments() {
  var resp = await fetch(url);
  var comments = await resp.json();
  var html = "";
  comments.forEach(function(comment){
    html = html + "<div>";
    html = html + `<span>${comment.message}</span>`;
    html = html + "<br>";
    html = html + `<span>${comment.email}</span>`;
    html = html + "<br>";
    html = html + `<span>${comment.created_at}</span>`;
    html = html + "</div>";
  });
  content.innerHTML = html;
  console.log(html);
}


submit.addEventListener("click", function() {
  postComments([{
    "message": text.value,
    "email": email.value
  }]);
});

async function postComments(comment) {
  var resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  getComments();

  text.value = ""
  email.value = ""
}
