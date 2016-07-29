require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                
                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;

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
                                            caption: 'Adı'
                                        }
                                    ],
                                    onRowInserted: function (e) {
                                        addTerminology(e.data).success(function (terminology) {
                                            //initPage();
                                            Materialize.toast('Kayıt başarılı.', 3000);
                                        });
                                    },
                                    onRowUpdated: function (e) {
                                        editTerminology(e.key).success(function (terminology) {
                                            Materialize.toast('Kayıt başarılı.', 3000);
                                        });
                                    }
                                    , editing: {
                                        insertEnabled: true,
                                        editEnabled: true,
                                        texts: {
                                            editRow: 'Düzenle',
                                            saveRowChanges: 'Kaydet',
                                            cancelRowChanges: 'İptal'
                                        }
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#terminologyListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#terminologyListGrid').dxDataGrid('instance');
                            });
                    };

                    initPage();
                });
            });
    });