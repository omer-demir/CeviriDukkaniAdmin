/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../services/common.data.service.ts" />
/// <reference path="../../classes/ceviri.classes.ts" />
declare var $: JQueryStatic;

((() => {
    var dataService = new DataService;
    var countriesCities: any = [];


    function getAsSelectData(data: any) {
        var castedData = <Array<KeyValue>>data;
        var selectData = castedData.map(c => {
            return ({ id: c.id, text: c.name });
        });

        return selectData;
    }
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

    function extendOptions(data: any, options?: any) {
        var baseOptions = options || {};

        baseOptions.data = data;
        baseOptions.width = "element";
        baseOptions.placeholder = 'Select an option';
        baseOptions.allowClear = true;

        return baseOptions;
    }

    function initCityWithData(data: any[]) {
        $('#City').select2(extendOptions(data));
    }

    $(() => {
        $('select').select2();

        dataService.getCountries((data: any) => {

            $("#Nationality").select2(extendOptions(getAsSelectData(data)));
            $("#Nationality2").select2(extendOptions(getAsSelectData(data)));
        });

        dataService.getTongues((data: any) => {
            $("#MotherTongue").select2(extendOptions(getAsSelectData(data)));
            $("#Tongue").select2(extendOptions(getAsSelectData(data)));

        });

        dataService.getCountriesAndCity((data: any) => {
            countriesCities = getAsData(data);
            var opt = extendOptions(countriesCities);
            $('#country').select2(opt);
            $('#Resident').select2(opt);
        });

        dataService.getSoftwares((data: any) => {
            $("#Software").select2(extendOptions(getAsSelectData(data), { multiple: true }));
        });

        dataService.getSpecialization((data: any) => {
            $("#Specialization").select2(extendOptions(getAsSelectData(data), { multiple: true }));
        });

        $('#WorkingDays').select2(extendOptions(Constants.Days, { multiple: true }));

        $('#country').on('select2:select', (e: any) => {
            var country = countriesCities.find((item: any) => (item.id == e.params.data.id));
            initCityWithData(country.cities);
        });
    });

    //Nationality
    //Nationality2
    //MotherTongue
    //Tongue
    //Resident
    //TimeZone

})());

