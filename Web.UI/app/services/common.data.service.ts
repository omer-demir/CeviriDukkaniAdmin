﻿/// <reference path="../../typings/index.d.ts" />

declare var $: JQueryStatic;

interface IDataService {
    getNationalities(callback: any): void;
    getTongues(callback: any): void;
    getCountries(callback: any): void;
    getSpecialization(callback: any): void;
    getTranslationSoftwares(callback: any): void;
    getCurrencies(callback: any): void;
}

class DataService implements IDataService {
    private commonApiUrl: string = "/api/v1/commonapi/";
    private userApiUrl: string = "/api/v1/userapi/";

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

    getCountries(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCountries',
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
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getTranslationSoftwares(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCountries',
            type: 'GET',
            success: callback
        };

        return $.ajax(settings);
    }

    getCurrencies(callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.commonApiUrl + 'getCountries',
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

    saveUser(data: User, callback: any) {
        var settings: JQueryAjaxSettings = {
            url: this.userApiUrl + 'addUser',
            type: 'POST',
            data: data,
            success: callback
        };

        return $.ajax(settings);
    }
}