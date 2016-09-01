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
            baseOptions.placeholder = 'Select an option';
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
}