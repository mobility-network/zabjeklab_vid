//Analysis
var inNote = document.getElementById("fnote");
var tblNote = document.getElementById("tbl-note");
var btnAddNote = document.getElementById("btn-addnote");
var btnReset = document.getElementById("btn-reset");
var vidPlay1;
videojs('vid-1').ready(function(){
    // Store the video object
    vidPlay1 = this, id = vidPlay1.id();
});

console.log(videojs.getPlayers())

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
    var nTime = vidPlay1.currentTime();
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

//#region UI SET
window.onload = function() {
    updateAnlUITable();
}