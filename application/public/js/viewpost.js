function addNewComment(data){
    let commentList = document.getElementById("comment-list");
    let newComment = document.createElement('template');
    newComment.innerHTML = `<div id="message-${data.commentId}" class="comment">
    <strong class="comment-author">${data.username}</strong>
    <p class="comment-date">${new Date().toLocaleString('en-US', {
        timeStyle:"long",
        dateStyle:"long"
    })}</p>
    <span class="comment-text">${data.comment}</span>
</div>`;
    commentList.append(newComment.content);
    document.getElementById(`message-${data.commentId}`).scrollIntoView();

}

document.getElementById('comment-button')
    .addEventListener('click', function(ev){
        let commentTextElement = document.getElementById('comment-textbox');
        let commentText = commentTextElement.value;
        let postId = ev.currentTarget.dataset.postid;

        if(!commentText) return;

        fetch('/comments/create', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                comment: commentText,
                postId: postId
            })
        })
        .then(response => response.json())
        .then(res_json => {
            addNewComment(res_json.data);
        })
    })