require.config({
    config: {
        documentUploadUrl: 'http://localhost:8003/api/documentapi/uploadDocument'
    },
    baseUrl: '/Areas/Admin/Scripts',
    map: {
        '*': {
            'css': 'css' // or whatever the path to require-css is
        }
    },
    paths: {
        'utility': 'app/utility',
        'jquery': '../Theme/js/plugins/jquery-1.11.2.min',
        'jqueryValidate': '../Theme/js/plugins/jquery-validation/jquery.validate.min',
        'dropzone': '../Theme/js/plugins/dropzone/dropzone.min',
        'lodash': 'plugins/lodash/lodash',
        'dxdatagrid': '../../../Scripts/dx/js/dx.webappjs',
        'dataTable': '../Theme/js/plugins/data-tables/js/jquery.dataTables.min',
        'ckeditor': '../Theme/js/plugins/ckeditor/ckeditor'
    },
    shim: {
        'jqueryValidate': {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'dropzone': ['css!../Theme/js/plugins/dropzone/dropzone.min.css'],
        'dxdatagrid': ['css!../../../Scripts/dx/css/dx.common.css', 'css!../../../Scripts/dx/css/dx.light.css'],
        'dataTable': ['css!../Theme/js/plugins/data-tables/css/jquery.dataTables.min.css']
    }
});

if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : "";
            }
        );
    };
}