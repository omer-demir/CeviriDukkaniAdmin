require(['../../common'], function (common) {
    require(['utility'], function (utility) {
        $(function () {

            //variables
            var utilityObj = new utility();

            //private funcs
            var editCustomer = function (userDto) {
                return $.ajax({
                    url: '/api/v1/customerapi/editCustomer',
                    type: 'POST',
                    data: userDto
                });
            };
            var memberShipTypeControl = function() {
                $('#ddlCompanies').prop('disabled', $('#ddlRole').val() == utilityObj.MEMBERSHIPTYPE.singular.id);
            };
            var initPage = function () {


                memberShipTypeControl();

                //validator
                $.validator.addMethod('memberShipType', function (value, element, param) {
                    if ($('#CompanyId').val() == utilityObj.MEMBERSHIPTYPE.singular.id) {
                        return true;
                    }
                    return value !== '';
                }, 'Bu alanın doldurulması zorunludur!');
                $("#formValidate").validate({
                    rules: {
                        Name: {
                            required: true,
                            minlength: 5
                        },
                        Surname: {
                            required: true,
                            minlength: 5
                        },
                        Password: {
                            required: true,
                            minlength: 5
                        },
                        Email: {
                            required: true,
                            email: true
                        },
                        MembershipTypeId: 'required',
                        CompanyId: { memberShipTypeId: true }
                    },
                    //For custom messages
                    messages: {
                        Name: {
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
                        Id: $('#hdnCustomerId').val(),
                        Name: $('#txtName').val(),
                        SurName: $('#txtSurname').val(),
                        MobilePhone: $('#txtMobilePhone').val(),
                        //InstitutionCode: $('#txtInstitutionCode').val(),
                        Email: $('#txtEmail').val(),
                        Password: $('#txtPassword').val(),
                        MembershipTypeId: $('#ddlRole').val(),
                        CompanyId: $('#ddlCompanies').val()
                    };
                    editCustomer(customerDto).success(function (customer) {
                        window.location.href = "/Admin/Customer";
                    });
                }
            });
            $('#ddlRole').change(function () {
                memberShipTypeControl();
            });

            initPage();
        });
    });
});