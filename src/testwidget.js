'use strict';
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
    .config(function(dashboardProvider) {
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

  }).controller('PDFController', ['$scope', 'pdfDelegate','config','Collection', function($scope, pdfDelegate, config, Collection) {
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
