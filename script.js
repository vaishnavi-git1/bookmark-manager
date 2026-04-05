let today=0

let quotes=[
"Your links are waiting",
"Stay organized stay productive",
"Save now return later"
]

document.getElementById("quote").innerText=
quotes[Math.floor(Math.random()*quotes.length)]

function addBookmark(){

let title=document.getElementById("title").value
let url=document.getElementById("url").value

if(title=="" || url==""){
showMessage("Fill all fields")
return
}

let bookmarks=JSON.parse(localStorage.getItem("bookmarks")) || []

bookmarks.push({title,url,fav:false})

localStorage.setItem("bookmarks",JSON.stringify(bookmarks))

today++

document.getElementById("title").value=""
document.getElementById("url").value=""

displayBookmarks()
}

function displayBookmarks(){

let bookmarks=JSON.parse(localStorage.getItem("bookmarks")) || []

let list=document.getElementById("bookmarkList")

list.innerHTML=""

let fav=0

bookmarks.forEach((b,index)=>{

if(b.fav) fav++

list.innerHTML+=`
<div class="bookmark">
<a href="${b.url}" target="_blank">${b.title}</a>
<div>
<button onclick="favorite(${index})">Star</button>
<button onclick="editBookmark(${index})">Edit</button>
<button onclick="deleteBookmark(${index})">Delete</button>
</div>
</div>
`
})

document.getElementById("total").innerText=bookmarks.length
document.getElementById("fav").innerText=fav
document.getElementById("today").innerText=today
}

function deleteBookmark(index){
let bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
bookmarks.splice(index,1)
localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
displayBookmarks()
}


function editBookmark(index){
let bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
let title=prompt("Edit Title",bookmarks[index].title)
let url=prompt("Edit URL",bookmarks[index].url)
bookmarks[index]={...bookmarks[index],title,url}
localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
displayBookmarks()
}


function favorite(index){
let bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
bookmarks[index].fav=!bookmarks[index].fav
localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
displayBookmarks()
}


function searchBookmark(){

let input=document.getElementById("search").value.toLowerCase()

let bookmarks=JSON.parse(localStorage.getItem("bookmarks")) || []

let list=document.getElementById("bookmarkList")

list.innerHTML=""

bookmarks.filter(b=>b.title.toLowerCase().includes(input))
.forEach((b)=>{
list.innerHTML+=`
<div class="bookmark">
<a href="${b.url}" target="_blank">${b.title}</a>
</div>
`
})
}


function openFeedback(){
document.getElementById("feedbackPopup").style.display="block"
}

function closeFeedback(){
document.getElementById("feedbackPopup").style.display="none"
}


function showMessage(text){
let box=document.getElementById("messageBox")
box.innerText=text
box.style.display="block"

setTimeout(()=>{
box.style.display="none"
},3000)
}


function submitFeedback(reason){
showMessage("Feedback received: " + reason)
closeFeedback()
}

function submitCustomFeedback(){
let text=document.getElementById("customFeedback").value

if(text===""){
showMessage("Please enter feedback")
return
}

showMessage("Feedback received: " + text)
closeFeedback()
}

window.onload=displayBookmarks