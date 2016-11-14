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
        dataService.getCompanies(function (data) {
            var orderedData = _.orderBy(data, ["name"], ["asc"]);
            var comp = new Company();
            comp.id = -1;
            comp.name = "Firma Ekle";
            orderedData.unshift(comp);
            $("#company-Id").select2(Util.extendOptions(Util.getAsSelectData(orderedData), { placeholder: 'Şirket Seçiniz' }));
            $("#company-Id").select2("val", -1);
        });
    }
    function getCustomerFromForm() {
        var customer = new Customer();
        if ($('input[name="rbCustomerType"]:checked').val() == "customer") {
            customer.membershipTypeId = 1;
        }
        else {
            customer.membershipTypeId = 2;
            customer.company = geCompanyFromForm();
            customer.companyId = $('#company-Id').val();
            customer.institutionCode = $('#institutionCode').val();
        }
        customer.name = $('#customer-name').val();
        customer.surname = $('#customer-surname').val();
        customer.mobilePhone = $('#customer-cellphone_1').val() + $('#customer-cellphone_2').val() + $('#customer-cellphone_3').val() + $('#customer-cellphone_4').val();
        customer.email = $('#customer-email').val();
        customer.password = $('#customer-password').val();
        return customer;
    }
    function geCompanyFromForm() {
        var company = new Company();
        company.name = $('#company-name').val();
        company.taxNumber = $('#company-taxNumber').val();
        company.taxOffice = $('#company-taxOffice').val();
        company.phone = $('#company-phone_1').val() + $('#company-phone_2').val() + $('#company-phone_3').val() + $('#company-phone_4').val();
        company.extensionNumber = $('#company-extensionNumber').val();
        company.accountingEmail = $('#company-accountingEmail').val();
        company.address = $('#company-address').val();
        //company.authorizedEmail = $('#company-authorizedEmail').val();
        //company.authorizedFullName = $('#company-authorizedFullName').val();
        //company.authorizedMobilePhone = $('#company-authorizedMobilePhone').val();
        //company.isContractPrice = $('#company-isContractPrice').val();
        //company.isUsingPo = $('#company-isUsingPo').val();        
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
        $('input[type=radio][name=rbCustomerType]').change(function () {
            if (this.value == 'customer') {
                changeVisibleByClassName("company", false);
            }
            else {
                changeVisibleByClassName("company", true);
            }
        });
        $('#company-Id').on({
            'select2:select': function (e) {
                if (e.params.data.id == -1) {
                    changeVisibleByClassName("companyInfo", true);
                }
                else {
                    changeVisibleByClassName("companyInfo", false);
                }
            },
            'select2:unselect': function () {
                changeVisibleByClassName("companyInfo", true);
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