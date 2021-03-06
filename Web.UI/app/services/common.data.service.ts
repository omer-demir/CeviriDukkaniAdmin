﻿/// <reference path="../../typings/index.d.ts" />

declare var $: JQueryStatic;

interface IDataService {
    getNationalities(callback: any): void;
    getTongues(callback: any): void;
    getCountries(callback: any): void;
    getSpecialization(callback: any): void;
    getTranslationSoftwares(callback: any): void;
    getCurrencies(callback: any): void;
    getLanguages(callback: any): void;
    getTargetLanguages(sourceLanguageId: number, callback: any): void;
    getTerminologies(callback: any): void;
}

class DataService implements IDataService {
    private commonApiUrl: string = "/api/v1/commonapi/";
    private userApiUrl: string = "/api/v1/userapi/";
    private customerApiUrl: string = "/api/v1/customerapi/";

    getLanguages(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getLanguages',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getTargetLanguages(sourceLanguageId: number, callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getTargetLanguages',
            type: 'GET',
            success: callback,
            data: { sourceLanguageId: sourceLanguageId }
        };

        return $.ajax(settings);
    }

    getTerminologies(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getTerminologies',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getNationalities(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getTongues(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getTongues',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getSoftwares(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getSoftwares',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }
    
    getSpecialization(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getSpecializations',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getTranslationSoftwares(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getSoftwares',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getCurrencies(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCurrencies',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getCountriesAndCity(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: '/app/countriesToCities.json',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getTimezones(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: '/node_modules/timezones.json/timezones.json',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getCountries(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getCitiesByCountryId(callback: any,countryId:number) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCitiesByCountryId',
            type: 'GET',
            success: callback,
            data: { countryId: countryId}
        };

        return $.ajax(settings);
    }

    getDistrictsByCityId(callback: any,cityId:number) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getDistrictByCityId',
            type: 'GET',
            success: callback,
            data: { cityId: cityId }
        };

        return $.ajax(settings);
    }

    getTranslationQualities(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getTranslationQualities',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getWorkingTypes(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getWorkingTypes',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getServiceTypes(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getServiceTypes',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    saveUser(data: User, callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.userApiUrl + 'addUser',
            type: 'POST',
            data: data,
            success: callback
        };

        return $.ajax(settings);
    }

    updateUserRegistration(data: UpdateUserStep, callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.userApiUrl + 'updateUserRegistration',
            type: 'POST',
            data: data,
            success: callback
        };

        return $.ajax(settings);
    }

    getUserRegistration(callback: any, leftOffHash: string) {
        var settings: JQueryAjaxSettings = {
            url: this.userApiUrl + 'getUserRegistration',
            type: 'GET',
            success: callback,
            data: { leftOffHash: leftOffHash }
        };

        return $.ajax(settings);
        
    }

    getCompanies(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCompanies',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    saveCustomer(data: Customer, callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.customerApiUrl + 'addCustomer',
            type: 'POST',
            data: data,
            success: callback
        };

        return $.ajax(settings);
    }
}