$(function () {
    //Left menu active link
    var activeLink = function () {
        var locationUrl = window.location.pathname;
        $('#left-sidebar-nav a[href="' + locationUrl + '"]').closest('.collapsible ').find('.collapsible-header').trigger('click');
        $('#left-sidebar-nav a[href="' + locationUrl + '"]').parent().addClass('active');
    };

    //variables 

    //private funcs
    var getMessageTemplate = function (message, userProp) {
        //<div class="col s12">
        //    <p>Eileen Sideways</p>
        //    <p>Eileen Sideways</p>
        //    <p class="place">Los Angeles, CA</p>
        //</div>'
        var messageHtml = '<div class="row dvMessage" message-id={id}>' +
            '               <div class="col s12">' +
                                '<p><b>{userName}</b></p>' +
                                '<p class="message-title">{subject}</p>' +
                                '<p class="place">{message}</p>' +
                            '</div>' +
                           '</div>';
        messageHtml = messageHtml.supplant({ id: message.id, subject: message.subject, message: message.messageText });
        //userName: message[userProp].name + ' ' + message[userProp].surName,
        if (message[userProp]) {
            messageHtml = messageHtml.supplant({ userName: message[userProp].name + ' ' + message[userProp].surName });
        }
        return messageHtml;
    };
    var getIncomingMessages = function (userId) {
        return $.ajax({
            url: '/api/v1/commonapi/getIncomingMessagesByUser?userId=' + userId
        });
    };
    var getSentMessages = function (userId) {
        return $.ajax({
            url: '/api/v1/commonapi/getSentMessagesByUser?userId=' + userId
        });
    };
    var getMessage = function (messageId) {
        return $.ajax({
            url: '/api/v1/commonapi/getMessage?messageId=' + messageId
        });
    };
    var addMessage = function (messageDto) {
        return $.ajax({
            url: '/api/v1/commonapi/addMessage',
            type: 'POST',
            data: messageDto
        });
    };
    var refreshMessages = function () {
        var userId = $('#hdnUserId').val();
        getIncomingMessages(userId)
            .success(function (data) {
                var html = '';
                $.each(data, function (i, e) {
                    html += getMessageTemplate(e, "fromUser");
                });
                if (html !== '') {
                    $('#incoming-message').html(html);
                }
            });
        getSentMessages(userId)
            .success(function (data) {
                var html = '';
                $.each(data, function (i, e) {
                    html += getMessageTemplate(e, "toUser");
                });
                if (html !== '') {
                    $('#sent-message').html(html);
                }
            });
    };
    //var initPage = function () {
        activeLink();
        refreshMessages();
        $("#formValidate").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                subject: {
                    required: true,
                    minlength: 5
                },
                message: {
                    required: true,
                    minlength: 5
                }
            },
            //For custom messages
            messages: {
                name: {
                    required: "Enter a username",
                    minlength: "Enter at least 5 characters"
                }
            },
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertAfter(element);
                }
            }
        });
        $("#formValidate2").validate({
            rules: {
                replymessage: {
                    required: true,
                    minlength: 5
                }
            },
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertAfter(element);
                }
            }
        });

    //};

    //events
    $('#btnSave').click(function () {
        if ($("#formValidate").valid()) {
            var messageDto = {
                email: $('#txtEmail').val(),
                subject: $('#txtSubject').val(),
                message: $("#txtMessage").val()
            };
            addMessage(messageDto).success(function (user) {
                Materialize.toast('Mesajınız gönderildi.', 3000);
                $('#new-message').closeModal();
                refreshMessages();
            });
        }
    });
    $('#btnReply').click(function () {
        if ($("#formValidate2").valid()) {
            var messageDto = {
                email: $('#hdnEmail').val(),
                subject: $('#spnMessageSubject').html(),
                message: $("#txtReplyMessage").val()
            };
            addMessage(messageDto).success(function (user) {
                Materialize.toast('Mesajınız gönderildi.', 3000);
                $('#reply-message').closeModal();
                refreshMessages();
                $("#txtReplyMessage").val('');
            });
        }
    });
    $(document).on('click', '#incoming-message .dvMessage', function () {
        var messageId = $(this).attr('message-id');
        getMessage(messageId)
            .success(function (message) {
                $('#reply-message').openModal();
                $('#dvMessageDetail').show();
                $('#spnMessageUserName').html(message.fromUser.name + ' ' + message.fromUser.surName);
                $('#spnMessageSubject').html(message.subject);
                $('#spnMessageText').html(message.messageText);
                $('#hdnEmail').val(message.fromUser.email);
            });
    });
    //initPage();
});