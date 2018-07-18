$(document).ready(function(){

   $("#add_row").click(function(){
     numRows = $('#quote-grid-table tr').length
     var lineNum = '<td>' + numRows + '</td>'
     var partNum = '<td><input type="text" size="20"></td>'
     var desc = '<td><input type="text" size="40"></td>'
     var rev = '<td><input type="text" size="4"></td>'
     var dwg = '<td><input type="text" size="20"></td>'
     $('#quote-grid-table > tbody:last-child').append('<tr class="qrow-'+numRows+'">'
     + lineNum + partNum + desc + rev + dwg +'<td><button id="del_row">Delete</td></tr>');

   });

   $("#del_row").click(function(){
     $(this).closest('tr').remove();
     //return false;
   });

});
