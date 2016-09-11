/// <reference path="../../typings/globals/jquery.validation/index.d.ts" />
$.validator.addMethod('checkbox', function (value, element, param) {
    if ($(element).prop('checked')) {
        return true;
    }
    return false;
}, 'This field is required');
var Util = (function () {
    function Util() {
    }
    Util.convertToSelect2Data = function (data) {
        var tempResult = new Array();
        data.forEach(function (item) {
            if (item.name) {
                tempResult.push({ id: item.id, text: item.name });
            }
            else {
                tempResult.push({ id: item.id, text: item.description });
            }
        });
        return tempResult;
    };
    Util.extendOptions = function (data, options) {
        var baseOptions = options || {};
        baseOptions.data = data;
        baseOptions.width = "element";
        if (!options || !options.placeholder) {
            baseOptions.placeholder = {
                id: '-1',
                text: 'Select an option'
            };
        }
        else {
            baseOptions.placeholder = {
                id: '-1',
                text: options.placeholder
            };
        }
        baseOptions.allowClear = true;
        return baseOptions;
    };
    Util.getAsSelectData = function (data) {
        var castedData = data;
        var selectData = castedData.map(function (c) {
            return ({ id: c.id, text: c.name });
        });
        return selectData;
    };
    Util.handleValidationForm = function (elem, rules, callback) {
        var form2 = $(elem);
        form2.validate({
            errorClass: 'invalid',
            validClass: 'valid',
            focusInvalid: false,
            ignore: "",
            rules: rules,
            errorPlacement: function (error, element) {
                var $elem = $(element);
                var $label = $(element).siblings("label[for='" + $elem.attr("id") + "']");
                if ($label.length > 0) {
                    $label.attr('data-error', error.text());
                }
                else {
                    $elem.siblings('.select2').css('border', '1px solid red');
                }
            },
            success: function (label, element) {
                var $elem = $(element);
                var $label = $(element).siblings("label[for='" + $elem.attr("id") + "']");
                if ($label.length > 0) {
                    $label.attr('data-error', '');
                }
                else {
                    $elem.siblings('.select2').css('border', 'none');
                }
            },
            submitHandler: callback
        });
    };
    return Util;
}());
//# sourceMappingURL=util.js.map