/// <reference path="../../typings/globals/jquery.validation/index.d.ts" />
$.validator.addMethod('checkbox', (value: any, element: any, param: any) => {
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

    static getAsSelectDataWithKeys(data: any, keyField: string, textField: string) {
        var casted2Data = <Array<any>>data;

        var selectData: { id: number; text: string }[] = casted2Data.map(c => {
            var key = c[keyField];
            var val = c[textField];

            return ({ id: key, text: val });
        });

        return selectData;
    }

    static getAsSelectData(data: any, relatedKey?: string) {

        var selectData: { id: number; text: string }[];
        if (relatedKey) {
            var casted2Data = <Array<any>>data;
            selectData = casted2Data.map(c => {
                var val:any;
                if (relatedKey.indexOf(".") > -1) {
                    var splitted = relatedKey.split('.');
                    var tempVal:any;
                    for (var i = 0; i < splitted.length; i++) {
                        if (tempVal) {
                            tempVal = tempVal[splitted[i]];
                        } else {
                            tempVal = c[splitted[i]];    
                        }
                        
                    }
                    val = tempVal;
                } else {
                    val = c[relatedKey];
                }

                return ({ id: c.id, text: val });
            });
        } else {
            var castedData = <Array<KeyValue>>data;
            selectData = castedData.map(c => {
                return ({ id: c.id, text: c.name });
            });
        }
        return selectData;

    }

    static handleValidationForm(elem: string, rules: any, callback: (form: any) => void) {
        var form2 = $(elem);

        form2.validate({
            errorClass: 'invalid',
            validClass: 'valid',
            focusInvalid: false,
            ignore: "",
            rules: rules,
            errorPlacement: (error: any, element: any) => { // render error placement for each input type
                var $elem = $(element);
                var $label = $(element).siblings("label[for='" + $elem.attr("id") + "']");
                if ($label.length > 0) {
                    $label.attr('data-error', error.text());
                } else {
                    $elem.siblings('.select2').css('border', '1px solid red');
                }
            },
            success: (label: any, element: any) => {
                var $elem = $(element);
                var $label = $(element).siblings("label[for='" + $elem.attr("id") + "']");
                if ($label.length > 0) {
                    $label.attr('data-error', '');
                } else {
                    $elem.siblings('.select2').css('border', 'none');
                }

            },
            submitHandler: callback
        });
    }
}