window.addEventListener('DOMContentLoaded', function () {

    // 댓글 삭제 수정 버튼 토글기능
    const moreBtn = document.querySelectorAll('.more-btn')
    const commitBtns = document.querySelectorAll('.commit-btn')

    moreBtn.forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.stopPropagation()
            commitBtns.forEach(btn=>btn.classList.remove('active'))

            const commitBtn = this.nextElementSibling
            commitBtn.classList.add('active')
        })
    })
    document.addEventListener('click', function(event){
        commitBtns.forEach(btn => {
            btn.classList.contains('active') && btn.classList.remove('active')
        })
        event.stopPropagation()
    })
    
})