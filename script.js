$(document).ready(function(){
    addQuoteLine(); // add first row to quote grid

   $("#add_row").click(function(){
       addQuoteLine();
   });

   $('#quote-grid').on('blur', '.unit-price-input', function() {
      alert('Action!')
   });

   $('#del_row').click(function(){
       // delete a row
   });

});

function addQuoteLine() {
    // count number of existing rows
    var lineNum = $(".quote-line").length + 1;
    var partLine = ['<div class="quote-line" id="line'+lineNum+'">',
                        '<div class="pnum-line">',
                            '<table class="pnum-line-table">',
                                '<tr>',
                                    '<th>Line</th>',
                                    '<th>Part Number</th>',
                                    '<th>Description</th>',
                                    '<th>Rev</th>',
                                    '<th>Drawing</th>',
                                '</tr>',
                                '<tr>',
                                    '<td>'+lineNum+'</td>',
                                    '<td><input type="text" size="20"></td>',
                                    '<td><input type="text" size="40"></td>',
                                    '<td><input type="text" size="4"></td>',
                                    '<td><input type="text" size="20"></td>',
                                '</tr>',
                            '</table>',
                        '</div><!--.pnum-line -->'].join('');
    var lineComment = ['<div class="line-comment"><textarea placeholder="Line comments..." ></textarea></div>']
    var qtyLine = ['<div class="qty-line">',
                        '<div class="qty-line-left"></div>',
                        '<div class="qty-line-right"><table class="qty-line-table">',
                            '<tr>',
                                '<th>Quantity</th>',
                                '<th>Unit Price</th>',
                                '<th>Net Price</th>',
                            '</tr>',
                            '<tr>',
                                '<td><input type="number" class="qty-input"></td>',
                                '<td><input type="number" class="unit-price-input" min="0.01" step="0.01"></td>',
                                '<td><p class="net-price"></p></td>',
                            '</tr>',
                        '</table></div><!--.qty-line-right-->',
                    '</div><!--.qty-line-->',
                    '<div class="quote-line-controls"><a href="#" onclick="return false;" class="del-row">Delete Row</a></div>',
                '</div><!--.quote-line -->'].join('');

        $('#quote-grid').append(partLine + lineComment + qtyLine);

}
