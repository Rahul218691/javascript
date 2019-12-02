document.getElementById('myform').addEventListener('submit', savebookmark);

function savebookmark(e){

var sitename = document.getElementById('sitename').value;
var siteurl = document.getElementById('siteurl').value;

if(!validation(sitename, siteurl)){
    return false;
}

var bookmark = {
    name: sitename,
    url: siteurl
}

//local storage

// localStorage.setItem('test', 'Hello worls');
// localStorage.getItem('test');
//console.log(localStorage);
//console.log(localStorage);
//console.log(bookmark);

// localStorage.removeItem('test');
if(localStorage.getItem('bookmarks') === null){
var bookmarks = [];
bookmarks.push(bookmark);
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}else{
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}


document.getElementById('myform').reset();

fetchbookmarks();
    e.preventDefault();
}


//delete

function deletebook(url){
//console.log(url);
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
for(var i=0;i<bookmarks.length; i++){
if(bookmarks[i].url == url){
    bookmarks.splice(i, 1);

}
}
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
fetchbookmarks();
}




//fetch bookmarks
function fetchbookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   // console.log(bookmarks);
   var bookmarksres = document.getElementById('bookmarkres');
   bookmarksres.innerHTML = '';
   for(var i=0; i<bookmarks.length; i++){
var name = bookmarks[i].name;
var url = bookmarks[i].url;
bookmarksres.innerHTML += '<div class ="card card-body bg-light">'+
'<h3>'+name+
' <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a>'+
' <a onclick="deletebook(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
'</h3>'
'</div>'
;
   }
}


function validation(sitename,siteurl){
    if(!sitename || !siteurl){
        alert('please fill the form');
        return false;
    }
    
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteurl.match(regex)){
    alert('Please use a valid URL');
    return false;
    }
    return true;
}