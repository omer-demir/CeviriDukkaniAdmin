require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;
                    var companies;
                    //private funcs
                    var getCompanyTerminologies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanyTerminologies'
                        });
                    };
                    var getCompanies = function () {
                        return $.ajax({
                            url: '/api/v1/commonapi/getCompanies',
                            async: false
                        });
                    };
                    var deleteCompanyTerminology = function (companyTerminologyId) {
                        swal({
                            title: 'UYARI',
                            text: 'Terminolojiyi silmek istediğinize emin misiniz?',
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Evet",
                            cancelButtonText: "Hayır",
                            closeOnConfirm: false,
                            closeOnCancel: true
                        },
                         function (isConfirm) {
                             if (isConfirm) {
                                 $.ajax({
                                     url: '/api/v1/commonapi/deleteCompanyTerminology?id=' + companyTerminologyId
                                 }).success(function (data) {
                                     swal('Bilgi', 'Terminoloji başarıyla silindi.', "success");
                                     window.location.href = '/Admin/Common/CompanyTerminologies';
                                 }).fail(function () {
                                     swal('Hata', 'Terminoloji silinirken bir hata oluştu.', "error");
                                 });
                                 //swal('Bilgi', 'Terminoloji başarıyla silindi.', "success");

                             }
                         });
                        
                    };
                    var setCompanies = function () {
                        getCompanies()
                            .success(function (data) {
                                companies = data;
                            });
                    };
                    var initPage = function () {
                        setCompanies();
                        getCompanyTerminologies()
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
                                                var index =
                                                    dataGrid.pageIndex() * dataGrid.pageSize() + e.rowIndex + 1;
                                                container.text(index);
                                            }
                                        },
                                        {
                                            dataField: 'companyId',
                                            caption: 'Şirket Adı',
                                            lookup: { dataSource: companies, valueExpr: 'id', displayExpr: 'name' }
                                        }, {
                                            dataField: 'name',
                                            caption: 'Dosya Adı',
                                            cellTemplate: function (container, cellInfo) {
                                                var actions =
                                                    '<a class="custom-link" href="{fileUrl}" title="İndirmek için tıklayın">{fileName}</a>';
                                                $(actions
                                                        .supplant({
                                                            fileUrl: cellInfo.data.fileUrl.replace('~', ''),
                                                            fileName: cellInfo.value
                                                        }))
                                                    .appendTo(container);
                                            }
                                        }, {
                                            dataField: 'createdBy',
                                            caption: 'Ekleyen'
                                        }, {
                                            dataField: 'createdAt',
                                            caption: 'Eklenme Tarihi'
                                        }
                                        , {
                                            dataField: 'id',
                                            caption: 'Aksiyon',
                                            alignment: 'left',
                                            cellTemplate: function (container, cellInfo) {
                                                var actions = '<a class="custom-link deleteTerminology" href="javascript:void(0);" data-id="{id}" title="Terminoloji sil"><i class="mdi-action-delete"></i></a>';
                                                $(actions.supplant({ id: cellInfo.value })).appendTo(container);
                                            }
                                        }
                                    ],
                                    editing: {
                                        insertEnabled: true
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "/Admin/Common/CompanyTerminologyCreate";
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#terminologyListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#terminologyListGrid').dxDataGrid('instance');
                            });
                    };

                    //events
                    $(document).on('click', 'a.deleteTerminology', function () {
                        var terminologyId = $(this).attr('data-id');
                        deleteCompanyTerminology(terminologyId);
                    });

                    initPage();
                });
            });
    });