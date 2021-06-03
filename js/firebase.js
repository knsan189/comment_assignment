const firebaseConfig = {
    apiKey: 'AIzaSyAHGq7xtoQ2EaiwoqaNU87IN_YN7vmrW5k',
    authDomain: 'comment-assignment.firebaseapp.com',
    projectId: "comment-assignment",
    databaseURL: 'https://comment-assignment-default-rtdb.firebaseio.com',
}
firebase.initializeApp(firebaseConfig)

const google = new firebase.auth.GoogleAuthProvider()
const github = new firebase.auth.GithubAuthProvider()
const facebook = new firebase.auth.FacebookAuthProvider()
const twitter = new firebase.auth.TwitterAuthProvider()

const onLogin = (providerName) => {
    switch(providerName){
        case 'Google' : return firebase.auth().signInWithRedirect(google)
        case 'Github' : return firebase.auth().signInWithRedirect(github)
        case 'Twitter' : return firebase.auth().signInWithRedirect(twitter)
        case 'Facebook' : return firebase.auth().signInWithRedirect(facebook)
    }
}

const onLogout = () => {
    sessionStorage.clear()
    firebase.auth().signOut()
    location.href= './'
}

let userinfo;

firebase.auth().onAuthStateChanged(function (user) {
    const img = document.querySelector('.comment-profile > img')
    if (user) {
        document.querySelector('.header-login').style.display = 'none';
        document.querySelector('.header-logout').style.display = 'initial'
        img.setAttribute('src', user.photoURL)
    } else {
        document.querySelector('.header-login').style.display = 'initial';
        document.querySelector('.header-logout').style.display = 'none'
        img.setAttribute('src', './images/unnamed.jpg')
    }
})


window.addEventListener('DOMContentLoaded', function () {

    // const loginData = []

    firebase.auth().getRedirectResult().then(result => result.user && sessionStorage.setItem('logininfo', JSON.stringify(result.user))).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

    })
    
})

const saveComment = async(comment, userId) => {
    try{
        const response = await firebase.database()
        .ref(`commentlist/${comment.uploadTime}`)
        .set(comment)

        return response
    }
    catch(e){
        console.log(e)
    }
}

const removeComment = (uploadTime) => {
    firebase.database().ref(`commentlist/${uploadTime}`).remove()
}

const updateComment = (uploadTime, comment) => {
    firebase.database().ref(`commentlist/${uploadTime}`).update({
        comment : comment
    })
}


const likeComment = (uploadTime, likeUser) => {
    firebase.database().ref(`commentlist/${uploadTime}/likeUser`).get().then(snapshot => {
        let data = []
        if(snapshot) data = data.concat(snapshot.val())
        data.push(likeUser)
        firebase.database().ref(`commentlist/${uploadTime}`).update({
            likeUser : data
        })

        location.href = './'
    })
}

const disLikeComment = (uploadTime, dislikeUser) => {
    firebase.database().ref(`commentlist/${uploadTime}/dislikeUser`).get().then(snapshot => {
        let data = []
        if(snapshot) data = data.concat(snapshot.val())
        data.push(dislikeUser)
        firebase.database().ref(`commentlist/${uploadTime}`).update({
            dislikeUser : data
        })

        location.href = './'
    })
}
