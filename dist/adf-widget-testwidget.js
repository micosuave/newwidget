(function(window, undefined) {'use strict';

angular.module('adf.widget.iframe', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('iframe', {
        title: 'iframe',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/iframe/src/view.html',
        controller: 'iframeController',
        controllerAs: 'iframe',
        frameless: true,
        edit: {
          templateUrl: '{widgetsPath}/iframe/src/edit.html'
        },
        config: {
          height: '420px'
        }
      });
  }])
  .controller('iframeController', ["$sce", "config", function($sce, config){
    if (config.url){
      this.url = $sce.trustAsResourceUrl(config.url);
    }
  }]);

angular.module("adf.widget.iframe").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/iframe/src/edit.html","<form role=form><div class=form-group><label for=url>URL</label> <input type=url class=form-control id=url ng-model=config.url placeholder=http://www.example.com></div><div class=form-group><label for=url>Height</label> <input type=text class=form-control id=url ng-model=config.height></div></form>");
$templateCache.put("{widgetsPath}/iframe/src/view.html","<div><div class=\"alert alert-info\" ng-if=!config.url>Please insert a url in the widget configuration</div><iframe ng-if=iframe.url class=\"adf-iframe\" style=\"min-height:500px;height: {{config.height}};width:100%;\" src={{iframe.url}} seamless allowfullscreen></iframe></div>");}]);



angular.module('adf.widget.testwidget', ['adf.provider', 'pdf', 'firebase', 'ui.tree', 'ui.router', 'ngDialog'])
    .config(["dashboardProvider", function(dashboardProvider) {
        dashboardProvider
          .widget('pdfviewer', {
            title: 'PDF Viewer',
            description: 'PDFJS viewer',
            controller: 'PDFController',
            controllerAs: 'pdf',
            templateUrl: '{widgetsPath}/testwidget/src/pdfview.html',
            frameless: true,
            reload: true,
            styleClass: 'card-fancy',
            edit: {
              templateUrl: '{widgetsPath}/iframe/src/edit.html',
              reload: true,
              controller: 'PDFController',
              controllerAs: 'pdf'

            }
            
            })
            .widget('tocwidget', {
                title: 'PhD-ToC-Widget',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'Prototype LLP Platform App',
                controller: 'PhdTocWidgetCtrl',
                controllerAs: 'toc',
                templateUrl: '{widgetsPath}/testwidget/src/view.html',
                frameless: true,
                reload: true,
                immediate: true,
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/edit.html',
                    modalSize: 'lg',
                    controller: 'PhdTocWidgetCtrl',
                    reload: true
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = $firebaseArray(new Firebase(FIREBASE_URL + 'content/'));
                          var b = {};
                          a.$add({
                            'name': 'draft'
                            
                          }).then(function (ref) {
                            var id = ref.key();
                            ref.update({
                              id: id,
                              //projectid: $rootScope.$stateParams.pId || 'projectid',
                              //matterId: $rootScope.$stateParams.matterId || 'matterId',
                              //groupId: $rootScope.$stateParams.groupId || 'groupId',
                              //author: $rootScope.authData.uid || 'userid',
                              ispublished: false,
                              content_type: 'document',
                              templateUrl: '{widgetsPath}/getphd/src/view.html',
                              timestamp: Firebase.ServerValue.TIMESTAMP
                            });
                            config.id = id;
                            

                            return config;
                          });
                          return config;


                        }
                      }
                    ]
                  }
            }).widget('ckwidget', {
                title: 'CKeditor-Widget',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'CKeditor text editor',
                controller: 'CKEWidgetCtrl',
                templateUrl: '/newwidget/src/ckeditor.html',
                frameless: true,
                reload: true,
                immediate: true,
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/editckeditor.html',
                    modalSize: 'lg',
                    controller: 'CKEditorCtrl',
                    reload: true
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = $firebaseArray(new Firebase(FIREBASE_URL + 'content/'));
                          var b = {};
                          a.$add({
                            'name': 'draft'
                            
                          }).then(function (ref) {
                            var id = ref.key();
                            ref.update({
                              id: id,
                              //projectid: $rootScope.$stateParams.pId || 'projectid',
                              //matterId: $rootScope.$stateParams.matterId || 'matterId',
                              //groupId: $rootScope.$stateParams.groupId || 'groupId',
                              //author: $rootScope.authData.uid || 'userid',
                              ispublished: false,
                              content_type: 'document',
                              templateUrl: '{widgetsPath}/getphd/src/view.html',
                              timestamp: Firebase.ServerValue.TIMESTAMP
                            });
                            config.id = id;
                            

                            return config;
                          });
                          return config;


                        }
                      }
                    ]
                  }
            }).widget('uiView', {
                title: 'EmbedViewer',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'embed content from remote sites',
                template: '<div ng-bind-html="configs"></div>',
                controller: ['$sce', 'config', '$scope', '$compile', function($sce, config, $scope, $compile) {
                    $scope.configs = $compile($sce.trustAsHtml(config.content))($scope);
                }],
                frameless: true,
                edit: {
                    template: '<div class="card"><label for="content">Enter embed code</label><textarea name="content" class="form-control" ng-model="config.content"></textarea></div>',
                    immediate: true,
                    reload: true
                }
            }).widget('dash', {
                title: 'board',
                template: ' <adf-dashboard name="{{dashboard.title}}" structure="{{dashboard.structure}}" collapsible="{{dashboard.collapsible}}" maximizable="{{dashboard.maximizable}}" enable-confirm-delete="{{dashboard.enableConfirmDelete}}" class="{{dashboard.styleClass}}" frameless="{{dashboard.frameless}}" title-template-url="{{dashboard.titleTemplateUrl}}" continuous-edit-mode="false" adf-model="dashboard.model" />',
                frameless: true,
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
                frameless: true,
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

  }]).controller('PDFController', ['$scope', 'pdfDelegate','config','Collection', function($scope, pdfDelegate, config, Collection) {
    var pdf = this;
    pdf.config = config;
    if (config.url) {
      $scope.pdfUrl = config.url
    } else if (config.id) {
      Collection(config.id).$loaded().then(function (thing) {
        pdf.item = thing;
      });
    }
    // pdfDelegate.$getByHandle('my-pdf-container').zoomIn();
  }])
  .controller('PhdTocWidgetCtrl', ["$scope", "config", "ckdefault", "ckmin", "Collection", "$controller", "$rootScope","$ACTIVEROAR","Collections","$q",
        function($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, $ACTIVEROAR, Collections,$q) {
            $scope.size = 'lg';

            // if (!config.draftid) {
            //     config.draftid = '';
            // } else {
            //     var draft = PROJECTDRAFT(config.draftid);
            //     $scope.draft = draft;
            // }
            var toc = this;
            $scope.config = config;
            $scope.ckdefault = ckdefault;
            $scope.ckmin = ckmin;
            toc.canedit = edit;
            toc.broadcast = function (data) {
              $rootScope.$broadcast('TABLEOFCONTENTS', data);
            };
            
            // var pj = {
            //   editable: editable()
            // };
            function edit() {
              if ($rootScope.$state.includes('projectdashboard')) {
                return true;
              }
              if ($rootScope.$state.includes('roartheatre')) {
                return false;
              }
            };
            
            //$scope.pj = pj;
            toc.tree = Collection(config.id);
            toc.tree.$bindTo($scope, 'tree');
            // $scope.configured = function() {
            //     return $scope.config.content !== '';
            // };

            // $scope.notConfigured = function() {
            //     return $scope.config.content === '';
            // };
            // var projectId = $stateParams.pId;

            // var matterId = $stateParams.matterId;
            // var project = PROJECT(projectId);
            // $scope.project = project;
            // var drafts = PROJECTDRAFTS(projectId);
            // $scope.drafts = drafts;

            $scope.loaddraft = function(draftId) {
                var draft = PROJECTDRAFT(draftId);
                draft.$bindTo($scope, 'tree');
            };


            //draft.$bindTo($scope, 'draft');
            //var notes = ROARsnippets(matterId);
            //$scope.notecards = notes;
            

            var Section = function(){
              var section = this;
                section.title = 'Section Title';
                section.content = 'Section content';
               return section;
            };
            toc.newtopsection = function () {
              var modelref = Collection($scope.tree.id).$ref();

              Collections().$add(new Section()).then(function (ref) {
                var id = ref.key();
                ref.update({ id: id });
                modelref.child('roarlist').child(id).set(id);
                Collection(id).$loaded().then(function (sect) {

                  if (angular.isUndefined($scope.tree.roarlist)) {
                    var sections = [];
                    angular.extend($scope.tree, {
                      roarlist: sections
                    });
                    $scope.tree.roarlist.push(sect);
                    //draft.$save();
                  } else {
                    $scope.tree.roarlist.push(sect);
                    //draft.$save();
                  }
                });
              });   
            };
            toc.newsubsection = function(section) {
              if (angular.isUndefined(section.$nodeScope.$modelValue)) {
                var model = section.$nodeScope.node

              } else {
                var model = section.$nodeScope.$modelValue;
              }
                var modelref = Collection(model.id).$ref();
                Collections().$add(new Section()).then(function (ref) {
                  var id = ref.key();
                  ref.update({ id: id });
                  modelref.child('roarlist').child(id).set(id);
                  Collection(id).$loaded().then(function (sect) {
                    if (angular.isUndefined(model.roarlist)) {
                      var sections = [];
                      model.roarlist = sections;
                      model.roarlist.push(sect);
                      //draft.$save();
                    } else {
                      model.roarlist.push(sect);
                      //draft.$save();
                    }
                  });
                });
              
            };
            toc.opensubsection = function (scope) {
              //window.alert(scope);
              toc.broadcast(scope);
            };
            toc.togglemode = function () {
              var walk = function (node) {
                if (node.roarlist) {
                  angular.forEach(node.roarlist, function (node, key) {
                    walk(node);
                  });
                } else {
                  alertify.log(node.content);
                }
              };
              walk($scope.tree);
              console.log(toc.builddoc());
              alertify.log(toc.builddoc());
              // var walk = function (node) {
              //   angular.forEach(node.roarlist, function (node, key) {
              //     if (node.children) {
              //       walk(node);
              //     } else {
              //       Collection(node.id).$save(node);
              //     }
              //   });
              // };
              // walk($scope.tree);
            };
            var roothead = "<!DOCTYPE html><html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css'/></head><body>";
            var roottail = "</body></html>";
            

            toc.builddoc = function () {
              var deferred = $q.defer();
              var doc = [];
              doc.push(roothead);
              var walk = function (node, depth, siblings) {
                if (node && node.content) {
                  console.log(depth, node.title);
                  doc.push(node.title , node.content);  
                }
                if (node && node.roarlist) {
                  angular.forEach(node.roarlist, function (node, key) {
                    walk(node, depth+=1, node.roarlist);
                  });
                }
                if (node && !node.id) {
                  Collection(node).$loaded().then(function (node) {
                    walk(node, depth+=1);
                  });
                  
                }

              };
              try { walk($scope.tree, 0); }
              catch (ex) { console.log(ex); }
              finally { doc.push(roottail);
              
            
           

        
        
          deferred.resolve(doc) }
              return deferred.promise;
        };
            // $scope.editcard = function($scope) {
            //     var model = $scope.$nodeScope.$modelValue;
            //     model.isActive = true;
            //     draft.$save();
            //     ngDialog.open({
            //         template: 'sectionedit.html',
            //         scope: $scope,
            //         controller: 'PhdTocWidgetCtrl',
            //         appendTo: '#tableofcontents',
            //         //plain: true,
            //         showClose: false,
            //         closeByEscape: true,
            //         closeByDocument: true,
            //         className: 'ngdialog-theme-card',
            //         overlay: false


            //     });

            // };
            // $scope.deactivate = function($scope) {
            //     $scope.$nodeScope.$modelValue.section.isActive = false;
            //     draft.$save();
            //     alertify.log("<img src='img/lexlab.svg'>");
            // };
            // $scope.savedraft = function($scope) {
            //     $scope.$nodeScope.$modelValue.section.isActive = false;
            //     draft.$save();
            //     alertify.log("<img src='img/lexlab.svg'>");
            // };
            // var contentarray = new Array();
            // var newdrafttpl = {
            //     name: 'New Draft',
            //     content: contentarray
            // };
            // $scope.newdraft = function() {
            //     projectdrafts.$add(newdrafttpl).then(function(ref) {
            //         var id = ref.key();
            //         ref.update({
            //             id: id
            //         });
            //     });
            // };
        }
  ]).controller('CKEditorCtrl', ["$scope", "config", "ckdefault", "ckmin", function ($scope, config, ckdefault, ckmin) {
    var editors = [
      { name: 'Default', obj: ckdefault },
      { name: 'Minimal', obj: ckmin }
    ];
    $scope.editors = editors;
  }])
  .controller('CKEWidgetCtrl', ["$scope", "config", "ckdefault", "ckmin", "Collection", "$controller", "$rootScope",
        function($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope) {
            $scope.size = 'lg';

            // if (!config.draftid) {
            //     config.draftid = '';
            // } else {
            //     var draft = PROJECTDRAFT(config.draftid);
            //     $scope.draft = draft;
            // }
            
            $scope.config = config;
            $scope.ckdefault = ckdefault;
            $scope.ckmin = ckmin;
            var pj = {
              editable: editable()
            };
            $scope.$on('TABLEOFCONTENTS', function ($event, $data) {
              if (angular.isUndefined($data.$parent.$nodeScope.$modelValue)) {
                 $scope.$parent.$parent.config.id = $data.$parent.$nodeScope.node.id;
              
              } else {
                $scope.$parent.$parent.config.id = $data.$parent.$nodeScope.$modelValue.id
              }
               
              
              // $scope.$parent.$parent.config.id = $data;
               $scope.$parent.$parent.reload();
               $scope.edittime = true;
              // console.log('Event', $event);
              // console.log('Data', $data);
              // console.log('more', more);
              // alertify.confirm('set to ' + $data + '?', function (cancel, confirm) {
              //   $scope.$parent.$parent.config.id = $data.$parent.$nodeScope.$modelValue.id;
              //    //var draft = Collection($data);
              //    //draft.$bindTo($scope, 'draft');
              //   $scope.$parent.$parent.reload();
              // });
            });
            function editable() {
              if ($rootScope.$state.includes('projectdashboard')) {
                return true;
              }
              if ($rootScope.$state.includes('roartheatre')) {
                return false;
              }
            };
            $scope.pj = pj;
            var draft = Collection(config.id);
            draft.$bindTo($scope, 'draft');
            // $scope.configured = function() {
            //     return $scope.config.content !== '';
            // };

            // $scope.notConfigured = function() {
            //     return $scope.config.content === '';
            // };
            // var projectId = $stateParams.pId;

            // var matterId = $stateParams.matterId;
            // var project = PROJECT(projectId);
            // $scope.project = project;
            // var drafts = PROJECTDRAFTS(projectId);
            // $scope.drafts = drafts;

            $scope.loaddraft = function(draftId) {
                var draft = Collection(draftId);
                draft.$bindTo($scope, 'draft');
            };


            //draft.$bindTo($scope, 'draft');
            //var notes = ROARsnippets(matterId);
            //$scope.notecards = notes;
            

            var Section = function(){
              var section = this;
                section.title = 'Section Title';
                section.content = 'Section content';
               return section;
            };
            $scope.newtopsection = function() {
                if (angular.isUndefined(draft.content)) {
                    var sections = [];
                    angular.extend(draft, {
                        content: sections
                    });
                    draft.content.push(new Section());
                    //draft.$save();
                } else {
                    draft.content.push(new Section());
                    //draft.$save();
                }
            };
            $scope.newsubsection = function(section) {
              var model = section.$nodeScope.$modelValue;
            
                if (angular.isUndefined(model.children)) {
                    var sections = [];
                   
                    angular.extend(model, {
                        children: sections
                        
                    });
                   
                    model.children.push(new Section());
                 
                    //draft.$save();
                } else {
                    model.children.push(new Section());
                   
                    //draft.$save();
                }
            };
         /*   $scope.editcard = function($scope) {
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
            };*/
            // $scope.newdraft = function() {
            //     projectdrafts.$add(newdrafttpl).then(function(ref) {
            //         var id = ref.key();
            //         ref.update({
            //             id: id
            //         });
            //     });
            // };
        }
    ]);

angular.module("adf.widget.testwidget").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/testwidget/src/boilerplate.html","<!DOCTYPE html><html><head><title>{{draft.title}}</title></head><body>{{}}</body></html>");
$templateCache.put("{widgetsPath}/testwidget/src/ckeditor.html","<div class=card style=\"margin: 0.5rem;padding: 0.2rem;text-align: left;overflow: scroll; height: 50rem;border: 0.1rem solid #110000;\" ng-if=pj.editable><div class=card-header><h3 class=card-title>{{draft.title}}</h3></div><textarea id=iframeElement ckeditor={{config.editor}} ng-model=draft.content ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 1000, \'blur\': 0} }\"></textarea></div><div id=draftdocument class=\"card card-block\"><h1>{{draft.name || draft.title}}</h1><ng-annotate-text text=draft.content class=\"card card-rounded\"></ng-annotate-text><iframe srcdoc=\"{{draft.content | trustAsHTML}}\" style=width:100%; class=\"card card-rounded\"></iframe><div ng-repeat=\"node in draft.roarlist\" node=\"{{node.id || node}}\" style=\"padding-right: 0rem;\"><h2 class=card-title style=\"margin-bottom:0px;font-family:\'Arial\', sans serif;\">{{node.title}}</h2><ng-annotate-text text=\"node.content || node.details\" class=card-text></ng-annotate-text><iframe srcdoc=\"{{node.content | trustAsHTML}}\" style=width:100%; class=\"card card-rounded\"></iframe><div ng-repeat=\"node in node.roarlist\" node=\"{{node.id || node}}\" style=\"padding-right: 0rem;\"><h3 class=card-title style=\"margin-bottom:0px;font-family:\'Arial\', sans serif;\">{{node.title}}</h3><ng-annotate-text text=\"node.content || node.details\" class=card-text></ng-annotate-text><iframe srcdoc=\"{{node.content | trustAsHTML}}\" style=width:100%; class=\"card card-rounded\"></iframe><div ng-repeat=\"node in node.roarlist\" node=\"{{node.id || node}}\" style=\"padding-right: 0rem;\"><h4 class=card-title style=\"margin-bottom:0px;font-family:\'Arial\', sans serif;\">{{node.title}}</h4><ng-annotate-text text=\"node.content || node.details\" class=card-text></ng-annotate-text><iframe srcdoc=\"{{node.content | trustAsHTML}}\" style=width:100%; class=\"card card-rounded\"></iframe><div ng-repeat=\"node in node.roarlist\" node=\"{{node.id || node}}\" style=\"padding-right: 0rem;\"><h5 class=card-title style=\"margin-bottom:0px;font-family:\'Arial\', sans serif;\">{{node.title}}</h5><ng-annotate-text text=\"node.content || node.details\" class=card-text></ng-annotate-text><iframe srcdoc=\"{{node.content | trustAsHTML}}\" style=width:100%; class=\"card card-rounded\"></iframe><div ng-repeat=\"node in node.roarlist\" node=\"{{node.id || node}}\" style=\"padding-right: 0rem;\"><h6 class=card-title style=\"margin-bottom:0px;font-family:\'Arial\', sans serif;\">{{node.title}}</h6><ng-annotate-text text=\"node.content || node.details\" class=card-text></ng-annotate-text><iframe srcdoc=\"{{node.content | trustAsHTML}}\" style=width:100%; class=\"card card-rounded\"></iframe><div ng-repeat=\"node in node.roarlist\" node=\"{{node.id || node}}\"><label class=lead style=\"margin-bottom:0px;font-family:\'Arial\', sans serif;\">{{node.title}}</label><ng-annotate-text text=\"node.content ||node.details\" class=card-text></ng-annotate-text><iframe srcdoc=\"{{node.content | trustAsHTML}}\" style=width:100%; class=\"card card-rounded\"></iframe></div></div></div></div></div></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/dashedit.html","<div class=\"card-fancy card-rounded card-thick\"><div class=card-header><button type=button class=close ng-click=closeDialog() aria-hidden=true>&times;</button><h4 class=modal-title>Edit Page</h4></div><div class=\"card card-block\"><form role=form><div class=form-group><label for=dtitle>Title</label> <input type=text ng-model=config.title placeholder=Title></div><div class=form-group><label>Structure</label><div class=card-columns><div class=\"radio card {{key}}\" ng-repeat=\"(key, structure) in structures\"><label><input type=radio value={{key}} ng-model=model.structure ng-change=\"changeStructure(key, structure)\"> {{key}}</label></div></div></div><div class=row><div class=\"form-group row\"><label>Collapsible?</label> <input type=checkbox ng-model=dashboard.collapsible></div><div class=\"form-group row\"><label>Maxizable?</label> <input type=checkbox ng-model=dashboard.maximizable></div><div class=\"form-group row\"><label>Protected?</label> <input type=checkbox ng-model=dashboard.enableConfirmDelete></div></div><select ng-model=dashboard.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\" class=form-control placeholder=\"Select Style...\"></select></form><adf-dashboard name={{dashboard.title}} structure={{dashboard.structure}} collapsible={{dashboard.collapsible}} maximizable={{dashboard.maximizable}} enable-confirm-delete={{dashboard.enableConfirmDelete}} class={{dashboard.styleClass}} frameless={{dashboard.frameless}} continuous-edit-mode=false adf-model=dashboard.model></adf-dashboard></div><div class=card-footer><button type=button class=\"btn btn-primary card-link\" ng-click=closeDialog()>Close</button></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/document.html","<div class=card><section ng-repeat=\"(key, node) in node.roarlist\" node=\"{{node.id || node}}\"><label>{{node.title}}</label><ng-annotate-text text=node.content></ng-annotate-text><div ng-include=\"\'./document.html\'\" ng-repeat=\"(key, node) in node.roarlist\"></div></section></div>");
$templateCache.put("{widgetsPath}/testwidget/src/edit.html","<form role=form><div class=form-group><label for=draftid>Tree Root</label><select ng-model=config.id ng-change=loaddraft(config.id) ng-options=\"branch.id as branch.name for branch in tree\" class=form-control id=draftid placeholder=\"Select Root Branch...\"></select></div><a class=\"card fa fa-file\" ng-repeat=\"branch in tree\" ng-click=\"config.id = branch.id\">{{branch.name}}</a> <button class=\"dashed-outline fa fa-4x fa-plus\" ng-click=newdraft()></button></form>");
$templateCache.put("{widgetsPath}/testwidget/src/editckeditor.html","<form role=form><div class=form-group><label for=draftid>Editor Configuration</label><select ng-model=config.editor ng-change ng-options=\"editor.obj as editor.name for editor in editors\" class=form-control id=draftid placeholder=\"Select Editor Configuration...\"></select></div></form>");
$templateCache.put("{widgetsPath}/testwidget/src/editembed.html","<div class=card><button ng-click=push(newtab) class=\"btn btn-info fa fa-plus\"></button> <label for=tabname>Enter Title</label> <input type=text ng-model=newtab.title><select ng-model=newtab.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\"></select><label for=content>Enter embed code</label> <textarea name=content class=form-control ng-model=newtab.content></textarea></div><div style=\"overflow: scroll;\"><h4>Edit existing sections:</h4><div class=card ng-repeat=\"tab in config.content track by $index\"><label for=tabname>Edit Title</label> <input type=text name=tabname ng-model=tab.title> <label for=content>Edit Embed Code</label> <textarea name=content class=form-control ng-model=tab.content></textarea></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/embed.html","<div class=expand><tabset class=\"ngDialogTab tab-stacked\" vertical=true><tab ng-repeat=\"tab in tabs\"><ul class=list-group-action><li class=list-group-item>{{tab.title}} <button class=\"circle btn btn-info fa fa-chevron-right fa-2x pull-right\" ng-click=loadDashboard(tab.content)></button> <span class=show-menu><span class=\"glyphicon glyphicon-chevron-right\"></span></span><ul class=list-group-submenu><li class=\"list-group-submenu-item success\"><span class=\"glyphicon glyphicon-remove\"></span></li><li class=\"list-group-submenu-item danger\"><span class=\"glyphicon glyphicon-ok\"></span></li></ul></li></ul></tab><tab ng-repeat=\"tab in config.content\" class=\"btn {{tab.styleClass}}\"><tab-heading>{{tab.title}}</tab-heading><div ng-bind-html=tab.content></div></tab></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/pdfview.html","<div ng-pdf=pdf.url ng-pdf-zoom=1 ng-pdf-template=\"\'/llp_core/bower_components/angular-pdf-directive/build/partials/pdf.html\'\"></div><pdf-viewer delegate-handle=pdf url=pdf.url scale=1 show-toolbar=true headers=\"{ \'Access-Control-Allow-Origin\': \'*\' }\"></pdf-viewer>");
$templateCache.put("{widgetsPath}/testwidget/src/sidebar.html","<div class={{config.styleClass}} ng-controller=\"EmbedCtrl as em\"><tabset class=\"{{config.styleClass || \'alert alert-danger\'}}\"></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/title.html","<h3 class=card-title><a title=\"toggle widget frame\" ng-click=\"frameless = !frameless\"><i class=\"fa fa-ge\" ng-class=\"{\'fa-ge\': (frameless == true),\'fa-alert\':(frameless == false)}\"></i></a> {{title}} <span class=pull-right><a title=\"reload widget content\" ng-if=widget.reload ng-click=reload()><i class=\"fa fa-refresh\"></i></a> <a title=\"change widget location\" class=adf-move ng-if=editMode><i class=\"glyphicon glyphicon-move\"></i></a> <a title=\"collapse widget\" ng-show=\"options.collapsible && !widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-minus\"></i></a> <a title=\"expand widget\" ng-show=\"options.collapsible && widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-plus\"></i></a> <a title=\"edit widget configuration\" ng-click=edit() ng-if=editMode><i class=\"glyphicon glyphicon-cog\"></i></a> <a title=\"fullscreen widget\" ng-click=openFullScreen() ng-show=options.maximizable><i class=\"glyphicon glyphicon-fullscreen\"></i></a> <a title=\"remove widget\" ng-click=remove() ng-if=editMode><i class=\"glyphicon glyphicon-remove\"></i></a></span></h3>");
$templateCache.put("{widgetsPath}/testwidget/src/view.html","<div id=tableofcontents class=\"card card-default\"><div class=card-header><h4 class=card-title e-form=nameform editable-text=tree.name buttons=no onaftersave=tree.$save(); ng-click=toc.opensubsection(tree)>{{tree.name}} <span class=\"fa fa-edit\" ng-click=nameform.$show() ng-show=toc.editable></span> <small class=pull-right></small> <small class=pull-right><button class=\"fa fa-plus btn btn-warning\" ng-if=toc.editable ng-click=toc.newtopsection()></button><switch ng-model=toc.editable ng-change=toc.togglemode() icon=\"fa fa-globe fa-2x\" class=pull-right disabled style=position:absolute;top:-20px;right:0; ng-if=toc.canedit></switch></small></h4></div><div class=card-text><div ui-tree><ol ui-tree-nodes max-depth=6 ng-model=tree.roarlist><li ui-tree-node ng-repeat=\"(key,node) in tree.roarlist | orderBy: $index\" ng-include=\"\'nodes_renderer1.html\'\" style=padding-right:0rem;padding-bottom:0.1rem; node=\"{{node.id || node}}\"></li></ol></div></div></div><script type=text/ng-template id=nodes_renderer1.html><div ui-tree-handle class=\"tree-node tree-node-content\"> <div class=\"tree-node-content flextoprow mouseoverunderline\" style=\"position:relative;\"> <a class=\"btn \" data-nodrag ng-click=\"toggle(this)\" ng-if=\"node.roarlist && node.roarlist.length > 0\" style=\"position:absolute;top:1rem;left:0rem;\"><span class=\"fa text-primary\" ng-class=\"{\'fa-chevron-right\': collapsed, \'fa-chevron-down\': !collapsed}\"></span></a> <input type=\"text\" ng-model=\"node.title\" ng-change=\"node.$save();\" ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 1000, \'blur\': 0} }\" style=\"padding: 0.5rem;color:#444;\" ng-if=\"toc.editable\"> <span ng-if=\"!toc.editable\">{{node.title}}</span> <a class=\"btn showonhover\" data-nodrag ng-if=\"toc.editable\" ng-click=\"remove(this);collection.$save();\"><span class=\"fa fa-close text-danger \"></span></a> <a class=\"btn \" data-nodrag ng-if=\"toc.editable\" ng-click=\"toc.newsubsection(this)\" style=\"position:absolute;right:0.5rem;top:1rem;\"><span class=\"fa fa-plus text-success\"></span></a> <a class=\"btn \" data-nodrag ng-if=\"!toc.editable\" ng-click=\"toc.opensubsection(this)\" style=\"position:absolute;right:0.5rem;top:1rem;\"><span class=\"fa fa-chevron-right text-success\"></span></a> </div> </div> <ol ui-tree-nodes=\"\" ng-model=\"node.roarlist\" ng-class=\"{hidden: collapsed}\" style=\"\"> <li class=\"\" ng-repeat=\"(key, node) in node.roarlist | orderBy: $index track by $index\" ui-tree-node ng-include=\"\'nodes_renderer1.html\'\" style=\"padding-right:0rem;padding-bottom:0.1rem;\" node=\"{{node.id || node}}\"> </li> </ol></script>");}]);})(window);