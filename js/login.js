window.addEventListener('DOMContentLoaded', function () {

    const newCommentInput = document.getElementById('new-comment')
    const loginBox = document.querySelector('.login-box')

    newCommentInput.addEventListener('click', function () {

        if (!JSON.parse(sessionStorage.getItem('logininfo'))) {
            alert('로그인 후 이용해주세요 ')
            loginBox.style.display = 'flex'
            return false
        }
    })

    const loginButtons = document.querySelectorAll('.login-btn')
    loginButtons.forEach(button => {
        button.addEventListener('click', function () {
            onLogin(button.value)
        })
    })

    const headerLogin = document.querySelector('.header-login')
    const headerLogout = document.querySelector('.header-logout')

    if(!sessionStorage.getItem('loginInfo')){
        headerLogin.style.display = 'inline-block'
        headerLogout.style.display = 'none'
    }
    else{
        headerLogin.style.display = 'none'
        headerLogout.style.display = 'inline-block'
    }

    headerLogin.addEventListener('click', function(){
        loginBox.style.display = 'flex'
    })

    headerLogout.addEventListener('click', function(){
        onLogout()
    })
})