require(['../../common'], function (common) {
    require(['utility'], function (utility) {
        $(function () {

            //variables
            var utilityObj = new utility();
            var userRoleTypes = [];

            //private funcs
            var addUser = function (userDto) {
                return $.ajax({
                    url: '/api/v1/userapi/addUser',
                    type: 'POST',
                    data: userDto
                });
            };
            var getSelectedUserRoles = function () {
                var userRoles = [];
                $.each($('#ddlUserRole').val(),
                    function (i, e) {
                        userRoles.push({ UserRoleType: e });
                    });
                return userRoles;
            };
            //var setAttrUserRoleType = function () {
            //    var i = 0;
            //    $(".dvUserRoles ul li:not(:first-child)")
            //        .each(function () {
            //            $(this).attr('data-id', utilityObj.userRoleTypes[i].id);
            //            i++;
            //        });
            //};
            var initPage = function () {
                //setAttrUserRoleType();
                $("#formValidate").validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 5
                        },
                        surname: {
                            required: true,
                            minlength: 5
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        password: {
                            required: true,
                            minlength: 5
                        },
                        role: 'required',
                        birthDate: 'required'
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
            };

            //events
            $('#btnSave').click(function () {
                if ($("#formValidate").valid()) {
                    var userDto = {
                        Name: $('#txtName').val(),
                        SurName: $('#txtSurname').val(),
                        GenderId: $("input[type='radio'][name='cgender']:checked").val(),
                        MobilePhone: $('#txtMobilePhone').val(),
                        Email: $('#txtEmail').val(),
                        Password: $('#txtPassword').val(),
                        UserRoles: getSelectedUserRoles(),
                        BirthDate: new Date($('.datepicker').val()).toJSON()
                    };
                    addUser(userDto).success(function (user) {
                        window.location.href = "/Admin/User";
                        console.log(user);
                    });
                }
            });
            

            initPage();
        });
    });
});