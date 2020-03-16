//Song Class:Represents a song
class Song {
    constructor(title,artist,album){
this.title = title;
this.artist = artist;
this.album = album;
    }
}

//UI Class:Handle UI Tasks
class UI{
    static displaySongs(){
        /*
        const StoredSongs =[
            {
title:'Eagles',
artist:'Pompi',
album:'Bwana'
        },
        {
            title:'Peanut Butter',
            artist:'Pompi',
            album:'Become'
        }];

        const songs = StoredSongs;
        */
       const songs = Store.getSongs();
        songs.forEach((song)=>UI.addSongToList(song))
    }

    static addSongToList(song){
        const list = document.querySelector('#song-list');
        const row = document.createElement('tr');
        row.innerHTML=`
        <td> ${song.title}</td>
        <td> ${song.artist}</td>
        <td> ${song.album}</td>
        <td><a href ="#" class ="btn btn-danger btn-sm delete">x</a></td>
        `;
        list.appendChild(row);
    }

    static deleteSong(el){
if(el.classList.contains('delete')){
    el.parentElement.parentElement.remove();
}
    }

    static showAlert(message, className){
const div = document.createElement('div');
div.className = `alert alert-${className}`;
div.appendChild(document.createTextNode(message));
const container = document.querySelector('.container');
const h1 = document.querySelector('#test');
container.insertBefore(div,h1);

//vanish 3 secs

    }

    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#artist').value ='';
        document.querySelector('#album').value ='';
    }
}
//Store Class:Handle storage
class Store{
    static getSongs(){
let songs;
if(localStorage.getItem('songs')===null){
    songs = [];
}else{
    songs = JSON.parse(localStorage.getItem('songs'));
}
return songs
    }
    //Add a song method
    static addSong(song){
const songs = Store.getSongs();
songs.push(song);
localStorage.setItem('songs',JSON.stringify(songs));
    }

    //Remove a song method
    static removeSong(album){
        const songs = Store.getSongs();

     songs.forEach((song,index) => {
         if(song.album === album){
             songs.splice(index,1);
         }
     });   
     localStorage.setItem('songs', JSON.stringify(songs));
    }
}
//Event:Display a Song
document.addEventListener('DOMContentLoaded',UI.displaySongs);

//Event: Add a Song
document.querySelector('#song-form').addEventListener('submit',
(e)=>{
    //Prevent actual submit
    e.preventDefault();
    //Get Form, Values
    const title = document.querySelector('#title').value;
    const artist = document.querySelector('#artist').value;
    const album = document.querySelector('#album').value;

    //validate and alert
if(title == ''|| artist == ''|| album == ''){
UI.showAlert('Please Fill In All Fields','danger');
}else{

    //instatiate book
    const song = new Song(title,artist,album);

    //Add song to UI
    UI.addSongToList(song);

    //Add song to store
    Store.addSong(song);
    
    //clearfields
    UI.clearFields();
}
}
);



//Event:Remove a Song
document.querySelector('#song-list').addEventListener('click',
(e)=>{
    //Remove song from UI
    UI.deleteSong(e.target);

    //Remove song from store
Store.removeSong(e.target.parentElement.previousElementSibling.textContent);
   
//show success alert
    UI.showAlert('Book Removed','success');
})