

function loadDoc() {

     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
                myFunction(this);
           }
      };
      xhttp.open("GET", "quote_dbase.xml", true);
      xhttp.send();
 }
 function myFunction(xml) {
      var i;
      var xmlDoc = xml.responseXML;
      var table="<tr><th>Test</th><th>Test2</th></tr>";
      var x = xmlDoc.getElementsByTagName("QUOTE");
      for (i = 0; i <x.length; i++) {
           table += "<tr><td>" +
           x[i].getElementsByTagName("QNUM")[0].childNodes[0].nodeValue +
           "</td><td>" +
           x[i].getElementsByTagName("QREV")[0].childNodes[0].nodeValue +
           "</td></tr>";
      }
      document.getElementById("demo").innerHTML = table;
 }
function loadJson() {
     $.getJSON("test.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});
}
