/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
/// <reference path="../../../typings/globals/lodash/index.d.ts" />
declare var $: JQueryStatic;

((() => {
    var dataService = new DataService;

    function changeVisibleByClassName(className: string, visible: boolean) {
        let elements: NodeListOf<HTMLElement> = document.getElementsByClassName(className) as NodeListOf<HTMLElement>;

        for (var i = 0; i < elements.length; i++) {
            let element: HTMLElement = elements[i];
            element.hidden = !visible;
        }
    }
    function initializeDropdowns() {
        $('select').select2({ placeholder: 'Please select any option' });
    }



    function getCustomerFromForm(): Customer {
        let customer = new Customer();

        customer.company = geCompanyFromForm();
        customer.companyId = $('#companyId').val();
        customer.email = $('#email').val();
        customer.institutionCode = $('#institutionCode').val();
        customer.membershipTypeId = $('input[name="membershipTypeId"]:checked').val();;
        customer.mobilePhone = $('#mobilePhone').val();
        customer.name = $('#name').val();
        customer.password = $('#password').val();
        customer.surname = $('#surname').val();
        return customer;
    }

    function geCompanyFromForm(): Company {
        let company = new Company();

        company.accountingEmail = $('#accountingEmail').val();
        company.address = $('#address').val();
        company.authorizedEmail = $('#authorizedEmail').val();
        company.authorizedFullName = $('#authorizedFullName').val();
        company.authorizedMobilePhone = $('#authorizedMobilePhone').val();
        company.extensionNumber = $('#extensionNumber').val();
        company.isContractPrice = $('#isContractPrice').val();
        company.isUsingPo = $('#isUsingPo').val();
        company.name = $('#name').val();
        company.phone = $('#phone').val();
        company.taxNumber = $('#taxNumber').val();
        company.taxOffice = $('#taxOffice').val();
        return company;
    }
    function validateForm(formElement: string, rules: any[], successCallback: (param: number) => void) {
        Util.handleValidationForm(formElement, rules, successCallback);
        return $(formElement).valid();
    }

    function getHashedValue(): string {
        var href = window.location.href.split('/');
        return href[href.length - 1];
    }

    $(() => {
        initializeDropdowns();

        var formRules: any = {
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
            'select2:select': (e: any) => {
                if (e.params.data.id == 0) {
                    changeVisibleByClassName("companyinfo", false);
                }
                else {
                    changeVisibleByClassName("companyinfo", true);
                }
            },
            'select2:unselect': () => {
                changeVisibleByClassName("companyinfo", true);
            }
        });

        /**
         * Wizard events
         */

        $("#btnSave").on("click", (data: any) => {

            let customer = getCustomerFromForm();

            dataService.saveCustomer(customer, (data: any) => {
                toastr.info('Your registration saved. We will get in touch with you soon.', 'Information');
            });
        });
    });

})());

