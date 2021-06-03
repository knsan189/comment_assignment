window.addEventListener('DOMContentLoaded', function () {

    // 금지어 목록
    const forbiddenWords = ['바보', '멍청이', '불합격', '탈락']
    const emptyBlock = document.createElement('div')
    emptyBlock.className = 'empty-block'


    const LikeFuntion = () => {
        const likeBtn = document.querySelectorAll('.like-btn')

        likeBtn.forEach(btn => {
            btn.addEventListener('click', function () {

                if (btn.classList.contains('active')) {
                    alert('이미 좋아요를 누르셨습니다.')
                    return false
                }

                const loginData = JSON.parse(sessionStorage.getItem('logininfo'))
                const commentTime = this.parentNode.children[0].lastElementChild.textContent
                likeComment(commentTime, loginData.uid)
            })
        })

    }


    const disLikeFuntion = () => {
        const disLikeBtn = document.querySelectorAll('.dislike-btn')

        disLikeBtn.forEach(btn => {
            btn.addEventListener('click', function () {

                if (btn.classList.contains('active')) {
                    alert('이미 싫어요를 누르셨습니다.')
                    return false
                }

                const loginData = JSON.parse(sessionStorage.getItem('logininfo'))
                const commentTime = this.parentNode.children[0].lastElementChild.textContent
                disLikeComment(commentTime, loginData.uid)
            })
        })
    }


    const isEmtpy = () => {
        alert('내용을 입력해주세요')
    }

    // 작성일자 구하는 함수
    const dateToString = date => {
        const dateString = date.toISOString()
        const dateToString = dateString.substring(0, 10) + " " + dateString.substring(11, 19)

        return dateToString
    }

    const deleleFunction = () => {
        const loginData = JSON.parse(sessionStorage.getItem('logininfo'))
        const deleteBtn = document.querySelectorAll('.delete-btn')
        deleteBtn.forEach(e => e.addEventListener('click', function () {
            if (window.confirm('정말로 삭제하시겠습니까?')) {
                const commentDate = this.parentNode.parentNode.parentNode.children[0].lastElementChild.textContent
                removeComment(commentDate, loginData.uid)
                this.parentNode.parentNode.parentNode.remove()
            } else {
                return false
            }
        }))

    }

    const editFunction = () => {
        const editBtn = document.querySelectorAll('.edit-btn')
        editBtn.forEach(btn => {
            btn.addEventListener('click', function () {

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
                    const commentTime = commentContent.parentNode.children[0].lastElementChild.textContent
                    commentContent.textContent = textArea.value

                    updateComment(commentTime, textArea.value)
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
        const loginData = JSON.parse(sessionStorage.getItem('logininfo'))
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
            user.textContent = loginData.displayName

            const photoImg = document.createElement('img')
            photoImg.src = loginData.photoURL
            photoImg.alt = '사용자 프로필'

            const photo = document.createElement('div')
            photo.className = 'comment-photo'
            photo.appendChild(photoImg)

            const commentInfo = document.createElement('div')
            commentInfo.className = 'comment-info'
            commentInfo.append(photo, user, date)

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
            likeBtn.className = 'like-btn'
            likeBtn.textContent = '0'
            likeBtn.prepend(faThumbsUp)

            const dislikeBtn = document.createElement('button')
            dislikeBtn.className = 'dislike-btn'
            dislikeBtn.textContent = '0'
            dislikeBtn.prepend(faThumbsDown)

            const comment = document.createElement('div')
            comment.classList.add('comment-row')
            comment.append(commentInfo, content, moreBtn, commitBtn, likeBtn, dislikeBtn)


            const secondChild = document.querySelector('.comment-list').children[1]
            document.querySelector('.comment-list').insertBefore(comment, secondChild)

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
            LikeFuntion()
            disLikeFuntion()

            const commentData = {
                comment: newComment,
                uploadTime: dateString,
                username: loginData.displayName,
                userphoto: loginData.photoURL,
                userId: loginData.uid,
                likeUser: ['none'],
                dislikeUser: ['none']
            }

            saveComment(commentData, loginData.uid)

            const countComment = document.querySelector('.post-btn > span')
            countComment.textContent++

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

    const ref = firebase.database().ref(`/commentlist`).ref
    ref.once('value', snapshot => {
        const value = snapshot.val()
        value && syncComment(value)
    })

    const syncComment = (data) => {
        const loginData = JSON.parse(sessionStorage.getItem('logininfo'))
        const comments = data
        Object.keys(comments).forEach(key => creatComment(comments[key], loginData && loginData.uid))
    }
    const creatComment = (data, userId) => {

        const {
            dislikeUser,
            likeUser,
            uploadTime,
            username,
            userphoto
        } = data

        // 업로드 시간
        const date = document.createElement('div')
        date.className = 'comment-date'
        date.textContent = uploadTime

        const user = document.createElement('div')
        user.className = 'comment-username'
        user.textContent = username

        const photoImg = document.createElement('img')
        photoImg.src = userphoto || './images/noimage1.jpg'
        photoImg.alt = '사용자 프로필'

        const photo = document.createElement('div')
        photo.className = 'comment-photo'
        photo.appendChild(photoImg)

        const commentInfo = document.createElement('div')
        commentInfo.className = 'comment-info'
        commentInfo.append(photo, user, date)

        const faEllipsis = document.createElement('i')
        faEllipsis.className = 'fas fa-ellipsis-h'

        const moreBtn = document.createElement('button')
        moreBtn.className = 'more-btn'
        moreBtn.appendChild(faEllipsis)


        const commitBtn = document.createElement('ul')
        commitBtn.className = 'commit-btn'

        if (data.userId === userId) {
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
            commitBtn.append(elLi, elLi2)
        } else {
            const faExclam = document.createElement('i')
            faExclam.className = 'fas fa-exclamation-triangle'

            const declare = document.createElement('button')
            declare.className = 'declare-btn'
            declare.textContent = '신고하기'
            declare.prepend(faExclam)

            const elLi = document.createElement('li')
            elLi.appendChild(declare)

            commitBtn.append(elLi)
        }

        const content = document.createElement('div')
        content.classList.add('comment-content')
        content.textContent = data.comment

        const faThumbsUp = document.createElement('i')
        faThumbsUp.className = 'far fa-thumbs-up'
        const faThumbsDown = document.createElement('i')
        faThumbsDown.className = 'far fa-thumbs-down'

        const likeBtn = document.createElement('button')
        likeBtn.className = 'like-btn'
        likeBtn.textContent = likeUser.length - 1
        likeBtn.prepend(faThumbsUp)
        likeUser.includes(userId) && likeBtn.classList.add('active')

        const dislikeBtn = document.createElement('button')
        dislikeBtn.className = 'dislike-btn'
        dislikeBtn.textContent = dislikeUser.length - 1
        dislikeBtn.prepend(faThumbsDown)
        dislikeUser.includes(userId) && dislikeBtn.classList.add('active')

        const comment = document.createElement('div')
        comment.classList.add('comment-row')
        comment.append(commentInfo, content, moreBtn, commitBtn, likeBtn, dislikeBtn)

        const secondChild = document.querySelector('.comment-list').children[1]
        document.querySelector('.comment-list').insertBefore(comment, secondChild)

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
        LikeFuntion(likeUser)
        disLikeFuntion(dislikeUser)

        const countComment = document.querySelector('.post-btn > span')
        countComment.textContent++
    }

})