require(['../../common'],
    function (common) {
        require(['utility', 'dxdatagrid'],
            function (utility) {
                $(function () {

                    //variables
                    var utilityObj = new utility();
                    var dataGrid;

                    //private funcs
                    var getUsers = function () {
                        return $.ajax({
                            url: '/api/v1/userapi/getUsers'
                        });
                    };

                    var setActive = function (id, active) {
                        var userDto = {
                            Id: id,
                            Active: active
                        };

                        return $.ajax({
                            url: '/api/v1/userapi/setActive',
                            type: 'POST',
                            data: userDto
                        });
                    };


                    var initPage = function () {
                        getUsers()
                            .success(function (userList) {

                                var gridOpts = $.extend(true,
                                {
                                    filterRow: {
                                        visible: true,
                                        applyFilter: "auto"
                                    },
                                    headerFilter: {
                                        visible: true
                                    },
                                    dataSource: userList,
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
                                        }, {
                                            dataField: 'surName',
                                            caption: 'Soyadı'
                                        }, {
                                            dataField: 'email',
                                            caption: 'Email'
                                        }, {
                                            dataField: 'mobilePhone',
                                            caption: 'Telefon'
                                        }, {
                                            dataField: 'genderId',
                                            caption: 'Cinsiyet',
                                            lookup: {
                                                dataSource: utilityObj.genders,
                                                displayExpr: 'text',
                                                valueExpr: 'id'
                                            }
                                        }, {
                                            dataField: 'userRoleTypeString',
                                            caption: 'Kullanıcı Tipi'
                                        }, {
                                            dataField: 'id',
                                            caption: 'Aksiyon',
                                            alignment: 'left',
                                            cellTemplate: function (container, cellInfo) {
                                                var actions = "";
                                                if (cellInfo.data.active) {
                                                    actions = '<a class="custom-link" href="/Admin/User/Edit/{userId}" title="Kullanıcı bilgilerini düzenle"><i class="mdi-editor-mode-edit"></i></a>' +
                                                                '<a class="custom-link" href="javascript:Passive({userId})" title="Kullanıcı bilgilerini sil"><i class="mdi-action-delete"></i></a>';
                                                } else {
                                                    actions = '<a class="custom-link" href="javascript:Active({userId})" title="Kullanıcı bilgilerini aktif et"><i class="mdi-content-undo"></i></a>';
                                                }
                                                   
                                                $(actions.supplant({ userId: cellInfo.value })).appendTo(container);
                                            }
                                        }
                                    ], editing: {
                                        insertEnabled: true
                                    },
                                    onInitNewRow: function (e) {
                                        window.location.href = "/Admin/User/Create";
                                    }
                                }, utilityObj.baseGridOptions);


                                $('#userListGrid').dxDataGrid(gridOpts);
                                dataGrid = $('#userListGrid').dxDataGrid('instance');
                            }).fail(function (ex) {
                                console.log(ex);
                            });
                    };

                    initPage();


                    function Passive(id) {

                        setActive(id, false).success(function (user) {
                            Materialize.toast('Kayıt pasif edildi.', 3000);

                            //window.location.href = "/Admin/User";
                        }).fail(function (err) {
                            console.log(err);
                        });

                    }

                    function Active(id) {

                        setActive(id, false).success(function (user) {
                            Materialize.toast('Kayıt aktif edildi.', 3000);

                            //window.location.href = "/Admin/User";
                        }).fail(function (err) {
                            console.log(err);
                        });

                    }
                   
                });

                
            });
    });
