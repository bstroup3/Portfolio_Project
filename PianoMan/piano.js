var typing=false;

function enableTyping()
{
  typing=true;
}

function disableTyping()
{
  typing=false;
}

window.addEventListener("keydown", function (event) {
  if(!typing){
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  if(event.key != "Shift") {
    if(playNoteByKey(event.key)) {
      event.preventDefault();
    }
  } else {
    toggleShowKeys();
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }
}
}, true);
window.addEventListener('keydown', function(event) {
  if(!typing)
  {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  switch (event.key) {
    case "ArrowLeft":
        document.getElementById('majorBox').click();
        checkMajor();
        break;
    case "ArrowRight":
        document.getElementById('minorBox').click();
        checkMinor();
        break;
  }
}

});

var notePlayed;
var cheatCode = [];
var times = 0;
var ChordsToPlay = [];

var showKeys = false;
var noteList = ["C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5", "C6"];
var keyList = ["q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u", "i", "9", "o", "0", "p", "z", "s", "x", "d", "c", "f", "v", "b", "h", "n", "j", "m", ",", "l", ".", ";", "/", "'", "]", "\\"];
var keyDown = [];
for(var i = 0; i<noteList.length; i++) {
  keyDown.push(false);
}

window.addEventListener("keyup", function (event) {


  if(keyUp(event.key)) {
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }
}, true);

function playNoteByKey(key) {
  for(var i = 0; i<keyList.length; i++) {
    if(key == keyList[i] && !keyDown[i]) {
      play(noteList[i]);
      playMajor(i);
      playMinor(i);
      keyDown[i] = true; //prevents sound from playing multiple times from one press
      if(showKeys) { //highlights played key
        document.getElementById(noteList[i]).style.borderColor = "red";
        document.getElementById(noteList[i]).style.borderWidth = "5px";
      }
      return true;
    }
  }
  return false;
}

function keyUp(key) {
  for(var i = 0; i<keyList.length; i++) {
    if(key == keyList[i]) {
      keyDown[i] = false;
      document.getElementById(noteList[i]).style.borderColor = "unset";
      document.getElementById(noteList[i]).style.borderWidth = "1px";
      return true;
    }
  }
  return false;
}

function toggleShowKeys() {
  for(var i = 0; i<noteList.length; i++) {
    if(showKeys) {
      document.getElementById("p" + noteList[i]).remove();
      if(document.getElementById(noteList[i]).children[0]) {
        document.getElementById(noteList[i]).children[0].setAttribute("style", "padding-top: 330%; padding-left: 32%; padding-right: 32%;");
      }
    } else {
      var par = document.createElement("P"); //creating p div
      par.setAttribute("id", "p" + noteList[i]);
      if(noteList[i].length == 2) { //black or white key
        par.setAttribute("style", "padding-top: 0%; padding-left: 32%; padding-right: 32%;");
      } else {
        par.setAttribute("style", "color:white; padding-top: 0%; padding-left: 32%; padding-right: 32%;");
      }
      var text = document.createTextNode(keyList[i]);
      par.appendChild(text);
      if(document.getElementById(noteList[i]).children[0]) { //keeping other elements formating
        document.getElementById(noteList[i]).children[0].setAttribute("style", "padding-top: 259%; padding-left: 32%; padding-right: 32%;");
      }
      document.getElementById(noteList[i]).prepend(par); //adding to top
    }
  }
  showKeys = !showKeys;
}
function play(note){
    notePlayed = new Audio('./notes/'+note+'.mp3');
    notePlayed.currentTime = 0;
    notePlayed.play();
    document.getElementById(note+"note").style.display = "block";
    if(note.length==3)
  {
    document.getElementById(note[0]+note[2]+"note").style.display = "block";
  }
  setTimeout(() => {
    document.getElementById(note+"note").style.display = "none";
   if(note.length==3)
   {
     document.getElementById(note[0]+note[2]+"note").style.display = "none";
   }
  }, 800);
}

function endNote(note){
  notePlayed.pause();
  notePlayed.currentTime = 0;
  document.getElementById(note+"note").style.display = "none";
   if(note.length==3)
   {
     document.getElementById(note[0]+note[2]+"note").style.display = "none";
   }
}
var minor = false;
var major = false;
function checkMinor(){
  if(document.getElementById('majorBox').checked){
    document.getElementById('majorBox').checked = false;
    major = false;
  }
    if(document.getElementById('minorBox').checked){
      minor = true;
    }
    else{
      minor = false;
    }
}

function checkMajor(){
  if(document.getElementById('minorBox').checked){
    document.getElementById('minorBox').checked = false;
    minor = false;
  }
  if(document.getElementById('majorBox').checked){
    major = true;
  }
  else{
    major = false;
  }
}

function playMajor(index){
  if(major){
    if(index >= 30 && index<33){
      play(noteList[index]);
      play(noteList[index+4]);
      play(noteList[(index+7)-12]);
    }
    if(index >= 33){
      play(noteList[index]);
      play(noteList[(index+4)-12]);
      play(noteList[(index+7)-12]);
    }
    else{
      play(noteList[index]);
      play(noteList[index+4]);
      play(noteList[index+7]);
    }
  }
}

function playMinor(index){
  if(minor){
    if(index >= 30 && index<33){
      play(noteList[index]);
      play(noteList[index+3]);
      play(noteList[(index+7)-12]);
    }
    if(index >= 33){
      play(noteList[index]);
      play(noteList[(index-12)+3]);
      play(noteList[(index-12)+7]);
    }
    else{
      play(noteList[index]);
      play(noteList[index+3]);
      play(noteList[index+7]);
    }
  }
}

function openNav() {
  document.getElementById("sidebar").style.width = "200px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}

function CheatCodeCheck(){
  if(times != 4){
    return;
  }
  var check = ['E5', 'E5', 'E5', 'E4','Eb5','Eb5','Eb5','Eb4','Db5','Db5','Db5','Db4','A4','A4','Ab4','E5'];
  for(var i = 0; i < check.length; i++){
    if(check[i] != cheatCode[i]){
      cheatCode = [];
      times = 0;
      return;
    }
  }
  var runaway = new Audio('./notes/runaway.mp3');
  setTimeout(() => { runaway.play(); }, 750);
  runaway.currentTime = 0;
  times = 0;
}

function resetcheat(){
  times = 0;
  cheatCode = [];
}
//clocks Eb5 Eb4.Bb4 Bb3.G4 G3.Eb5 Eb4.Bb4 Bb3.G4 G3.Eb5 Eb4.Bb4 Bb3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.C5 C4.Ab4 Ab3.F4 F3.C5 C4.Ab4 Ab3.F4 F3.C5 C4.Ab4 Ab3.Eb5 Eb4.Bb4 Bb3.G4 G3.Eb5 Eb4.Bb4 Bb3.G4 G3.Eb5 Eb4.Bb4 Bb3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.F4 F3.Db5 Db4.Bb4 Bb3.C5 C4.Ab4 Ab3.F4 F3.C5 C4.Ab4 Ab3.F4 F3.C5 C4.Ab4 Ab3
//B4...A4...Ab4...A4...C5.....D5...C5...B4...C5...E5.....F5...E5...Eb5...E5...B5...A5...Ab5...A5...B5...A5...Ab5...A5...C6......A5...C6...G5.A5.B5...Gb5 B5...E5 G5...Gb5 B5...G5.A5.B5...Gb5 B5...E5 G5...Gb5 B5...G5.A5.B5...Gb5 B5...E5 G5...Eb5 Gb5...E5......B4...A4...Ab4...A4...C5.....D5...C5...B4...C5...E5.....F5...E5...Eb5...E5...B5...A5...Ab5...A5...B5...A5...Ab5...A5...C6......A5...C6...G5.A5.B5...Gb5 B5...E5 G5...Gb5 B5...G5.A5.B5...Gb5 B5...E5 G5...Gb5 B5...G5.A5.B5...Gb5 B5...E5 G5...Eb5 Gb5...E5......C5 E5...D5 F5...E5 G5...E5 G5...A5..G5..F5..E5..B4 D5...G4...C5 E5...D5 F5...E5 G5...E5 G5...A5..G5..F5..E5..D5 B4......A4 C5...B4 D5...C5 E5...C5 E5...F5..E5..D5..C5..B4 Ab4...E4...A4 C5...B4 D5...C5 E5...C5 E5...F5..E5..D5..C5..B4 Ab4......B4...A4...Ab4...A4...C5.....D5...C5...B4...C5...E5.....F5...E5...Eb5...E5...B5...A5...Ab5...A5...B5...A5...Ab5...A5...C6......A5...B5...C6...B5...A5...Ab5...A5...E5...F5...D5...C5...B4....A4..B4..A4 D4..D4..D5...A4...Ab4..G4..F4...D4..F4..G4..C4..C4..D5...A4...Ab4..G4..F4...D4..F4..G4..B3..B3..D5...A4...Ab4..G4..F4...D4..F4..G4..Bb3..Bb3..D5...A4...Ab4..G4..F4...D4..F4..G4 C4..D4..F4..D4..D4 F4 A4....D4 F4 A4....C4 E4 G4......C4..D4..F4..D4..C4 E4 G4....C4 E4 G4....F4 D4 A3....C4..D4..F4..D4..F4 D4 Bb3....G4..C4 E4...D4..C4......C4...C4 A3 G4......F4 D4 A3........C4..D4..F4..D4..D4 F4 A4....D4 F4 A4....C4 E4 G4......C4..D4..F4..D4..C4 C5......E4..F4...E4..D4..C4..D4..F4..D4..F4 D4 Bb4......G4..E4 C4...D4..C4......C4..G4 C4 A4......F4 D4 A4
function customSong(){
  var notes=document.getElementById("textbox").value;
  customSongRec(notes);
}

function customSongRec(notes)
{
  var customNote='';
  for(var i=0; i<=notes.length; i++)
  {
    if(notes[i]==' '||i==notes.length)
    {
      play(customNote);
      customNote='';
    }
    else if(notes[i]=='.')
    {
      if(customNote.length!=0)
      {
      play(customNote);
      document.getElementById(customNote).style.borderColor = "red";
      document.getElementById(customNote).style.borderWidth = "5px";
      }
      setTimeout(() => {
      document.getElementById(customNote).style.borderColor = "unset";
      document.getElementById(customNote).style.borderWidth = "1px";}, 200);
      if(i!=notes.length)
      setTimeout(() => { customSongRec(notes.substring(i+1, notes.length)); }, (60/document.getElementById("BPM").innerText)*1000);
      break;
    }
    else
    {
      customNote+=notes[i];
    }
  }
}

function hideNotes(){
  for(var i=0; i<document.getElementById("notes").children.length; i++)
  {
    document.getElementById("notes").children[i].style.display = "none";
  }
}
