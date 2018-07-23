$(document).ready(function(){
    addQuoteLine(); // add first row to quote grid
    reNumber(); // number the first rows

    // Move browse function to div element
    $('#load').click(function() {
        $('input').click();
    })

    // Load JSON data from specified file
    $('#input').change(loadQuote);

    // Save file by downloading JSON object as .json file
    $('#save').click(function() {
        if ( !$('#quote-number').val().length > 0 ) {
            alert("Please assign a quote number before saving");
        }
        else {
            saveQuote();
            $('#save-anchor')[0].click();
        }
    });

    // Add rows using button at bottom of page
   $("#add_row").click(function() {
       addQuoteLine();
       reNumber(); // number rows
   });

   $('#quote-grid').on('change', '.update-price', function() {
       reCalculateNet();
      //alert($(this).closest('div.quote-line').attr("id"))
      //$('p.net-price').text("4");
   });

   // Delete quote lines when link is clicked
   $('#quote-grid').on('click','.del-line', function(){
       $(this).closest('.quote-line').remove();
       reNumber();
   });

});

function loadQuote(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    var text = reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
        console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        $.each(obj, function () {
            var name = this.name;
            $("input[name="+name+"]").val(this.value);
        });
};

function saveQuote() {
    var quoteNum = $('#quote-number').val();
    var header = $('#quote-heading-form').serializeArray();
    var address = $('#customer-address-form').serializeArray();
    var dataArray = $.extend({}, header, address);
    var dataStr = "data:text/json;charset=utf-8 ," + JSON.stringify(dataArray);
    var anchor = $('#save-anchor');
    anchor.attr("href", dataStr );
    anchor.attr("download", "" + quoteNum + ".json");
}

function reCalculateNet() {
    $('tr.calculate').each(function(i){
        var line = $(this);
        var qty = line.find("[name=qty]").val();
        var price = line.find("[name=price]").val();
        if (price != "") {
            line.find("[name=price]").val(parseFloat(price).toFixed(2));
        }
        if (qty == "" | price == "") {
            line.find(('p.net-price')).text("$0.00");
        }
        else {
            var subtotal = parseInt(qty,10) * parseFloat(price);
            line.find(('p.net-price')).text("$" + subtotal.toFixed(2));
        }
    });
}

function reNumber() {
    $('td.line-number').each(function(i){
        $(this).text(i+1);
    });
}

function addQuoteLine() {
    // count number of existing rows
    var lineNum = $(".quote-line").length + 1;
    var partLine = ['<div class="quote-line">',
                        '<div class="pnum-line">',
                            '<table class="pnum-line-table">',
                                '<thead>',
                                    '<tr>',
                                        '<td>Line</td>',
                                        '<td>Part Number</td>',
                                        '<td>Description</td>',
                                        '<td>Rev</td>',
                                        '<td>Drawing</td>',
                                    '</tr>',
                                '</thead>',
                                '<tbody>',
                                    '<tr>',
                                        '<td class="line-number"></td>',
                                        '<td><input type="text" size="20"></td>',
                                        '<td><input type="text" size="40"></td>',
                                        '<td><input type="text" size="4"></td>',
                                        '<td><input type="text" size="20"></td>',
                                    '</tr>',
                                '<tbody>',
                            '</table>',
                        '</div><!--.pnum-line -->'].join('');
    var lineComment = ['<div class="line-comment"><textarea placeholder="Line comments..." ></textarea></div>']
    var qtyLine = ['<div class="qty-line">',
                        '<div class="qty-line-left"></div>',
                        '<div class="qty-line-right"><table class="qty-line-table">',
                            '<thead>',
                                '<tr>',
                                    '<td>Quantity</td>',
                                    '<td>Unit Price</td>',
                                    '<td>Net Price</td>',
                                '</tr>',
                            '</thead>',
                            '<tbody>',
                                '<tr class="calculate">',
                                    '<td><input type="number" name="qty" class="update-price"></td>',
                                    '<td><input type="number" name="price" class="update-price"></td>',
                                    '<td><p class="net-price">$0.00</p></td>',
                                '</tr>',
                            '</tbody>',
                        '</table></div><!--.qty-line-right-->',
                    '</div><!--.qty-line-->',
                    '<div class="quote-line-controls"><a href="#" onclick="return false;" class="del-line">Delete Line</a></div>',
                '</div><!--.quote-line -->'].join('');

        $('#quote-grid').append(partLine + lineComment + qtyLine);
}
