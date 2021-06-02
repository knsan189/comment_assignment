window.addEventListener('DOMContentLoaded', function(){

    // 금지어 목록
    const forbiddenWords = ['바보', '멍청이', '불합격', '탈락']

    const isEmtpy = () => {
        alert('내용을 입력해주세요')
    }

    // 작성일자 구하는 함수
    const dateToString = date => {
        const temp = date
        const dateString = temp.toISOString()
        const dateToString = dateString.substring(0, 10) + " " + dateString.substring(11, 19)
        return dateToString
    }

    const newCommentInput = document.getElementById('new-comment')
    const submitComment = document.getElementById('comment-submit')

    const onSubmit = () => {



        const newComment = newCommentInput.value.trim()

        if(newComment){

            const checkword = []
            forbiddenWords.forEach(word => {
                if (newComment.includes(word)) {
                    checkword.push(word)
                }
            })
    
            if (checkword.length > 0) {
                alert(`${checkword.join(',')}는 금지단어입니다.`)
                newCommentInput.focus()
                return false
            }
    
            const dateInfo = new Date()

            const date = document.createElement('div')
            date.className = 'comment-date'
    
            const dateString = dateToString(dateInfo)
            date.textContent = dateString

            const user = document.createElement('div')
            user.className = 'comment-username'
            user.textContent = '테스트 유저'

            const commentInfo = document.createElement('div')
            commentInfo.className = 'comment-info'
            commentInfo.appendChild(user)
            commentInfo.appendChild(date)

            const content = document.createElement('div')
            content.classList.add('comment-content')
            content.textContent = newComment

            const comment = document.createElement('div')
            comment.classList.add('comment-row')
            comment.appendChild(commentInfo)
            comment.appendChild(content)

            document.querySelector('.comment-list').appendChild(comment)
        }
        else{
            isEmtpy()
            return false
        }
    }

    submitComment.addEventListener('click', onSubmit)
    newCommentInput.addEventListener('keypress', function(event) {
        event.key === 'Enter' && onSubmit
    })
})