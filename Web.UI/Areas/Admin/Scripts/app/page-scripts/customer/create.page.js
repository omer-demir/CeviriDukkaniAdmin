require(['../../common'], function (common) {
    require([], function () {
        $(function () {

            //variables

            //private funcs
            var addCustomer = function (customerDto) {
                return $.ajax({
                    url: '/api/v1/customerapi/addCustomer',
                    type: 'POST',
                    data: customerDto
                });
            };
            var initPage = function () {
                //validator
                $.validator.addMethod('institutionCode', function (value, element, param) {
                    return $('#ddlCompanies').val() === '';
                }, 'Bu alanın doldurulması zorunludur!');

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
                        password: {
                            required: true,
                            minlength: 5
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        role: 'required',
                        //institutionCode: { institutionCode:true}
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
                    var customerDto = {
                        Name: $('#txtName').val(),
                        SurName: $('#txtSurname').val(),
                        MobilePhone: $('#txtMobilePhone').val(),
                        //InstitutionCode: $('#txtInstitutionCode').val(),
                        Email: $('#txtEmail').val(),
                        Password: $('#txtPassword').val(),
                        MembershipTypeId: $('#ddlRole').val(),
                        CompanyId: $('#ddlCompanies').val()
                    };
                    addCustomer(customerDto).success(function (user) {
                        window.location.href = "/Admin/Customer";
                        console.log(user);
                    });
                }
            });
            //events
            //$('#ddlCompanies').change(function () {
            //    if ($(this).val() === '') {
            //        $('#dvInstCode').hide();
            //    } else {
            //        $('#dvInstCode').show();
            //    }
            //});

            initPage();


        });
    });
});