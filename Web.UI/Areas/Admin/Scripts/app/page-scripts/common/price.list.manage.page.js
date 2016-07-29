require(['../../common'],
    function (common) {
        require(['utility','lodash', 'dxdatagrid'],
            function (utility, _) {

                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;
                    var priceList;
                    var languages;
                    //private funcs
                    var getPriceLists = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getPriceLists'
                        });
                    };
                    var addPriceList = function (priceListDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/addPriceList',
                            type: 'POST',
                            data: priceListDto
                        });
                    };
                    var editPriceList = function (priceListDto) {
                        return $.ajax({
                            url: '/api/v1/commonapi/editPriceList',
                            type: 'POST',
                            data: priceListDto
                        });
                    };
                    var getLanguages = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getLanguages',
                            async:false
                        });
                    };
                    var setLanguages = function () {
                        getLanguages()
                            .success(function (data) {
                                languages = data;
                            });
                    };
                    var initPage = function () {
                        setLanguages();
                        getPriceLists()
                            .success(function (list) {
                                priceList = list;
                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: priceList,
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
                                            dataField: 'sourceLanguageId',
                                            caption: 'Kaynak Dil',
                                            lookup: { dataSource: languages, valueExpr: 'id', displayExpr: 'name' }
                                        },
                                        {
                                            dataField: 'targetLanguageId',
                                            caption: 'Hedef Dil',
                                            lookup: { dataSource: languages, valueExpr: 'id', displayExpr: 'name' }
                                        },
                                        {
                                            dataField: 'char_0_100',
                                            caption: '0-100k'
                                        },
                                        {
                                            dataField: 'char_100_150',
                                            caption: '100-150k'
                                        },
                                        {
                                            dataField: 'char_150_200',
                                            caption: '150-200k'
                                        },
                                        {
                                            dataField: 'char_200_500',
                                            caption: '200-500k'
                                        },
                                        {
                                            dataField: 'char_500_More',
                                            caption: '500k +'
                                        }
                                    ],
                                    onRowInserted: function (e) {
                                        //TODO validation
                                        //addPriceList(e.data).success(function (language) {
                                        //    Materialize.toast('Kayıt başarılı.', 3000);
                                        //});
                                    },
                                    onRowUpdated: function (e) {
                                        //editPriceList(e.key).success(function (language) {
                                        //    Materialize.toast('Kayıt başarılı.', 3000);
                                        //});
                                    },
                                    //onEditingStart: function (info) {
                                    //    editPrice = info.data;
                                    //}
                                    editing: {
                                        insertEnabled: true,
                                        editEnabled: true,
                                        texts: {
                                            editRow: 'Düzenle',
                                            saveRowChanges: 'Kaydet',
                                            cancelRowChanges: 'İptal'
                                        }
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#priceListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#priceListGrid').dxDataGrid('instance');
                            });
                    };
                    
                    initPage();
                });
            });
    });