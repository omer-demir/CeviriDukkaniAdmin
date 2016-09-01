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
            baseOptions.placeholder = 'Select an option';
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
    return Util;
}());
//# sourceMappingURL=util.js.map