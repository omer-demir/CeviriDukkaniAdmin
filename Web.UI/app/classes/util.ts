/// <reference path="../../typings/globals/jquery.validation/index.d.ts" />
$.validator.addMethod('checkbox', (value:any, element:any, param:any) => {
    if ($(element).prop('checked')) {
        return true;
    }
    return false;
}, 'This field is required');
class Util {
    static convertToSelect2Data(data: any) {
        var tempResult = new Array();
        data.forEach((item: any) => {
            if (item.name) {
                tempResult.push({ id: item.id, text: item.name });
            } else {
                tempResult.push({ id: item.id, text: item.description });
            }

        });

        return tempResult;
    }

    static extendOptions(data: any, options?: any) {
        var baseOptions = options || {};

        baseOptions.data = data;
        baseOptions.width = "element";
        if (!options || !options.placeholder) {
            baseOptions.placeholder = {
                id: '-1',
                text: 'Select an option'
            };
        } else {
            baseOptions.placeholder = {
                id: '-1',
                text: options.placeholder
            }
        }

        baseOptions.allowClear = true;

        return baseOptions;
    }

    static getAsSelectData(data: any) {
        var castedData = <Array<KeyValue>>data;
        var selectData = castedData.map(c => {
            return ({ id: c.id, text: c.name });
        });

        return selectData;
    }

    static handleValidationForm(elem: string, rules: any, callback: (form: any)=>void) {
        var form2 = $(elem);

        form2.validate({
            errorClass: 'invalid',
            validClass: 'valid',
            focusInvalid: false,
            ignore: "",
            rules: rules,
            errorPlacement: (error:any, element:any) => { // render error placement for each input type
                $(element).siblings("label[for='" + element.attr("id") + "']").attr('data-error', error.text());
            },
            success: (label: any, element: any) => {
                var $elem=$(element)
                $(element).siblings("label[for='" + $elem.attr("id") + "']").attr('data-error','');
            },
            submitHandler: callback
        });
    }
}