/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
/// <reference path="../../../typings/globals/lodash/index.d.ts" />
((function () {
    var dataService = new DataService;
    function changeVisibleByClassName(className, visible) {
        var elements = document.getElementsByClassName(className);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.hidden = !visible;
        }
    }
    function initializeDropdowns() {
        $('select').select2({ placeholder: 'Please select any option' });
    }
    function getCustomerFromForm() {
        var customer = new Customer();
        customer.company = geCompanyFromForm();
        customer.companyId = $('#name').val();
        customer.email = $('#name').val();
        customer.InstitutionCode = $('#name').val();
        customer.membershipTypeId = $('input[name="cmbCustomerType"]:checked').val();
        ;
        customer.mobilePhone = $('#name').val();
        customer.name = $('#name').val();
        customer.password = $('#name').val();
        customer.surname = $('#name').val();
        return customer;
    }
    function geCompanyFromForm() {
        var company = new Company();
        company.accountingEmail = $('#name').val();
        company.address = $('#name').val();
        company.authorizedEmail = $('#name').val();
        company.authorizedFullName = $('#name').val();
        company.authorizedMobilePhone = $('#name').val();
        company.extensionNumber = $('#name').val();
        company.isContractPrice = $('#name').val();
        company.isUsingPo = $('#name').val();
        company.name = $('#name').val();
        company.phone = $('#name').val();
        company.taxNumber = $('#name').val();
        company.taxOffice = $('#name').val();
        return company;
    }
    function validateForm(formElement, rules, successCallback) {
        Util.handleValidationForm(formElement, rules, successCallback);
        return $(formElement).valid();
    }
    function getHashedValue() {
        var href = window.location.href.split('/');
        return href[href.length - 1];
    }
    $(function () {
        initializeDropdowns();
        var formRules = {
            form1: {
                name: { required: true },
                surname: { required: true },
                email: { required: true, email: true },
                mobilePhone: { required: true },
                password: { required: true, minlength: 4, maxlength: 8 },
                repassword: { required: true, minlength: 4, maxlength: 8, equalTo: '#password' },
                agreement: { checkbox: true }
            },
            form2: {
                country: { required: true },
                City: { required: true },
                district: { required: true },
                address: { required: true }
            }
        };
        /**
         * Events
         */
        $('#companyId').on({
            'select2:select': function (e) {
                if (e.params.data.id == 0) {
                    changeVisibleByClassName("companyinfo", false);
                }
                else {
                    changeVisibleByClassName("companyinfo", true);
                }
            },
            'select2:unselect': function () {
                changeVisibleByClassName("companyinfo", true);
            }
        });
        /**
         * Wizard events
         */
        $("#btnSave").on("click", function (data) {
            var customer = getCustomerFromForm();
            dataService.saveCustomer(customer, function (data) {
                toastr.info('Your registration saved. We will get in touch with you soon.', 'Information');
            });
        });
    });
})());
//# sourceMappingURL=SignUp.js.map