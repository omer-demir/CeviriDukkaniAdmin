/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/util.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
((function () {
    var dataService = new DataService;
    var countriesCities = [];
    var technologyKnowledges = new Array();
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
            $("#Software").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select software' }));
        });
        dataService.getSpecialization(function (data) {
            $("#Specialization").select2(Util.extendOptions(Util.getAsSelectData(data), { multiple: true }));
        });
        dataService.getLanguages(function (data) {
            $("#SourceLanguageId").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select source language' }));
        });
        $('#WorkingDays').select2(Util.extendOptions(Constants.Days, { multiple: true }));
        $('#country').on({
            'select2:select': function (e) {
                var country = countriesCities.find(function (item) { return (item.id == e.params.data.id); });
                initCityWithData(country.cities);
            },
            'select2:unselect': function () {
                $('#City').select2("val", "-1");
            }
        });
        $('#SourceLanguageId').on({
            'select2:select': function (e) {
                dataService.getTargetLanguages(e.params.data.id, function (data) {
                    $("#TargetLanguageId").select2(Util.extendOptions(Util.getAsSelectData(data), { placeholder: 'Please select target language' }));
                });
            },
            'select2:unselect': function () {
                $('#TargetLanguageId').select2("val", "-1");
            }
        });
        $('#nextTo2').on('click', function () {
            var rules = {
                name: { required: true },
                surname: { required: true },
                email: { required: true, email: true },
                mobilePhone: { required: true },
                password: { required: true, minlength: 4, maxlength: 8 },
                repassword: { required: true, minlength: 4, maxlength: 8, equalTo: '#password' },
                agreement: { checkbox: true }
            };
            Util.handleValidationForm('form1', rules, function (a) { $('ul.tabs').tabs('select_tab', 'tab2'); });
            if ($('#form1').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab2');
            }
        });
        $('#nextTo3').on('click', function () {
            var rules = {
                country: { required: true },
                City: { required: true },
                district: { required: true },
                address: { required: true }
            };
            Util.handleValidationForm('form2', rules, function (a) { $('ul.tabs').tabs('select_tab', 'tab3'); });
            if ($('#form2').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab3');
            }
        });
        $('#nextTo4').on('click', function () {
            var rules = {
                motherTongue: { required: true },
                tongue: { required: true },
                translation: { required: true },
                reviews: { required: true },
                proofReading: { required: true },
                qualityEnsureDescription: { required: true },
                qualifications: { required: true },
                Specialization: { required: true }
            };
            Util.handleValidationForm('form3', rules, function (a) { $('ul.tabs').tabs('select_tab', 'tab4'); });
            if ($('#form3').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab4');
            }
        });
        $('#addSoftware').on('click', function () {
            var rules = {
                Software: { required: true }
            };
            Util.handleValidationForm('form4', rules, function (a) { });
            if ($('#form4').valid()) {
                var software = $('#Software').select2('data')[0].text;
                var technologyKnowledge = new TechnologyKnowledge();
                technologyKnowledge.SoftwareId = $('#Software').val();
                technologyKnowledge.SoftwareVersion = $('#Version').val();
                technologyKnowledge.OperatingSystem = $('#OperatingSystem').val();
                technologyKnowledge.Rating = $('#Rating').val();
                //software.UserAbilityId = $('#mobilePhone').val();
                technologyKnowledges.push(technologyKnowledge);
                var $table = $('#softwareKnowledge');
                var $tableBody = $table.find('tbody');
                var itemTemplate = "<tr><td>" + software + "</td><td>" + technologyKnowledge.SoftwareVersion + "</td><td>" + technologyKnowledge.OperatingSystem + "</td><td>" + technologyKnowledge.Rating + "</td></tr>";
                $(itemTemplate).appendTo($tableBody);
            }
        });
        $('#nextTo6').on('click', function () {
            switch ($('#bankAccountType').val()) {
                case 1:
                    var rules = {
                        bankName: { required: true },
                        accountHolderFullName: { required: true },
                        IBAN: { required: true },
                        minimumChargeAmount: { required: true }
                    };
                    Util.handleValidationForm('form5', rules, function (a) { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                    break;
                case 2:
                    var rules2 = {
                        bankName: { required: true },
                        accountHolderFullName: { required: true },
                        beneficiaryAddress: { required: true },
                        accountNumber: { required: true },
                        swiftBicCode: { required: true },
                        cityCountryBank: { required: true },
                        bankAddress: { required: true },
                        minimumChargeAmount: { required: true }
                    };
                    Util.handleValidationForm('form5', rules2, function (a) { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                    break;
                case 3:
                    var rules3 = {
                        paypalEmailAddress: { required: true, email: true },
                        minimumChargeAmount: { required: true }
                    };
                    Util.handleValidationForm('form5', rules3, function (a) { $('ul.tabs').tabs('select_tab', 'nextTo6'); });
                    break;
                default:
            }
            if ($('#form4').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab5');
            }
        });
        $('#addRate').on('click', function () {
            var $table = $('#translatorRate');
            var $tableBody = $table.find('tbody');
            var service = $('#ServiceTypeId').select2('data')[0].text;
            var sourceLanguage = $('#SourceLanguageId').select2('data')[0].text;
            var targetLanguage = $('#TargetLanguageId').select2('data')[0].text;
            var price = $('#Price').val();
            var sworn = $('#SwornOrCertified').prop('checked');
            var itemTemplate = "<tr><td>" + service + "</td><td>" + sourceLanguage + "</td><td>" + targetLanguage + "</td><td>" + price + "</td><td>" + sworn + "</td></tr>";
            $(itemTemplate).appendTo($tableBody);
        });
        $('#nextTo7').on('click', function () {
            var rules = {
                ServiceType: { required: true },
                SourceLanguage: { required: true },
                TargetLanguage: { required: true },
                minimumChargeAmount: { required: true }
            };
            Util.handleValidationForm('form6', rules, function (a) { $('ul.tabs').tabs('select_tab', 'tab4'); });
            if ($('#form6').valid()) {
                $('ul.tabs').tabs('select_tab', 'tab7');
            }
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
                userAbility.technologyKnowledges = technologyKnowledges;
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
    });
})());
//# sourceMappingURL=translator.sign.up.js.map