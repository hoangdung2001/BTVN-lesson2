const template1 = document.createElement("template");
template1.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}
#hide,#display{
    width: 20px;
}
.comment_list{
    padding: 10px;
    width: 50%;
}
.name_hours{
    display: flex;
    align-items: center;
    
}
.name{
    margin-right: 25px;
    font-weight: bold;
    font-size: 16px;
}
.hours{
    font-size: 12px;
    font-weight: 100;
    
}
.icon_like_dislike{
    cursor: pointer;
    width: 15px;
    margin-right: 5px;
}
.icon{
    margin-right: 10px;
}
.reply{
    cursor: pointer;
}
.active{
    display: block !important;
}
.hide{
    display:none;
}
.replyForm{
    display: none;
}
.Lever1{
    margin-left: 20px;
}
.Lever2{
    margin-left: 20px;
}
.Lever3{
    margin-left: 20px;
}
.Lever4{
    margin-left: 20px;
}
.Lever5{
    margin-left: 20px;
}
</style>
<div class = "Comment_general" > 
    <div class = "name_hours">
        <div class="name" id="name">
       
        </div>
        <span class="hours">
  
        </span>
    </div>
    <div class="comment"></div>
    <div class="comment_like_dislike">
        <span class="comment_like icon">
        <img src="https://img.icons8.com/material-rounded/24/000000/facebook-like--v1.png" class= "icon_like_dislike like" id="like1"  /> 
        <span class="number_like"> </span>
        </span>
        <span class="comment_dislike icon">
        <img src="https://img.icons8.com/material-rounded/24/000000/thumbs-down.png" class= "icon_like_dislike dislike"
       
        />
        <span class="number_dislike"></span>
        </span>
  <span class="reply">Reply</div>
  <div class="replyForm ">
  <form id="Write_ReplyForm">
  
      <input type="text" name="comment" placeholder="Enter your comment">
      <button id="Submit-btn">Submit</button>
      <button id="Cancel-btn">Cancel</button>
  </form>
  </div>
 <div class="display_comment">
  <span id="number_Comment"></span>
 </div>

<div class="comment_replies hide">

</div>
</div >
`;
class Comment extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template1.content.cloneNode(true));
        this.shadowRoot.querySelector("#name").innerText =
            this.getAttribute("name");
        this.shadowRoot.querySelector(".comment").innerText =
            this.getAttribute("comment");
        this.shadowRoot.querySelector(".number_like").innerText =
            this.getAttribute("like");
        this.shadowRoot.querySelector(".number_dislike").innerText =
            this.getAttribute("dislike");
        if (this.getAttribute("numberOfComment") > 0) {
            this.shadowRoot.querySelector(
                "#number_Comment"
            ).innerHTML = `<img src = "https://img.icons8.com/pastel-glyph/64/000000/expand-arrow.png" id = "hide" /> Show ${this.getAttribute(
                "numberOfComment"
            )} comments`;
        }

        this.userId = "";
        const list = this.shadowRoot.querySelector(".comment_replies");
        if (Boolean(this.getAttribute('show'))) {
            list.className = 'comment_replies'
        }
        else {
            list.className = 'comment_replies hide'
        }
        const level = Number(this.getAttribute('level'))
        const levelToShow = Number(this.getAttribute('levelToShow'))

        firebase
            .firestore()
            .collection("comment")
            .where("pId", "==", this.getAttribute("id"))
            .orderBy("time", "asc")
            .get()
            .then((querySnapshot) => {
                let html = "";
                querySnapshot.forEach((doc) => {

                    // doc.data() is never undefined for query doc snapshots
                    const show = level >= levelToShow ? 'true' : ''
                    html += `<comment-user show=${show} level = ${level} levelToShow=${level + 1} comment = "${doc.data().comment}" id="${doc.id
                        }"  name = "${doc.data().name}" hour = "${doc.data().time}"
            like = "${doc.data().like}"  dislike = "${doc.data().dislike
                        }" numberOfComment = "${doc.data().numberOfComment
                        }" replyLever="${doc.data().replyLever}"
            style = "display: block" class="Lever${doc.data().replyLever
                        }" ></comment-user > `;
                });
                list.innerHTML = html;
            });

    }


    Like = (name, comment, time, type) => {
        console.log(name);

        firebaseComment
            .where("name", "==", name)
            .where("comment", "==", comment)
            .where("time", "==", Number(time))
            .get()
            .then((querySnapshot) => {

                if (this.userId !== "") {
                    const userComment = querySnapshot.docs[0]
                        .data()
                        .userEmotion.filter((item) => item.user === this.userId);
                    if (userComment.length > 0) {
                        if (userComment[0].type === type) {
                            firebaseComment.doc(querySnapshot.docs[0].id).update({
                                userEmotion: firebase.firestore.FieldValue.arrayRemove({
                                    user: this.userId,
                                    type: type,
                                }),
                                [type]: firebase.firestore.FieldValue.increment(-1),
                            });
                        } else {
                            firebaseComment.doc(querySnapshot.docs[0].id).update({
                                userEmotion: firebase.firestore.FieldValue.arrayRemove({
                                    user: this.userId,
                                    type: userComment[0].type,
                                }),

                                [userComment[0].type]:
                                    firebase.firestore.FieldValue.increment(-1),
                                [type]: firebase.firestore.FieldValue.increment(1),
                            });
                            firebaseComment.doc(querySnapshot.docs[0].id).update({
                                userEmotion: firebase.firestore.FieldValue.arrayUnion({
                                    user: this.userId,
                                    type: type,
                                }),
                            });
                        }
                    } else {
                        firebaseComment.doc(querySnapshot.docs[0].id).update({
                            userEmotion: firebase.firestore.FieldValue.arrayUnion({
                                user: this.userId,
                                type: type,
                            }),
                            [type]: firebase.firestore.FieldValue.increment(1),
                        });
                    }
                }
            });

    };
    Time(time, display = this.shadowRoot.querySelector(".hours")) {
        const covertMinutes = Math.floor((Date.now() - time) / 60000);
        const covertHours = Math.floor((Date.now() - time) / 3600000);
        const covertDays = Math.floor((Date.now() - time) / 86400000);
        const covertWeeks = Math.floor((Date.now() - time) / 604800016.56);
        const covertMonths = Math.floor((Date.now() - time) / 2629800000);
        const covertYears = Math.floor((Date.now() - time) / 31557600000);
        if (covertMinutes > 0 && covertMinutes < 60)
            display.innerHTML = `${covertMinutes} minutes ago`;
        else if (covertMinutes > 60 && covertMinutes < 1440)
            display.innerHTML = `${covertHours} hours ago`;
        else if (covertMinutes > 1440 && covertMinutes < 10080)
            display.innerHTML = `${covertDays} days ago`;
        else if (covertMinutes > 10080 && covertMinutes < 40320)
            display.innerHTML = `${covertWeeks} weeks ago`;
        else if (covertMinutes > 40320 && covertMinutes < 524160.01)
            display.innerHTML = `${covertMonths} months ago`;
        else if (covertMinutes > 524160.01)
            display.innerHTML = `${covertYears} years ago`;
    }
    logIn() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.userId = user.email;

                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }


    async displayNumberOfComment(numberOfComment) {
        const numberComment = this.shadowRoot.querySelector(".display_comment");
        const list = this.shadowRoot.querySelector(".comment_replies");
        const level = Number(this.getAttribute('level'))
        const levelToShow = Number(this.getAttribute('levelToShow'))


        list.classList.toggle("hide")
        if (list.classList.contains("hide")) {
            if (numberOfComment > 0) {
                numberComment.innerHTML = `<img src = "https://img.icons8.com/pastel-glyph/64/000000/expand-arrow.png" id = "hide" /> Show ${this.getAttribute(
                    "numberOfComment"
                )} comments`;
            }
        } else {
            if (numberOfComment > 0) {
                console.log("show", this.getAttribute('level'));

                numberComment.innerHTML = `<img src = "https://img.icons8.com/pastel-glyph/64/000000/collapse-arrow.png" id = "display" /> Hide ${this.getAttribute(
                    "numberOfComment"
                )} comments`;
                firebase
                    .firestore()
                    .collection("comment")
                    .where("pId", "==", this.getAttribute("id"))
                    .orderBy("time", "asc")
                    .get()
                    .then((querySnapshot) => {
                        let html = "";
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            const show = level >= levelToShow ? 'true' : ''
                            html += `<comment-user show=${show}  level=${level + 1} comment = "${doc.data().comment}" id="${doc.id
                                }"  name = "${doc.data().name}" hour = "${doc.data().time}"
                            like = "${doc.data().like}"  dislike = "${doc.data().dislike
                                }" numberOfComment = "${doc.data().numberOfComment
                                }" replyLever="${doc.data().replyLever}"
                            style = "display: block" class="Lever${doc.data().replyLever
                                }" ></comment-user > `;
                        });
                        list.innerHTML = html;
                    });
            }
        }
    }

    writeForm(name, comment, time) {
        let writeComment = this.shadowRoot.querySelector("#Write_ReplyForm");
        if (writeComment["comment"].value !== "") {
            firebase
                .firestore()
                .collection("comment")
                .where("name", "==", name)
                .where("comment", "==", comment)
                .where("time", "==", Number(time))
                .get()
                .then((snapshot) => {
                    firebase
                        .firestore()
                        .collection("comment")
                        .doc(snapshot.docs[0].id)
                        .update({
                            numberOfComment: firebase.firestore.FieldValue.increment(1),
                        });
                    firebase.firestore().collection("comment").add({
                        comment: writeComment["comment"].value,
                        time: Date.now(),
                        name: this.userId,
                        like: 0,
                        dislike: 0,
                        userEmotion: [],
                        numberOfComment: 0,
                        pId: snapshot.docs[0].id,
                        replyLever: Number(this.getAttribute("replyLever")) + 1,

                    });
                });
        }
    }

    connectedCallback() {
        const display = this.shadowRoot.querySelector(".hours");
        this.logIn();

        this.shadowRoot.querySelector(".like").addEventListener("click", () => {
            this.Like(
                this.getAttribute("name"),
                this.getAttribute("comment"),
                this.getAttribute("hour"),
                "like"
            );
        });
        this.shadowRoot.querySelector(".dislike").addEventListener("click", () => {
            this.Like(
                this.getAttribute("name"),
                this.getAttribute("comment"),
                this.getAttribute("hour"),
                "dislike"
            );
        });
        this.shadowRoot
            .querySelector(".display_comment")
            .addEventListener("click", () => {
                this.displayNumberOfComment(this.getAttribute("numberOfComment"));
            });
        this.shadowRoot.querySelector(".reply").addEventListener("click", () => {
            this.shadowRoot.querySelector(".replyForm").classList.add("active");
        });
        this.shadowRoot
            .querySelector("#Cancel-btn")
            .addEventListener("click", () => {
                this.shadowRoot.querySelector(".replyForm").classList.remove("active");
            });
        this.shadowRoot
            .querySelector("#Write_ReplyForm")
            .addEventListener("submit", (e) => {
                e.preventDefault();
                this.writeForm(
                    this.getAttribute("name"),
                    this.getAttribute("comment"),
                    this.getAttribute("hour")
                );
            });
        this.myClockTimer = setInterval(
            () => this.Time(this.getAttribute("hour"), display),
            1000
        );
    }

    disconnectedCallback() {
        this.shadowRoot
            .querySelector(".like")
            .removeEventListener("click", this.Like);
        this.shadowRoot
            .querySelector(".dislike")
            .removeEventListener("click", this.Like);
        this.shadowRoot
            .querySelector(".display_comment")
            .removeEventListener("click", this.displayNumberOfComment);
        this.shadowRoot
            .querySelector("#Write_ReplyForm")
            .removeEventListener("click", this.writeForm);
    }
}

window.customElements.define("comment-user", Comment);
