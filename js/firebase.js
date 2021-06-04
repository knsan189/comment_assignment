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

    const loadingSpinner = document.querySelector('.loading')

    async function logined() {
        try{
            loadingSpinner.style.display = 'flex'
            const response = await firebase.auth().getRedirectResult()
            return response
        }
        catch(e){

        }
        finally{
            loadingSpinner.style.display = 'none'
        }
    
        
    }

    logined().then(result => result.user && sessionStorage.setItem('logininfo', JSON.stringify(result.user)))
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
