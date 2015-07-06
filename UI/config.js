requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/',
    shim: {
        underscore: {
          exports: '_'
        },

        Backbone: {
          deps: ["underscore", "jQuery"],
          exports: "Backbone"
        },

        bootstrap:{
            deps:["jQuery"],
        },

        highcharts:{
            deps:["jQuery"]
        },

        datetimepicker:{
            deps:['moment']
        }

    },

    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        js              :   'js',
        datasource      :   'js/datasource',
        home            :   'js/pages/home',
        chartBuilder    :   'js/pages/chartBuilder',
        contactUs       :   'js/pages/contactUs',
        thirdParty      :   'third-party/',
        tests           :   'tests',
        text            :   'third-party/requiretext/text',
        underscore      :   'third-party/underscore/underscore',
        backbone        :   'third-party/backbone/backbone',
        jQuery          :   'third-party/jquery/jquery-1.9.1',
        bootstrap       :   'third-party/bootstrap/js/bootstrap',
        csvjson         :   'third-party/csvjson.js-master/csvjson',
        moment          :   'third-party/moment/moment',
        datetimepicker  :   'third-party/bootstrap-datetimepicker-master/src/js/bootstrap-datetimepicker', 
        highcharts      :   'third-party/highcharts/js/highcharts'

       
    }
});

// Start the main app logic.
define(['bootstrap', 'underscore', 'backbone', 'highcharts'],
function   (bootstrap, _, Backbone) {
        window._ = _;
        window.Backbone = Backbone;

        require(['js/init']);
});
