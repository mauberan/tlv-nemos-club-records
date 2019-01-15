var form  = document.getElementById('add_event_form');


$(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serializeArray();
    console.log(formData);

    jQuery.ajax({
        type: "POST",
        url: '../nemos_main.php',
        dataType: 'json',
        async: false,

        data: {functionname: 'add_event', arguments: [JSON.stringify(formData)]},

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

});