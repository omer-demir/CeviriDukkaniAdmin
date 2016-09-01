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
        $('#City').select2(Util.extendOptions(data));
    }
    $(function () {
        $('select').select2();
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
            var opt = Util.extendOptions(countriesCities);
            $('#country').select2(opt);
            $('#Resident').select2(opt);
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
        $("#btnSave").on("click", function (data) {
            if (PageValidations()) {
                var user = new User();
                user.name = $('#name').val();
                user.surname = $('#surname').val();
                user.genderId = $('#genderId').val();
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
                userAbility.motherTongueId = $('#motherTongueId').val();
                userAbility.bilingualTongueId = $('#bilingualTongueId').val();
                userAbility.yearsOfExperience = $('#yearsOfExperience').val();
                var capacity = new Capacity();
                capacity.translation = $('#translation').val();
                capacity.reviews = $('#reviews').val();
                capacity.proofReading = $('#proofReading').val();
                userAbility.capacity = capacity;
                userAbility.qualityEnsureDescription = $('#qualityEnsureDescription').val();
                userAbility.qualifications = $('#qualifications').val();
                userAbility.qualifications = $('#qualifications').val();
                userAbility.mainClients = $('#mainClients').val();
                user.userAbility = userAbility;
                var userPayment = new UserPayment();
                userPayment.bankAccountId = $('#bankAccountId').val();
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
    });
})());
//# sourceMappingURL=translator.sign.up.js.map