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
    });
})());
//# sourceMappingURL=translator.sign.up.js.map