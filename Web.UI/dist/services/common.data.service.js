var DataService = (function () {
    function DataService() {
        this.commonApiUrl = "/api/v1/commonapi/";
        this.userApiUrl = "/api/v1/userapi/";
    }
    DataService.prototype.getNationalities = function (callback) {
        var settings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.getTongues = function (callback) {
        var settings = {
            url: this.commonApiUrl + 'getTongues',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.getCountries = function (callback) {
        var settings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.getSoftwares = function (callback) {
        var settings = {
            url: this.commonApiUrl + 'getSoftwares',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.getSpecialization = function (callback) {
        var settings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.getTranslationSoftwares = function (callback) {
        var settings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.getCurrencies = function (callback) {
        var settings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.getCountriesAndCity = function (callback) {
        var settings = {
            url: '/app/countriesToCities.json',
            type: 'GET',
            success: callback
        };
        return $.ajax(settings);
    };
    DataService.prototype.saveUser = function (data, callback) {
        var settings = {
            url: this.userApiUrl + 'addUser',
            type: 'POST',
            data: data,
            success: callback
        };
        return $.ajax(settings);
    };
    return DataService;
}());
//# sourceMappingURL=common.data.service.js.map