function dismissContactModal() {
    $('#contactModal').modal('hide');
    $('#contactName').val('');
    $('#contactEmail').val('');
    $('#contactPhone').val('');
    $('#contactMessage').val('');
    $('#projectName').val('');
    $('#projectLocation').val('');
    $('#designEngineer').val('');
    $('#projectEquipment').val('');
    $('#projectType').val('');
    $('#contactButton').html('Send Message');
}

function validateForm() {
    if ($('#contactName').val() == '' ||
        $('#contactEmail').val() == '' ||
        $('#contactPhone').val() == '' ||
        $('#contactMessage').val() == '')
        return false;
    else
        return true;
}

$('#contactButton').click(function() {
    if (validateForm()) {
       $('#contactButton').html('Sending...');

       var contactData = {
        "sendersName" : $('#contactName').val(),
        "email" : $('#contactEmail').val(),
        "phone" : $('#contactPhone').val(),
        "msg": $('#contactMessage').val() + '\n' + 'Project: ' + $('#projectName').val() + '\n' + 'Location: ' + $('#projectLocation').val() + '\n' + 'Engineer: ' + $('#designEngineer').val() + '\n' + "Equipment: " + $('#projectEquipment').val() + '\n' + "Project Type: " + $('#projectType').val()
       };

       $.ajax({
            type: "POST",
            url: "https://9vndfrb2ae.execute-api.us-west-2.amazonaws.com/prod/lambda-mailer",
            data: JSON.stringify(contactData),
            contentType: 'application/json',
            success: function() {
                $('#contactButton').html('Message sent!');
                setTimeout(dismissContactModal, 1000);
            }
        });
    } else {
        $('#contactSubmit').click();
    }
});