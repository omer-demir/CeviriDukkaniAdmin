require(['../../common'],
    function (common) {
        require(['utility', 'lodash','dxdatagrid'],
            function (utility, _) {
                
                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;
                    var resources = null;
                    var editName;
                    //private funcs
                    var getTerminologies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getTerminologies'
                        });
                    };
                    var addTerminology = function (terminologyDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/addTerminology',
                            type: 'POST',
                            data: terminologyDto
                        });
                    };
                    var editTerminology = function (terminologyDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/editTerminology',
                            type: 'POST',
                            data: terminologyDto
                        });
                    };
                    var initPage = function () {
                        getTerminologies()
                            .success(function (list) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: list,
                                    paging: { pageSize: 10 },
                                    columns: [
                                        {
                                            width: "auto",
                                            caption: "#",
                                            alignment: 'center',
                                            cellTemplate: function (container, e) {
                                                var index = dataGrid.pageIndex() * dataGrid.pageSize() + e.rowIndex + 1;
                                                container.text(index);
                                            }
                                        },
                                        {
                                            dataField: 'name',
                                            caption: resources.adi,
                                            validationRules: [
                                            {
                                                type: 'required',
                                                message: resources.adiAlaniBosOlamaz
                                            },
                                            {
                                                type: 'custom',
                                                message: resources.adiAlaniHerKayitIcinTekOlmalidir,
                                                validationCallback: function (o) {
                                                    if (_.filter(list, function (item) { return item !== editName && item.name.toLocaleLowerCase() === o.value.toLocaleLowerCase() }).length > 0) {
                                                        return false;
                                                    }
                                                    return true;
                                                }
                                            }]
                                        },
                                         {
                                             dataField: 'active',
                                             caption: resources.durum
                                         }
                                    ],
                                    onRowInserted: function (e) {
                                        addTerminology(e.data).success(function (terminology) {
                                            //initPage();
                                            Materialize.toast(resources.kayitBasarili, 3000);
                                        });
                                    },
                                    onEditingStart: function (info) {
                                        editName = info.data;
                                    },
                                    onRowUpdated: function (e) {
                                        editTerminology(e.key).success(function (terminology) {
                                            Materialize.toast(resources.kayitBasarili, 3000);
                                        });
                                    }
                                    , editing: {
                                        insertEnabled: true,
                                        editEnabled: true,
                                        texts: {
                                            editRow: resources.duzenle,
                                            saveRowChanges: resources.kaydet,
                                            cancelRowChanges: resources.iptal
                                        }
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#terminologyListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#terminologyListGrid').dxDataGrid('instance');
                            });
                    };

                    var getResources = function () {
                        var keyList = [
                            'Adi',
                            'AdiAlaniBosOlamaz',
                            'AdiAlaniHerKayitIcinTekOlmalidir',
                            'KayitBasarili',
                            'Durum',
                            'Duzenle',
                            'Kaydet',
                            'Iptal'
                        ];
                        var resourceName = 'terminologyManage';
                        $.when(utilityObj.initResources(keyList, resourceName)).then(function () {
                            resources = JSON.parse(localStorage.getItem(resourceName));
                            initPage();
                        });
                    };
                    getResources();
                });
            });
    });