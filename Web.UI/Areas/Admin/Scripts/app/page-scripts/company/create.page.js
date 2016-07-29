require(['../../common'], function (common) {
    require([], function () {
        $(function () {

            //variables

            //private funcs
            var addCompany = function (companyDto) {
                return $.ajax({
                    url: '/api/v1/commonapi/addCompany',
                    type: 'POST',
                    data: companyDto
                });
            };
            var initPage = function () {

                $("#formValidate").validate({
                    rules: {
                        name: {
                            required: true,
                            minlength: 5
                        },
                        authorizedFullName: {
                            required: true
                        },
                        'mobile-phone': {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
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
            };

            //events
            $('#btnSave').click(function () {
                if ($("#formValidate").valid()) {
                    var companyDto = {
                        Name: $('#txtName').val(),
                        TaxNumber: $('#txtTaxNumber').val(),
                        TaxOffice: $('#txtTaxOffice').val(),
                        Phone: $('#txtPhone').val(),
                        ExtensionNumber: $('#txtExtensionNumber').val(),
                        AccountingEmail: $('#txtAccountingEmail').val(),
                        Address: $('#txtAddress').val(),
                        AuthorizedEmail: $('#txtAuthorizedEmail').val(),
                        AuthorizedFullName: $('#txtAuthorizedFullName').val(),
                        AuthorizedMobilePhone: $('#txtAuthorizedMobilePhone').val(),
                        IsContractPrice: $('#chkContractPricek').prop('checked'),
                        IsUsingPo: $('#chkUsedPO').prop('checked')
                    };
                    addCompany(companyDto).success(function (company) {
                        window.location.href = "/Admin/Company";
                    });
                }
            });

            

            initPage();
        });
    });
});