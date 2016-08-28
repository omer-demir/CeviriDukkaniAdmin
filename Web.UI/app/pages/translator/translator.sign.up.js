/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
((function () {
    var dataService = new DataService;
    var countriesCities = [];
    function getAsSelectData(data) {
        var castedData = data;
        var selectData = castedData.map(function (c) {
            return ({ id: c.id, text: c.name });
        });
        return selectData;
    }
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
    function extendOptions(data, options) {
        var baseOptions = options || {};
        baseOptions.data = data;
        baseOptions.width = "element";
        baseOptions.placeholder = 'Select an option';
        baseOptions.allowClear = true;
        return baseOptions;
    }
    function initCityWithData(data) {
        $('#City').select2(extendOptions(data));
    }
    $(function () {
        $('select').select2();
        dataService.getCountries(function (data) {
            $("#Nationality").select2(extendOptions(getAsSelectData(data)));
            $("#Nationality2").select2(extendOptions(getAsSelectData(data)));
        });
        dataService.getTongues(function (data) {
            $("#MotherTongue").select2(extendOptions(getAsSelectData(data)));
            $("#Tongue").select2(extendOptions(getAsSelectData(data)));
        });
        dataService.getCountriesAndCity(function (data) {
            countriesCities = getAsData(data);
            var opt = extendOptions(countriesCities);
            $('#country').select2(opt);
            $('#Resident').select2(opt);
        });
        dataService.getSoftwares(function (data) {
            $("#Software").select2(extendOptions(getAsSelectData(data), { multiple: true }));
        });
        dataService.getSpecialization(function (data) {
            $("#Specialization").select2(extendOptions(getAsSelectData(data), { multiple: true }));
        });
        $('#WorkingDays').select2(extendOptions(Constants.Days, { multiple: true }));
        $('#country').on('select2:select', function (e) {
            var country = countriesCities.find(function (item) { return (item.id == e.params.data.id); });
            initCityWithData(country.cities);
        });
        function PageValidations() {
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
        $('input[type=radio][name=bankAccountType]').change(function () {
            ChangeVisibleByClassName("Turkish", false);
            ChangeVisibleByClassName("European", false);
            ChangeVisibleByClassName("PayPal", false);
            $('#spnAccountTypeHeader').text(this.value);
            if (this.value == 'Turkish') {
                ChangeVisibleByClassName("Turkish", true);
            }
            else if (this.value == 'European') {
                ChangeVisibleByClassName("European", true);
            }
            else if (this.value == 'PayPal') {
                ChangeVisibleByClassName("PayPal", true);
            }
        });
        function ChangeVisibleByClassName(className, visible) {
            var elements = document.getElementsByClassName(className);
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.hidden = !visible;
            }
        }
        $("#btnSave").on("click", function (data) {
            if (PageValidations()) {
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
                userAbility.tongue = $('#tongue').val();
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
                bankAccount.bankName = $('#bankName').val();
                bankAccount.accountHolderFullName = $('#accountHolderFullName').val();
                bankAccount.IBAN = $('#IBAN').val();
                bankAccount.paypalEmailAddress = $('#paypalEmailAddress').val();
                bankAccount.beneficiaryAddress = $('#beneficiaryAddress').val();
                bankAccount.accountNumber = $('#accountNumber').val();
                bankAccount.swiftBicCode = $('#swiftBicCode').val();
                bankAccount.cityCountryBank = $('#cityCountryBank').val();
                bankAccount.bankAddress = $('#bankAddress').val();
                userPayment.bankAccount = bankAccount;
                userPayment.vatTaxNo = $('#vatTaxNo').val();
                userPayment.currencyId = $('#currencyId').val();
                userPayment.workingTypeId = $('#workingTypeId').val();
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