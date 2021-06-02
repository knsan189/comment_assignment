window.addEventListener('DOMContentLoaded', function () {

    // 금지어 목록
    const forbiddenWords = ['바보', '멍청이', '불합격', '탈락']
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'empty-block'

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


    const deleleFunction = () => {
        const deleteBtn = document.querySelectorAll('.delete-btn')
        deleteBtn.forEach(e => e.addEventListener('click', function () {
            this.parentNode.parentNode.parentNode.remove()
        }))
    }

    const editFunction = () => {
        const editBtn = document.querySelectorAll('.edit-btn')
        editBtn.forEach(btn => {btn.addEventListener('click', function () {
        
            const commentEditor = document.createElement('div')
            commentEditor.className = 'comment-editor'
            const textArea = document.createElement('textarea')
            const commentEditorSubmit = document.createElement('button')
            commentEditorSubmit.className = 'comment-editor-submit'
            commentEditorSubmit.textContent = '수정'
            const commentEditorCancel = document.createElement('button')
            commentEditorCancel.className = 'comment-editor-cancel'
            commentEditorCancel.textContent = '취소'
    
            commentEditor.append(textArea, commentEditorSubmit, commentEditorCancel)
            document.querySelector('.container').appendChild(emptyBlock)


            this.parentNode.parentNode.parentNode.appendChild(commentEditor)
    
            commentEditorSubmit.addEventListener('click', function () {
                const commentContent = this.parentNode.parentNode.children[1]
                commentContent.textContent = textArea.value
                emptyBlock.remove()
                commentEditor.remove()
            })
    
            emptyBlock.addEventListener('click', function () {
                commentEditor.remove()
                emptyBlock.remove()
            })
        })
        })
    }



    const newCommentInput = document.getElementById('new-comment')
    const submitComment = document.getElementById('comment-submit')

    const onSubmit = () => {

        const newComment = newCommentInput.value.trim()

        if (newComment) {
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

            if (parseInt(sessionStorage.getItem('time')) + 5000 > dateInfo.getTime()) {
                const remainTime = Math.ceil((parseInt(sessionStorage.getItem('time')) + 5000 - dateInfo.getTime()) / 1000)
                alert(`댓글 도배 방지로 ${remainTime}초 이후에 입력해주세요`)
                return false
            }

            sessionStorage.setItem('time', dateInfo.getTime())

            const date = document.createElement('div')
            date.className = 'comment-date'

            const dateString = dateToString(dateInfo)
            date.textContent = dateString

            const user = document.createElement('div')
            user.className = 'comment-username'
            user.textContent = '테스트 유저'

            const commentInfo = document.createElement('div')
            commentInfo.className = 'comment-info'
            commentInfo.append(user, date)

            const faEllipsis = document.createElement('i')
            faEllipsis.className = 'fas fa-ellipsis-h'

            const moreBtn = document.createElement('button')
            moreBtn.className = 'more-btn'
            moreBtn.appendChild(faEllipsis)

            const faEdit = document.createElement('i')
            faEdit.className = 'far fa-edit'

            const faMinus = document.createElement('i')
            faMinus.className = 'fas fa-minus-square'

            const editBtn = document.createElement('button')
            editBtn.className = 'edit-btn'
            editBtn.textContent = '수정'
            editBtn.prepend(faEdit)

            const deleteBtn = document.createElement('button')     
            deleteBtn.className = 'delete-btn'
            deleteBtn.textContent = '삭제'
            deleteBtn.prepend(faMinus)

            const elLi = document.createElement('li')
            elLi.appendChild(editBtn)
            const elLi2 = document.createElement('li')
            elLi2.appendChild(deleteBtn)

            const commitBtn = document.createElement('ul')
            commitBtn.className = 'commit-btn'
            commitBtn.append(elLi, elLi2)

            const content = document.createElement('div')
            content.classList.add('comment-content')
            content.textContent = newComment

            const faThumbsUp = document.createElement('i')
            faThumbsUp.className = 'far fa-thumbs-up'
            const faThumbsDown = document.createElement('i')
            faThumbsDown.className = 'far fa-thumbs-down'

            const likeBtn = document.createElement('button')
            likeBtn.className ='like-btn'
            likeBtn.appendChild(faThumbsUp)

            const dislikeBtn = document.createElement('button')
            dislikeBtn.className ='dislike-btn'
            dislikeBtn.appendChild(faThumbsDown)

            const comment = document.createElement('div')
            comment.classList.add('comment-row')
            comment.append(commentInfo, content, moreBtn, commitBtn, likeBtn, dislikeBtn)


            document.querySelector('.comment-list').appendChild(comment)
            document.querySelector('.comment-list')

            // 댓글 삭제 수정 버튼 토글기능
            const moreBtns = document.querySelectorAll('.more-btn')
            const commitBtns = document.querySelectorAll('.commit-btn')

            moreBtns.forEach(btn => {
                btn.addEventListener('click', function (event) {
                    event.stopPropagation()
                    commitBtns.forEach(btn => btn.classList.remove('active'))

                    const commitBtn = this.nextElementSibling
                    commitBtn.classList.add('active')
                })
            })
            document.addEventListener('click', function (event) {
                commitBtns.forEach(btn => {
                    btn.classList.contains('active') && btn.classList.remove('active')
                })
                event.stopPropagation()
            })

            deleleFunction()
            editFunction()

        } else {
            isEmtpy()
            return false
        }

        newCommentInput.value = ''
    }

    submitComment.addEventListener('click', onSubmit)
    newCommentInput.addEventListener('keypress', function (event) {
        event.key === 'Enter' && onSubmit()
    })


    
    deleleFunction()
    editFunction()

})