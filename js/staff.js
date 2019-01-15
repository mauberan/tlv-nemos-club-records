var swimmers = document.getElementById('swimmers_page');
var events = document.getElementById('events_page');
var scores = document.getElementById('scores_page');
var relays = document.getElementById('relays_page');
var currentTable = null;
var numOfSplits = 0;

$(document).ready(function(){
    swimmers.style.display = "none";

    events.style.display = "none";
    scores.style.display = "none";
    relays.style.display = "none";


    $('#staff_menu').children().on('click', function(e){
        swimmers.style.display = "none";

        events.style.display = "none";
        scores.style.display = "none";
        relays.style.display = "none";

        var selected = null;
        switch(this.id) {
            case 'swimmers':
                currentTable = swimmers;
                break;

            case 'events':
                currentTable = events;
                break;
            case 'relays':
                currentTable = relays;

                var relays_distance_input = document.getElementsByName('relaysDistanceInput')[0];

                delete_all_splits_field();

                // console.log(relays_distance_input);
                create_relays_splits_form_fields(relays_distance_input.value);

                relays_distance_input.addEventListener('input', function (evt) {
                    delete_all_splits_field();
                    create_relays_splits_form_fields(this.value);
                });

                break;
            case 'scores':
                currentTable =  scores;
                var dis = document.getElementsByName('scoreDistanceInput');
                console.log(dis[0].value);
                create_splits_form_fields(dis[0].value);


                document.getElementsByName('scoreStrokeInput')[0].addEventListener('input', function (evt) {

                    delete_all_splits_field();
                    dis = document.getElementsByName('scoreDistanceInput');
                    console.log(dis[0].value);



                    if (is_valid_distance(document.getElementsByName('scoreStrokeInput')[0].value,document.getElementsByName('scoreDistanceInput')[0].value)) {
                        dis = document.getElementsByName('scoreDistanceInput');
                        create_splits_form_fields(dis.value);
                    }
                    else {
                        document.getElementById('scores_splits').innerHTML="Not A Valid distance";
                        delete_all_splits_field();
                    }
                });

                document.getElementsByName('scoreDistanceInput')[0].addEventListener('input', function (evt) {

                    delete_all_splits_field();
                    if (is_valid_distance(document.getElementsByName('scoreStrokeInput')[0].value,document.getElementsByName('scoreDistanceInput')[0].value)) {
                        create_splits_form_fields(document.getElementsByName('scoreDistanceInput')[0].value);
                    }
                    else {
                        document.getElementById('scores_splits').innerHTML="Not A Valid distance";

                    }
                });

                break;


        }
        currentTable.style.display = "inline-table";
        renderTable();




    });



});

$('#add_event_form').submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $('#add_event_form').serializeArray();
    console.log(formData);

    jQuery.ajax({
        type: "POST",
        url: 'nemos_main.php',
        dataType: 'json',
        async: false,

        data: {functionname: 'add_event', arguments: [JSON.stringify(formData)]},

        success: function (obj, textstatus) {

            if (!('error' in obj)) {
                renderTable();
               alert(obj.result);

            }
            else {
                console.log(obj.error);
                alert('error');
            }
        }
    });

});

$('#add_swimmer_form').submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $('#add_swimmer_form').serializeArray();
    console.log(formData);

    // (if formData)
    if (formData[0].value && formData[1].value && formData[5].value) {

        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',
            async: false,

            data: {functionname: 'add_swimmer', arguments: [JSON.stringify(formData)]},

            success: function (obj, textstatus) {

                if (!('error' in obj)) {
                    alert('Swimmer Added');
                    renderTable();
                }
                else {
                    alert('Error');
                    console.log('error');
                }
            }
        });
    }
    else {
        alert('Firstname , Lastname & Year of birth are MANDATORY fields');
    }

});

$('#add_score_form').submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $('#add_score_form').serializeArray();
    // console.log(formData);
    var newFormData = [];


    //packing all splits to array
    formData.push({name: 'type', value: 'score'});
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


    // console.log(JSON.stringify(newFormData));
    // console.log(splits);
    // console.log(JSON.stringify(splits));

    // Submit the form using AJAX.


    jQuery.ajax({
        type: "POST",
        url: 'nemos_main.php',
        dataType: 'json',
        async: false,

        data: {functionname: 'add_score', arguments: [JSON.stringify(newFormData)]},

        success: function (obj, textstatus) {

            if (!('error' in obj)) {
                alert(obj.result);
                console.log('added');
                renderTable();
                document.getElementById("add_score_form").reset();
                delete_all_splits_field();

            }
            else {
                console.log(obj.error);
                alert('error');
            }
        }
    });

});

$('#add_relays_score_form').submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $('#add_relays_score_form').serializeArray();
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
            url: 'nemos_main.php',
            dataType: 'json',
            async: false,

            data: {functionname: 'add_relays_score', arguments: [JSON.stringify(newFormData)]},

            success: function (obj, textstatus) {

                if (!('error' in obj)) {
                    var messages = document.getElementById('messages');
                    alert(obj.result);
                    console.log(obj.result);

                    renderTable();
                    document.getElementById("add_relays_score_form").reset();
                    delete_all_splits_field();
                    create_relays_splits_form_fields()


                }
                else {
                    console.log(obj.error);
                    console.log('error');
                }
            }
        });
        console.log(newFormData);
    });



function getFirsKeyName(data) {
        for (var prop in data)
            return prop;
}

function renderTable() {
    if (currentTable != null) {
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: 'site_managment_query', arguments: [currentTable.id.slice(0,-5)]},

            success: function (obj, textstatus) {
                var ret = [];
                var out = '';

                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    // console.log(currentTable.id.slice(0,-5) + '_data');

                    document.getElementById(currentTable.id.slice(0,-5) + '_data').innerHTML = buildStaffTable(null, yourVariable);
                    deleteButtons = document.getElementsByName('delete');

                    for (var i = 0; i < deleteButtons.length; i++) {
                        deleteButtons[i].addEventListener('click', onDeleteClick, true);
                    }

                }
                else {
                    console.log(obj.error);
                }
            }
        });
    }
}

function buildStaffTable(type,results) {
    out = '';

    out+= '<div class="staff-table-row">';

    for (var key in results[0]) {
        if (key != 'splits') {
            out += '<span class="staff-table-col headline">' + key + '</span>';
        }
        // ...
    }
    out += '</div>';

    results.forEach(function (row){
        out+= '<div class="staff-table-row">';
        rowIdentifier = getFirsKeyName(row);

        for (var key in row) {
            if (key == 'splits') {
                out += '<span name="edit" id="edit_' + row[rowIdentifier] + '" class="staff-table-col button">EDIT</span>';
                out += '<span name="delete" id="delete_' + row[rowIdentifier] + '"class="staff-table-col button">DELETE</span>';
                out += '</div><div class="staff-table-row">';

            }
                out += '<span class="staff-table-col">' + row[key] + '</span>';

        }

        if (currentTable.id != 'scores_page' && currentTable.id != 'relays_page') {
            out += '<span name="edit" id="edit_' + row[rowIdentifier] + '" class="staff-table-col button">EDIT</span>';
            out += '<span name="delete" id="delete_' + row[rowIdentifier] + '"class="staff-table-col button">DELETE</span>';
        }


        // console.log(row);
        out += '</div>';


});
    return out;
}

function onDeleteClick() {
    identifer = this.id.substr(7);

    if (window.confirm('Delete ' + currentTable.id.slice(0,-6) + ' #' + identifer + ' Are you sure?')) {
        func = null;
        switch (currentTable.id.slice(0,-5)) {
            case 'swimmers':
                func = 'delete_swimmer';
                break;

            case 'events':
                func = 'delete_event';
                break;
            case 'relays':
                func = 'delete_relays';

                break;
            case 'scores':
                func =  'delete_score';
                break;
        }
        jQuery.ajax({
            type: "POST",
            url: 'nemos_main.php',
            dataType: 'json',


            data: {functionname: func, arguments: [identifer]},

            success: function (obj, textstatus) {
                var ret = [];
                var out ='';

                if (!('error' in obj)) {
                    yourVariable = obj.result;
                    renderTable();

                    alert(yourVariable);

                }
                else {
                    console.log(obj.error);
                }
            }
        });


}

}

function onEditClick() {
    // currentTable.childNodes[3].innerHTML = buildStaffTable(currentTable,yourVariable);
}

function create_splits_form_fields(distance) {
     disp = null;
    if (currentTable.id == 'scores_page') {
        form = document.getElementById('add_score_form')
        var table = document.getElementById('scores_form_table');
    }
    else {
        form = document.getElementById('add_relays_score_form')
        var table = document.getElementById('form_table');

    }
    var out = "";
    numOfSplits = distance / 50;
    var messages = document.getElementById('scores_splits');
    messages.innerHTML = "";
    numOfSplits = distance / 50;


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
        new_input.setAttribute('step', '0.001');
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
    if (currentTable.id == 'scores_page') {
        var table = document.getElementById('scores_form_table');
    }
    else if (currentTable.id == 'relays_page') {
        var table = document.getElementById('form_table');

    }

    if (table) {

        for (i = 1; i < numOfSplits; i++) {
            var table_row = document.getElementById('split_tr_' + i);
            table_row.remove();
        }
        numOfSplits = 0;
    }
    else {
        console.log('no table defined');
    }

}

function is_valid_distance(inStroke,inDistance) {
    var legal_strokes = [
        '50 FS',
        '100 FS',
        '200 FS',
        '400 FS',
        '800 FS',
        '1500 FS',

        '50 BRS',
        '100 BRS',
        '200 BRS',

        '50 BS',
        '100 BS',
        '200 BS',

        '50 FLY',
        '100 FLY',
        '200 FLY',
        '100 IM',
        '200 IM',
        '400 IM',
    ];

    input = inDistance.toString() + " " + inStroke;
    if (legal_strokes.includes(input))
        return true;
    return false;
}

function create_relays_splits_form_fields(distance) {

    var messages = document.getElementById('relays_splits');
    messages.innerHTML = "";
    // console.log(distance);
    switch (distance) {
        case '4 X 50':
            numOfSplits = 4;
            cut = 50;
            break;
        case '4 X 100':
            numOfSplits = 8;
            cut = 100;
            break;
        case '4 X 200':
            numOfSplits = 16;
            cut = 200;
            break;
    }
    // console.log(numOfSplits);



    var table = document.getElementById('relays_form_table');

    for (i = 1; i < numOfSplits; i++) {


        var new_row = document.createElement('tr');
        new_row.setAttribute('id', 'split_tr_' + i);

        var new_cell = document.createElement("td");

        var new_div = document.createElement('div');
        new_div.innerHTML = i * 50 + 'M:';
        new_cell.appendChild(new_div);
        new_row.appendChild(new_cell);


        var new_input = document.createElement('input');
        if (((i * 50 ) % cut) == 0  ) {
            new_input.required = true;
        }
        new_input.setAttribute('type', 'time');
        new_input.setAttribute('name', 'split_time_' + i);
        new_input.setAttribute('step', '0.001');
        new_input.setAttribute('min', '0');
        new_input.setAttribute('max', '99');
        document.getElementById('add_relays_score_form').append(new_input);

        new_cell = document.createElement("td");
        new_cell.appendChild(new_input);
        new_row.appendChild(new_cell);

        table.append(new_row);
    }

}