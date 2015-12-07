(function(window, undefined) {'use strict';


angular.module('adf.widget.testwidget', ['adf.provider', 'pdf', 'firebase', 'ui.tree', 'ui.router', 'ngDialog'])
    .config(["dashboardProvider", function(dashboardProvider) {
        dashboardProvider
            .widget('testwidget', {
                title: 'PhD-ToC-Widget',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'Prototype LLP Platform App',
                controller: 'PhdTocWidgetCtrl',
                templateUrl: '{widgetsPath}/testwidget/src/view.html',
                frameless: false,
                reload: true,
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/edit.html',
                    modalSize: 'lg',
                    controller: 'PhdTocWidgetCtrl',
                    reload: true
                }
            }).widget('uiView', {
                title: 'EmbedViewer',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'embed content from remote sites',
                template: '<div ng-bind-html="configs"></div>',
                controller: ['$sce', 'config', '$scope', '$compile', function($sce, config, $scope, $compile) {
                    $scope.configs = $compile($sce.trustAsHtml(config.content))($scope);
                }],
                frameless: false,
                edit: {
                    template: '<div class="card"><label for="content">Enter embed code</label><textarea name="content" class="form-control" ng-model="config.content"></textarea></div>',
                    immediate: true,
                    reload: true
                }
            }).widget('dash', {
                title: 'board',
                template: ' <adf-dashboard name="{{dashboard.title}}" structure="{{dashboard.structure}}" collapsible="{{dashboard.collapsible}}" maximizable="{{dashboard.maximizable}}" enable-confirm-delete="{{dashboard.enableConfirmDelete}}" class="{{dashboard.styleClass}}" frameless="{{dashboard.frameless}}" title-template-url="{{dashboard.titleTemplateUrl}}" continuous-edit-mode="false" adf-model="dashboard.model" />',
                frameless: false,
                reload: false,
                styleClass: 'info panel panel-info',
                controller: ['config', '$firebaseObject', 'FIREBASE_URL', '$scope', function(config, $firebaseObject, FIREBASE_URL, $scope) {
                    var a = $firebaseObject(new Firebase(FIREBASE_URL + 'content/').child(config.id));
                    a.$bindTo($scope, 'dashboard');
                }],
                edit: {
                    controller: ['config', '$firebaseObject', 'FIREBASE_URL', '$scope', 'ROARCLASSES', function(config, $firebaseObject, FIREBASE_URL, $scope, ROARCLASSES) {
                        var a = $firebaseObject(new Firebase(FIREBASE_URL + 'content/').child(config.id));
                        a.$bindTo($scope, 'dashboard');
                        $scope.ROARCLASSES = ROARCLASSES;
                    }],
                    templateUrl: '{widgetsPath}/testwidget/src/dashedit.html'
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL",
                        function(config, $firebaseArray, $rootScope, FIREBASE_URL) {
                            if (config.id) {
                                return config;
                            } else {
                                var a = $firebaseArray(new Firebase(FIREBASE_URL + 'content/'));
                                var b = {};
                                a.$add({
                                    'name': 'curation'
                                }).then(function(ref) {
                                    var id = ref.key();
                                    ref.update({
                                        id: id,
                                        projectid: $rootScope.$stateParams.pId || 'projectid',
                                        matterId: $rootScope.$stateParams.matterId || 'matterId',
                                        groupId: $rootScope.$stateParams.groupId || 'groupId',
                                        author: $rootScope.authData.uid || 'userid',
                                        ispublished: false,
                                        content_type: 'dashboard',
                                        timestamp: Firebase.ServerValue.TIMESTAMP
                                    });

                                    config.id = id;
                                    return config;
                                });
                                return config.id;


                            }
                        }
                    ]
                }
            }).widget('sidebar', {
                title: 'SideBar Widget Controller',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'manage and switch between widgets',
                templateUrl: '{widgetsPath}/testwidget/src/embed.html',
                controller: ['$sce', 'config', '$scope', function($sce, config, $scope) {
                    $scope.tabs = angular.forEach(config.content, function(tab, key) {
                        $sce.trustAsHtml(tab.content);
                    });

                }],
                styleClass: 'success card card-success',
                frameless: false,
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/editembed.html',
                    controller: ['config', '$scope', 'ROARCLASSES', function(config, $scope, ROARCLASSES) {
                        $scope.config = config;
                        $scope.ROARCLASSES = ROARCLASSES;
                        $scope.push = function(tab) {
                            if (angular.isUndefined(config.content)) {
                                config.content = new Array();
                                config.content.push(tab);
                            } else {
                                config.content.push(tab);
                            }
                        };

                    }],
                    immediate: true,
                    reload: false
                }
            });

    }]).controller('PhdTocWidgetCtrl', ["$scope", "config", "$stateParams", "PROJECT", "PROJECTDRAFTS", "PROJECTDRAFT", "ngDialog",
        function($scope, config, $stateParams, PROJECT, PROJECTDRAFTS, PROJECTDRAFT, ngDialog) {
            $scope.size = 'lg';

            if (!config.draftid) {
                config.draftid = '';
            } else {
                var draft = PROJECTDRAFT(config.draftid);
                $scope.draft = draft;
            }
            $scope.config = config;

            $scope.configured = function() {
                return $scope.config.content !== '';
            };

            $scope.notConfigured = function() {
                return $scope.config.content === '';
            };
            var projectId = $stateParams.pId;

            var matterId = $stateParams.matterId;
            var project = PROJECT(projectId);
            $scope.project = project;
            var drafts = PROJECTDRAFTS(projectId);
            $scope.drafts = drafts;

            $scope.loaddraft = function(draftId) {
                var draft = PROJECTDRAFT(draftId);
                $scope.draft = draft;
            };


            //draft.$bindTo($scope, 'draft');
            //var notes = ROARsnippets(matterId);
            //$scope.notecards = notes;
            var blanksection = {
                title: 'Section Title',
                content: 'Section content',
                children: new Array()
            };
            $scope.newtopsection = function() {
                if (angular.isUndefined(draft.content)) {
                    var sections = new Array();
                    angular.extend(draft, {
                        content: sections
                    });
                    draft.content.push(blanksection);
                    draft.$save();
                } else {
                    draft.content.push(blanksection);
                    draft.$save();
                }
            };
            $scope.newsubsection = function(section) {
                var model = section.$nodeScope.$modelValue;
                if (angular.isUndefined(model.children)) {
                    var sections = new Array();
                    angular.extend(model, {
                        children: sections
                    });
                    model.children.push(blanksection);
                    draft.$save();
                } else {
                    model.children.push(blanksection);
                    draft.$save();
                }
            };
            $scope.editcard = function($scope) {
                var model = $scope.$nodeScope.$modelValue;
                model.isActive = true;
                draft.$save();
                ngDialog.open({
                    template: 'sectionedit.html',
                    scope: $scope,
                    controller: 'PhdTocWidgetCtrl',
                    appendTo: '#tableofcontents',
                    //plain: true,
                    showClose: false,
                    closeByEscape: true,
                    closeByDocument: true,
                    className: 'ngdialog-theme-card',
                    overlay: false


                });

            };
            $scope.deactivate = function($scope) {
                $scope.$nodeScope.$modelValue.section.isActive = false;
                draft.$save();
                alertify.log("<img src='img/lexlab.svg'>");
            };
            $scope.savedraft = function($scope) {
                $scope.$nodeScope.$modelValue.section.isActive = false;
                draft.$save();
                alertify.log("<img src='img/lexlab.svg'>");
            };
            var contentarray = new Array();
            var newdrafttpl = {
                name: 'New Draft',
                content: contentarray
            };
            $scope.newdraft = function() {
                projectdrafts.$add(newdrafttpl).then(function(ref) {
                    var id = ref.key();
                    ref.update({
                        id: id
                    });
                });
            };
        }
    ]);

angular.module("adf.widget.testwidget").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/testwidget/src/boilerplate.html","<!DOCTYPE html><html><head><title>{{draft.title}}</title></head><body>{{}}</body></html>");
$templateCache.put("{widgetsPath}/testwidget/src/dashedit.html","<div class=\"card-fancy card-rounded card-thick\"><div class=card-header><button type=button class=close ng-click=closeDialog() aria-hidden=true>&times;</button><h4 class=modal-title>Edit Page</h4></div><div class=\"card card-block\"><form role=form><div class=form-group><label for=dtitle>Title</label> <input type=text ng-model=config.title placeholder=Title></div><div class=form-group><label>Structure</label><div class=card-columns><div class=\"radio card {{key}}\" ng-repeat=\"(key, structure) in structures\"><label><input type=radio value={{key}} ng-model=model.structure ng-change=\"changeStructure(key, structure)\"> {{key}}</label></div></div></div><div class=row><div class=\"form-group row\"><label>Collapsible?</label> <input type=checkbox ng-model=dashboard.collapsible></div><div class=\"form-group row\"><label>Maxizable?</label> <input type=checkbox ng-model=dashboard.maximizable></div><div class=\"form-group row\"><label>Protected?</label> <input type=checkbox ng-model=dashboard.enableConfirmDelete></div></div><select ng-model=dashboard.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\" class=form-control placeholder=\"Select Style...\"></select></form><adf-dashboard name={{dashboard.title}} structure={{dashboard.structure}} collapsible={{dashboard.collapsible}} maximizable={{dashboard.maximizable}} enable-confirm-delete={{dashboard.enableConfirmDelete}} class={{dashboard.styleClass}} frameless={{dashboard.frameless}} continuous-edit-mode=false adf-model=dashboard.model></adf-dashboard></div><div class=card-footer><button type=button class=\"btn btn-primary card-link\" ng-click=closeDialog()>Close</button></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/edit.html","<form role=form><div class=form-group><label for=draftid>Draft</label><select ng-model=config.draftid ng-change=loaddraft(config.draftid) ng-options=\"draft.$id as draft.name for draft in drafts\" class=form-control id=draftid placeholder=\"Select Draft...\"></select></div><a class=\"card fa fa-file\" ng-repeat=\"draft in drafts\" ng-click=\"config.draftid = draft.$id\">{{draft.name}}</a> <button class=\"dashed-outline fa fa-4x fa-plus\" ng-click=newdraft()></button></form>");
$templateCache.put("{widgetsPath}/testwidget/src/editembed.html","<div class=card><button ng-click=push(newtab) class=\"btn btn-info fa fa-plus\"></button> <label for=tabname>Enter Title</label> <input type=text ng-model=newtab.title><select ng-model=newtab.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\"></select><label for=content>Enter embed code</label> <textarea name=content class=form-control ng-model=newtab.content></textarea></div><div style=\"overflow: scroll;\"><h4>Edit existing sections:</h4><div class=card ng-repeat=\"tab in config.content track by $index\"><label for=tabname>Edit Title</label> <input type=text name=tabname ng-model=tab.title> <label for=content>Edit Embed Code</label> <textarea name=content class=form-control ng-model=tab.content></textarea></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/embed.html","<div class=expand><tabset class=\"ngDialogTab tab-stacked\" vertical=true><tab ng-repeat=\"tab in tabs\"><ul class=list-group-action><li class=list-group-item>{{tab.title}} <button class=\"circle btn btn-info fa fa-chevron-right fa-2x pull-right\" ng-click=loadDashboard(tab.content)></button> <span class=show-menu><span class=\"glyphicon glyphicon-chevron-right\"></span></span><ul class=list-group-submenu><li class=\"list-group-submenu-item success\"><span class=\"glyphicon glyphicon-remove\"></span></li><li class=\"list-group-submenu-item danger\"><span class=\"glyphicon glyphicon-ok\"></span></li></ul></li></ul></tab><tab ng-repeat=\"tab in config.content\" class=\"btn {{tab.styleClass}}\"><tab-heading>{{tab.title}}</tab-heading><div ng-bind-html=tab.content></div></tab></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/sidebar.html","<div class={{config.styleClass}} ng-controller=\"EmbedCtrl as em\"><tabset class=\"{{config.styleClass || \'alert alert-danger\'}}\"></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/title.html","<h3 class=card-title><a title=\"toggle widget frame\" ng-click=\"frameless = !frameless\"><i class=\"fa fa-ge\" ng-class=\"{\'fa-ge\': (frameless == true),\'fa-alert\':(frameless == false)}\"></i></a> {{title}} <span class=pull-right><a title=\"reload widget content\" ng-if=widget.reload ng-click=reload()><i class=\"fa fa-refresh\"></i></a> <a title=\"change widget location\" class=adf-move ng-if=editMode><i class=\"glyphicon glyphicon-move\"></i></a> <a title=\"collapse widget\" ng-show=\"options.collapsible && !widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-minus\"></i></a> <a title=\"expand widget\" ng-show=\"options.collapsible && widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-plus\"></i></a> <a title=\"edit widget configuration\" ng-click=edit() ng-if=editMode><i class=\"glyphicon glyphicon-cog\"></i></a> <a title=\"fullscreen widget\" ng-click=openFullScreen() ng-show=options.maximizable><i class=\"glyphicon glyphicon-fullscreen\"></i></a> <a title=\"remove widget\" ng-click=remove() ng-if=editMode><i class=\"glyphicon glyphicon-remove\"></i></a></span></h3>");
$templateCache.put("{widgetsPath}/testwidget/src/view.html","<div ng-include=\"\'/modules/lionlawlabs/partial/drafter/drafter.html\'\" style=min-height:350px;></div>");}]);})(window);