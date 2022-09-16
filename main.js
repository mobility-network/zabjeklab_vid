const videoSrc = document.getElementById("v1-src");
const videoTag = document.getElementById("vid-1");
const inputTag = document.getElementById("input-tag");
//Analysis
var inNote = document.getElementById("fnote");
var tblNote = document.getElementById("tbl-note");
var btnAddNote = document.getElementById("btn-addnote");
var btnReset = document.getElementById("btn-reset");

var tbl_notes = {
    "Index": [],
    "Time": [],
    "Note": [],
}

function updateAnlUITable() {
    tblNote.innerHTML = "";
    
    var table = "";
    var metrics = ["Index", "Time", "Notes"]; // Index, Time, Note
    var colwidth = [15, 15, 70];
    var cols = metrics.length;

    // HEADER ROW
    table += "<tr>";
    for (c=0; c<cols; c++) {
        table += "<th class='tbl-col' style='width:" + colwidth[c] + "%'>" + metrics[c] + "</th>";
    }
    table += "</tr>";

    // NOTE ROWS
    var rows = tbl_notes.Index.length;
    if (rows>0) {
        for (r=0; r<rows; r++) {
            table += "<tr>";
            table += "<th class='tbl-col' style='width:" + colwidth[0] + "%'>" + tbl_notes.Index[r] + "</th>";
            table += "<th class='tbl-col' style='width:" + colwidth[1] + "%'>" + tbl_notes.Time[r] + "</th>";
            table += "<th class='tbl-col' style='width:" + colwidth[2] + "%'>" + tbl_notes.Note[r] + "</th>";
            table += "</tr>";
        }
    }

    tblNote.innerHTML = table;
}

btnAddNote.onclick = function() {
    var nIndex = tbl_notes.Note.length + 1;
    var nTime = videoTag.currentTime;
    var nText = inNote.value;

    tbl_notes.Index.push(nIndex)
    tbl_notes.Time.push(nTime)
    tbl_notes.Note.push(nText)

    updateAnlUITable()
}

btnReset.onclick = function() {
    tbl_notes.Index = [];
    tbl_notes.Time = [];
    tbl_notes.Note = [];

    updateAnlUITable()
}

inputTag.addEventListener('change',  readVideo)

function readVideo(event) {
  console.log(event.target.files)
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      console.log('loaded')
      videoSrc.src = e.target.result
      videoTag.load()
    }.bind(this)

    reader.readAsDataURL(event.target.files[0]);
  }
}

//#region UI SET
window.onload = function() {
    updateAnlUITable();
}