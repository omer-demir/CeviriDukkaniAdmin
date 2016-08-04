require(['../../common'],
    function (common) {
        require(
            [
                'utility',
                'ckeditor',
                'css!../../../Scripts/dx/css/dx.common.css',
                'jquery',
            ],
            function (utility) {
                var utilityObj = new utility();
                var params = window.location.search.split(/[(?=0-9&)]{1,3}/g);

                $(function () {
                    CKEDITOR.replace('original');
                    CKEDITOR.replace('translator');

                    //CKEDITOR.instances['Description'].setData(data);
                    //CKEDITOR.instances['Description'].setData(data);
                });
            });
    });