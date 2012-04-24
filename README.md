validatrrr
==========

Really simple jQuery Form Validation PlugIn

Usage Example
-------------
  
    $('#contactForm').validateForm({'name': ['required'], 'email': ['required', 'validEmail'], 'notice': ['required']}, function(form) {
        $('.loading').show();
        $('#submit').attr('disabled', true).hide();
        $.post(form.attr('action'), form.serialize(), function(data) {
            $('.loading').html('Ihre Nachricht wurde an uns verschickt. Wir werden uns so schnell wie möglich bei Ihnen melden');
        });
    }, function(form, errors) {
       // Loop through the errors and process them here
       var errorDiv = $('<div></div>');
				
        for(var i = 0; i < errors.length; i++) {
            errorDiv.append('<p>' + errors[i] + '</p>');
        }
        form.prepend(errorDiv);
    });