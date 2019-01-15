// var form = document.getElementById('add_relays_score_form');

$(document).ready(function() {
    var distanceField = document.getElementsByName('distanceInput')[0];
    var strokeField = document.getElementsByName('strokeInput')[0];
    var form  = document.getElementById('add_relays_score_form');

    var numOfSplits = 0;
    create_relays_splits_form_fields(distanceField.value);

    console.log(distanceField);
    console.log(strokeField);
    strokeField.addEventListener('input', function (evt) {
      delete_all_splits_field();
      create_relays_splits_form_fields(distanceField.value);

});

    distanceField.addEventListener('input', function (evt) {
        delete_all_splits_field();
        create_relays_splits_form_fields(distanceField.value);

});

function create_relays_splits_form_fields(distance) {
    var messages = document.getElementById('messages');
    messages.innerHTML = "";
    console.log(distance);
    switch (distance) {
        case '4 X 50':
            numOfSplits = 4;
            break;
        case '4 X 100':
            numOfSplits = 8;
            break;
        case '4 X 200':
            numOfSplits = 16;
            break;
    }
    console.log(numOfSplits);



    var table = document.getElementById('form_table');

    for (i = 1; i < numOfSplits; i++) {


        var new_row = document.createElement('tr');
        new_row.setAttribute('id', 'split_tr_' + i);

        var new_cell = document.createElement("td");

        var new_div = document.createElement('div');
        new_div.innerHTML = i * 50 + 'M:';
        new_cell.appendChild(new_div);
        new_row.appendChild(new_cell);


        var new_input = document.createElement('input');

        new_input.setAttribute('type', 'time');
        new_input.setAttribute('name', 'split_time_' + i);
        new_input.setAttribute('step', '1');
        new_input.setAttribute('min', '0');
        new_input.setAttribute('max', '99');
        form.append(new_input);

        new_cell = document.createElement("td");
        new_cell.appendChild(new_input);
        new_row.appendChild(new_cell);

        table.append(new_row);
    }

}

function delete_all_splits_field () {

    var table = document.getElementById('form_table');

    for (i=1; i < numOfSplits; i++) {
        var table_row = document.getElementById('split_tr_' + i);
        table_row.remove();
    }
    numOfSplits = 0;


}


    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serializeArray();
        var newFormData = [];


        //packing all splits to array
        formData.push({name: 'type', value: 'relays_score'});
        i=1;
        var splits = [];
        for (var key in formData) {
            if (formData[key].name === 'split_time_' + i) {
                splits.push(formData[key].value);
                i++;
            }
            else {
                newFormData.push(formData[key]);
            }
        }

        newFormData.push({name: 'splits', value: JSON.stringify(splits)});
        console.log(newFormData);
        console.log(JSON.stringify(newFormData));
        console.log(splits);
        console.log(JSON.stringify(splits));

        // Submit the form using AJAX.
        jQuery.ajax({
            type: "POST",
            url: '../nemos_main.php',
            dataType: 'json',
            async: false,

            data: {functionname: 'add_relays_score', arguments: [JSON.stringify(newFormData)]},

            success: function (obj, textstatus) {

                if (!('error' in obj)) {
                    var messages = document.getElementById('messages');
                    messages.innerHTML = obj.result;
                    console.log('added');

                }
                else {
                    console.log(obj.error);
                    console.log('error');
                }
            }
        });
        console.log(newFormData);
    });




    function create_splits_form_fields(distance) {
        var messages = document.getElementById('messages');
        messages.innerHTML = "";
        numOfSplits = distance / 50;
        var table = document.getElementById('form_table');


        for (i = 1; i < numOfSplits; i++) {


            var new_row = document.createElement('tr');
            new_row.setAttribute('id', 'split_tr_' + i);

            var new_cell = document.createElement("td");

            var new_div = document.createElement('div');
            new_div.innerHTML = i * 50 + 'M:';
            new_cell.appendChild(new_div);
            new_row.appendChild(new_cell);


            var new_input = document.createElement('input');

            new_input.setAttribute('type', 'time');
            new_input.setAttribute('name', 'split_time_' + i);
            new_input.setAttribute('step', '1');
            new_input.setAttribute('min', '0');
            new_input.setAttribute('max', '99');
            form.append(new_input);

            new_cell = document.createElement("td");
            new_cell.appendChild(new_input);
            new_row.appendChild(new_cell);

            table.append(new_row);
        }

    }
    function delete_all_splits_field () {

        var table = document.getElementById('form_table');

        for (i=1; i < numOfSplits; i++) {
            var table_row = document.getElementById('split_tr_' + i);
            table_row.remove();
        }
        numOfSplits = 0;


    }


});


