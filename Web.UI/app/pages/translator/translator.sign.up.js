/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
((function () {
    var dataService = new DataService;
    var countriesCities = [];
    function getAsData(data) {
        var result = [];
        var i = 1;
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
    function initCityWithData(data) {
        $('#City').select2(Util.extendOptions(data, { placeholder: 'Please select your city' }));
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
    function changeVisibleByClassName(className, visible) {
        var elements = document.getElementsByClassName(className);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.hidden = !visible;
        }
    }
    $(function () {
        $('ul.tabs').tabs();
        $('select').select2({ placeholder: 'Please select any option' });
        dataService.getCountries(function (data) {
            $("#Nationality").select2(Util.extendOptions(Util.getAsSelectData(data)));
            $("#Nationality2").select2(Util.extendOptions(Util.getAsSelectData(data)));
        });
        dataService.getTongues(function (data) {
            $("#MotherTongue").select2(Util.extendOptions(Util.getAsSelectData(data)));
            $("#Tongue").select2(Util.extendOptions(Util.getAsSelectData(data)));
        });
        dataService.getCountriesAndCity(function (data) {
            countriesCities = getAsData(data);
            var opt = Util.extendOptions(countriesCities, { placeholder: 'Please select country' });
            $('#country').select2(opt);
            $('#Resident').select2(opt);
            $("#country").select2("val", "-1");
            $("#Resident").select2("val", "-1");
        });
        dataService.getSoftwares(function (data) {
            $("#Software").select2(Util.extendOptions(Util.getAsSelectData(data), { multiple: true }));
        });
        dataService.getSpecialization(function (data) {
            $("#Specialization").select2(Util.extendOptions(Util.getAsSelectData(data), { multiple: true }));
        });
        $('#WorkingDays').select2(Util.extendOptions(Constants.Days, { multiple: true }));
        $('#country').on('select2:select', function (e) {
            var country = countriesCities.find(function (item) { return (item.id == e.params.data.id); });
            initCityWithData(country.cities);
        });
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        function showError(selector, message) {
            $('#' + selector).removeClass('valid').removeClass('invalid').addClass('invalid');
            $('#' + selector).siblings('label[for="' + selector + '"]').attr('data-error', message);
        }
        $('#nextTo2').on('click', function () {
            //validate
            var requiredErrorMessage = 'Please enter value';
            var emailErrorMessage = 'Please enter valid email';
            var rePasswordErrorMessage = 'Please enter the same value';
            var error = false;
            if (!$('#name').val()) {
                showError('name', requiredErrorMessage);
                error = true;
            }
            if (!$('#surname').val()) {
                showError('surname', requiredErrorMessage);
                error = true;
            }
            if (!$('#email').val()) {
                showError('email', requiredErrorMessage);
                error = true;
            }
            if (!validateEmail($('#email').val())) {
                showError('email', emailErrorMessage);
                error = true;
            }
            if (!$('#mobilePhone').val()) {
                showError('mobilePhone', requiredErrorMessage);
                error = true;
            }
            if (!$('#password').val()) {
                showError('password', requiredErrorMessage);
                error = true;
            }
            if (!$('#repassword').val()) {
                showError('repassword', requiredErrorMessage);
                error = true;
            }
            if ($('#repassword').val() !== $('#password').val()) {
                showError('repassword', rePasswordErrorMessage);
                error = true;
            }
            if (!$('#agreement').val()) {
                showError('agreement', requiredErrorMessage);
                error = true;
            }
            if (!error) {
                $('ul.tabs').tabs('select_tab', 'tab2');
            }
        });
        $('#nextTo3').on('click', function () {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab3');
        });
        $('#nextTo4').on('click', function () {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab4');
        });
        $('#nextTo5').on('click', function () {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab5');
        });
        $('#nextTo6').on('click', function () {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab6');
        });
        $('#nextTo7').on('click', function () {
            //validate
            $('ul.tabs').tabs('select_tab', 'tab7');
        });
        $('#repassword').on('keyup', function (e) {
            var $elem = $(e.target);
            var currentVal = $elem.val();
            var passwordVal = $('#password').val();
            if (currentVal !== passwordVal) {
                $elem.removeClass('valid').addClass('invalid');
            }
            else {
                $elem.removeClass('invalid').addClass('valid');
            }
        });
        //
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
            }
            else if (this.value == 'PayPal') {
                changeVisibleByClassName("PayPal", true);
            }
        });
        $("#btnSave").on("click", function (data) {
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
                dataService.saveUser(user, function (data) {
                    alert(data);
                });
            }
        });
        //save.click basılınca
        //new User()
        //user.email=
        //dataService.saveUser
    });
    //Nationality
    //Nationality2
    //MotherTongue
    //Tongue
    //Resident
    //TimeZone
})());
//# sourceMappingURL=translator.sign.up.js.map