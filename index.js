const list = document.querySelector(".comment_list");
const arr = []
const firebaseComment = firebase.firestore().collection("comment");
const firebaseCourse = firebase.firestore().collection("course");
const form = document.querySelector("#form_register_wrapper");
const fb = () => {
    console.log('zoday')
    let html = "";
    firebaseComment.orderBy("time", "desc").onSnapshot(querySnapshot => {
        let html1 = "";

        querySnapshot.docChanges().forEach((change) => {
            const { doc } = change;
            console.log(change);
            if (change.type === "added") {

                if (change.doc.data().pId === undefined) {
                    html = `<comment-user level=1 comment = "${doc.data().comment}" id="${doc.id}" name="${doc.data().name}" hour="${doc.data().time}"
                    like = "${doc.data().like}"  dislike = "${doc.data().dislike}"   numberOfComment = "${doc.data().numberOfComment}" replyLever="${doc.data().replyLever}"
                    style = "display: block" class="Lever${doc.data().replyLever}"></comment-user>`
                    arr.push(html);
                }
            }
            if (change.type === "modified") {
                html = `<comment-user show=true levelToShow=4 level=1 comment = "${doc.data().comment}" id="${doc.id}" name="${doc.data().name}" hour="${doc.data().time}"
                like = "${doc.data().like}"  dislike = "${doc.data().dislike}" numberOfComment = "${doc.data().numberOfComment}" replyLever="${doc.data().replyLever}"
                style = "display: block" class="Lever${doc.data().replyLever}"></comment-user>`
                const index = getIndex(arr, doc.id)

                arr[index] = html
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
            html1 = getHtmlFromAraay(arr)
            console.log(html1);

            list.innerHTML = html1
        });

    })
    const signIn = document.querySelector("#Write_signIn");
    signIn.addEventListener("submit", (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(signIn["email"].value, signIn["password"].value)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    })



}
fb();

const courseFc = () => {
    const course = document.querySelector(".img_course");
    document.querySelectorAll(".img_wrapper").forEach((item, index) => {
        item.addEventListener("click", async () => {

            let img = document.querySelectorAll(".img")[index].getAttribute("src")
            let html = "";
            const getItem = await firebaseCourse.where("img", "==", img).get();

            html = `<registercourse-user fee="${getItem.docs[0].data().fee}" img="${getItem.docs[0].data().img}" name="${getItem.docs[0].data().name}"
          shape="${getItem.docs[0].data().shape}" teacher="${getItem.docs[0].data().teacher}" time="${getItem.docs[0].data().time}"
        class="module_registercourse"  ></registercourse-user>`
            console.log(form);
            form.innerHTML = html;

            // item.href = "#form_register_wrapper"

            $('body, html').animate({ scrollTop: $("#form_register_wrapper").offset().top }, 1000);

        })

    })
}
courseFc();

const writeComment = () => {
    let userId;
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            userId = user.email;

            // ...
        } else {
            // User is signed out
            // ...
        }
    });
    let comment = document.querySelector("#Write_comment")
    if (userId !== null) {
        comment.addEventListener("submit", (e) => {
            e.preventDefault();

            firebaseComment.add({
                comment: comment["comment"].value,
                time: Date.now(),
                name: userId,
                like: 0,
                dislike: 0,
                userEmotion: [],
                numberOfComment: 0,
                replyLever: 0
            })
            comment["comment"].value = "";
        })
    }



}
writeComment();

const getHtmlFromAraay = (array) => {
    return array.reduce((html, arrayItem) => {
        return html += arrayItem
    }, '')
}


const getIndex = (aray, id) => {
    const regex = new RegExp(id, 'g')
    return aray.findIndex((item) => {
        return regex.test(item)
    })
}
