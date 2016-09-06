/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
declare var $: JQueryStatic;


((() => {
    var dataService = new DataService;
    var countriesCities: any = [];

    function getAsData(data: any) {
        var result: any = [];
        var i: number = 1;
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                result.push({
                    id: i,
                    text: prop,
                    cities: data[prop]
                });
            }
        }
        return result;
    }
    function initCityWithData(data: any[]) {
        $('#City').select2(Util.extendOptions(data, { placeholder: 'Please select your city' }));
        $("#City").select2("val", "-1");
    }
    function pageValidations() {
        if ($('#password').val() != $('#repassword').val()) {
            alert("Please check password.");
            return false;
        }
        if (!$('#agreement').is(':checked')) {
            alert("Please accept the agreement");
            return false;
        }
        return true;
    }
    function changeVisibleByClassName(className: string, visible: boolean) {
        let elements: NodeListOf<HTMLElement> = document.getElementsByClassName(className) as NodeListOf<HTMLElement>;

        for (var i = 0; i < elements.length; i++) {
            let element: HTMLElement = elements[i];
            element.hidden = !visible;
        }
    }

    $(() => {
        $('ul.tabs').tabs();

        $('select').select2({ placeholder: 'Please select any option' });

        dataService.getCountries((data: any) => {

            $("#Nationality").select2(Util.extendOptions(Util.getAsSelectData(data)));
            $("#Nationality2").select2(Util.extendOptions(Util.getAsSelectData(data)));
        });

        dataService.getTongues((data: any) => {
            $("#MotherTongue").select2(Util.extendOptions(Util.getAsSelectData(data)));
            $("#Tongue").select2(Util.extendOptions(Util.getAsSelectData(data)));

        });

        dataService.getCountriesAndCity((data: any) => {
            countriesCities = getAsData(data);
            var opt = Util.extendOptions(countriesCities, { placeholder: 'Please select country' });
            $('#country').select2(opt);
            $('#Resident').select2(opt);


            $("#country").select2("val", "-1");
            $("#Resident").select2("val", "-1");
        });

        dataService.getSoftwares((data: any) => {
            $("#Software").select2(Util.extendOptions(Util.getAsSelectData(data), { multiple: true }));
        });

        dataService.getSpecialization((data: any) => {
            $("#Specialization").select2(Util.extendOptions(Util.getAsSelectData(data), { multiple: true }));
        });

        $('#WorkingDays').select2(Util.extendOptions(Constants.Days, { multiple: true }));
        

        $('#country').on({
            'select2:select': (e: any) => {
                var country = countriesCities.find((item: any) => (item.id == e.params.data.id));
                initCityWithData(country.cities);
            },
            'select2:unselect':() => {
                $('#City').select2("val", "-1");
            }
        });


        $('#nextTo2').on('click', () => {
            var rules = {
                name: { required: true },
                surname: { required: true },
                email: { required: true, email: true },
                mobilePhone: { required: true },
                password: { required: true, minlength: 4, maxlength: 8 },
                repassword: { required: true, minlength: 4, maxlength: 8, equalTo: '#password' },
                agreement: { checkbox: true }
            };

            Util.handleValidationForm('form', rules, (a: any) => { $('ul.tabs').tabs('select_tab', 'tab2'); });
            if ($('#form').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab2');
            }
        });
        $('#nextTo3').on('click', () => {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab3');
        });
        $('#nextTo4').on('click', () => {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab4');
        });
        $('#nextTo5').on('click', () => {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab5');
        });
        $('#nextTo6').on('click', () => {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab6');
        });
        $('#nextTo7').on('click', () => {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab7');
        });

        $('input[type=radio][name=bankAccountType]').change(function () {

            changeVisibleByClassName("Turkish", false);
            changeVisibleByClassName("European", false);
            changeVisibleByClassName("PayPal", false);

            $('#spnAccountTypeHeader').text(this.value);

            if (this.value == 'Turkish') {
                changeVisibleByClassName("Turkish", true);
            }
            else if (this.value == 'European') {
                changeVisibleByClassName("European", true);
            } else if (this.value == 'PayPal') {
                changeVisibleByClassName("PayPal", true);
            }
        });
        $("#btnSave").on("click", (data: any) => {
            if (pageValidations()) {
                var user = new User();
                user.name = $('#name').val();
                user.surname = $('#surname').val();
                user.email = $('#email').val();
                user.genderId = $('input[name="gender"]:checked').val();
                user.mobilePhone = $('#mobilePhone').val();
                user.password = $('#password').val();

                var userContact = new UserContact();
                userContact.address = $('#address').val();
                userContact.postalCode = $('#postalCode').val();
                userContact.alternativeEmail = $('#alternativeEmail').val();
                userContact.alternativePhone1 = $('#alternativePhone1').val();
                userContact.alternativePhone2 = $('#alternativePhone2').val();
                userContact.fax = $('#fax').val();
                userContact.skype = $('#skype').val();
                userContact.districtId = $('#district').val();
                user.userContact = userContact;

                var userAbility = new UserAbility();
                userAbility.motherTongueId = $('#motherTongue').val();
                userAbility.tongueId = $('#tongue').val();
                userAbility.bilingualTongueId = $('#bilingualTongue').val();
                userAbility.yearsOfExperience = $('#yearsOfExperience').val();
                var capacity = new Capacity();
                capacity.translation = $('#translation').val();
                capacity.reviews = $('#reviews').val();
                capacity.proofReading = $('#proofReading').val();
                userAbility.capacity = capacity;
                userAbility.qualityEnsureDescription = $('#qualityEnsureDescription').val();
                userAbility.qualifications = $('#qualifications').val();
                userAbility.mainClients = $('#mainClients').val();
                userAbility.specializations = $('#specializations').val();
                user.userAbility = userAbility;

                var userPayment = new UserPayment();
                var bankAccount = new BankAccount();
                bankAccount.bankAccountTypeId = $('#bankAccountType').val();
                switch (bankAccount.bankAccountTypeId) {
                    case 1:
                        bankAccount.bankName = $('#bankName').val();
                        bankAccount.accountHolderFullName = $('#accountHolderFullName').val();
                        bankAccount.IBAN = $('#IBAN').val();
                        break;
                    case 2:
                        bankAccount.bankName = $('#bankName').val();
                        bankAccount.accountHolderFullName = $('#accountHolderFullName').val();
                        bankAccount.IBAN = $('#IBAN').val();
                        bankAccount.beneficiaryAddress = $('#beneficiaryAddress').val();
                        bankAccount.accountNumber = $('#accountNumber').val();
                        bankAccount.swiftBicCode = $('#swiftBicCode').val();
                        bankAccount.cityCountryBank = $('#cityCountryBank').val();
                        bankAccount.bankAddress = $('#bankAddress').val();
                        break;
                    case 3:
                        bankAccount.paypalEmailAddress = $('#paypalEmailAddress').val();
                        break;
                    default:
                }
                userPayment.bankAccount = bankAccount;
                userPayment.vatTaxNo = $('#vatTaxNo').val();
                userPayment.currencyId = $('#currency').val();
                userPayment.workingTypeId = $('#workingType').val();
                userPayment.minimumChargeAmount = $('#minimumChargeAmount').val();
                user.userPayment = userPayment;

                dataService.saveUser(user, (data: any) => {
                    alert(data);
                });
            }
        });

    });

})());

