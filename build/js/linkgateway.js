// linkgateway.js
//
// Requests email address when pdf access is first attempted.
//
gUrl = ""

function linkGateway(url) {
	gUrl = url;
	// check for registration cookie
	if (checkCookie()) {
		// we're done and can just show PDF
		console.log("cookie found, url provided is: " + url);
		showPdf();
	} else {
		console.log("cookie not found, showing modal dialog.");
		// show email modal dialog to get email
		$('#gateModal').modal('show');
	}

	return false;
}

function checkCookie() {
	return (getCookie("registered") != "");
}

function validateForm() {
    return ($('#gateName').val() != '' &&
        $('#gateEmail').val() != '' &&
        $('#gateCompany').val() != '');
}

function closeForm() {
	$('#gateName').val('');
	$('#gateEmail').val('');
	$('#gateCompany').val('');
	$('#gateButton').html("submit");
	$('#gateModal').modal('hide');
}

function resetButton() {
	$('#gateButton').html("submit");
}

function showPdf() {
    // present PDF in new tab
    var win = window.open(gUrl, '_blank');
	win.focus();
}

$('#gateButton').click(function() {

	// validation
	if (validateForm()) {
		console.log("form validated...");
		$('#gateButton').html("sending...");
	} else {
		console.log("form validation failed...");
		$('#gateButton').html(" All fields required... ");
		setTimeout(resetButton, 2000);
		return;
	}

	// set cookie
    setCookie("registered", "true", 180);

    // send the data to the server
	var contactData = {
		"sendersName" : $('#gateName').val(),
		"email" : $('#gateEmail').val(),
		"phone" : '',
		"msg": "Name: " + $('#gateName').val() + "\nEmail: " + $('#gateEmail').val() + 
			"\nCompany: " + $('#gateCompany').val() + "\n\nThis user has registered to access PDF documents."
	};

	$.ajax({
        type: "POST",
        url: "https://9vndfrb2ae.execute-api.us-west-2.amazonaws.com/prod/lambda-mailer",
        data: JSON.stringify(contactData),
        contentType: 'application/json',
        success: function() {
            $('#contactButton').html('Message sent!');
        }
    });

    // close the form
    setTimeout(closeForm, 2000);

    // deliver the PDF
    showPdf();
});

function setCookie(name, value, exprdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exprdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}