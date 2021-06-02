window.addEventListener('DOMContentLoaded', function(){

    const isEmtpy = () => {
        alert('내용을 입력해주세요')
    }

    const newCommentInput = document.getElementById('new-comment')
    const submitComment = document.getElementById('comment-submit')

    const onSubmit = () => {

        const newComment = newCommentInput.value.trim()

        if(newComment){
            const content = document.createElement('div')
            content.classList.add('comment-content')
            content.textContent = newComment

            const comment = document.createElement('div')
            comment.classList.add('comment-row')
            comment.appendChild(content)

            document.querySelector('.comment-list').appendChild(comment)
        }
    }

    submitComment.addEventListener('click', onSubmit)
    newCommentInput.addEventListener('keypress', function(event) {
        event.key === 'Enter' && onSubmit
    })
})