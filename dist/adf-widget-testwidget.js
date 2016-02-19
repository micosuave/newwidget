(function(window, undefined) {'use strict';

angular.module('adf.widget.frame', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('iframe', {
        title: '+LexFrame',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/iframe/src/view.html',
        controller: 'iframeController',
        controllerAs: 'iframe',
        frameless: false,
        reload: true,
        styleClass: 'card',
        edit: {
            controller: 'iframeController',
          templateUrl: '{widgetsPath}/iframe/src/edit.html'
        },
        config: {
          height: '320px'
        }
      }).widget('iframe-less', {
        title: '-LexFrame',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/iframe/src/view.html',
        controller: 'iframeController',
        controllerAs: 'iframe',
        frameless: true,
        reload: true,
        styleClass: 'card',
        edit: {
            controller: 'iframeController',
          templateUrl: '{widgetsPath}/iframe/src/edit.html'
        },
        config: {
          height: '320px'
        }
      });
  }])
  .controller('iframeController', ["$sce", "config","ckdefault","$scope", function($sce, config, ckdefault, $scope){
    if (config.url){
      this.url = $sce.trustAsResourceUrl(config.url);
    }
    if (config.srcdoc){
        this.srcdoc = $sce.trustAsHtml(config.srcdoc);
    }
    $scope.ckdefault = ckdefault;
  }]);

angular.module("adf.widget.frame").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/iframe/src/edit.html","<form role=form><div class=form-group><label for=url>URL</label> <input type=url class=form-control id=url ng-model=config.url placeholder=http://www.example.com></div><div class=form-group><label for=url>Height</label> <input type=text class=form-control id=url ng-model=config.height><textarea ckeditor=ckdefault ng-model=config.srcdoc ng-model-options=\"{updateOn: 'default blur', debounce: {'default': 20000, 'blur': 0}}\"</div></form>");
$templateCache.put("{widgetsPath}/iframe/src/view.html","<div><div class=\"alert alert-info\" ng-if=!(config.url||config.srcdoc)>Please insert a url in the widget configuration</div><iframe class=\"adf-iframe\" style=\"height: {{config.height}};width:100%;\" ng-attr-srcdoc={{iframe.srcdoc}} ng-src={{iframe.url}} seamless allowfullscreen name=fframe></iframe></div>");}]);



angular.module('adf.widget.testwidget', ['adf.provider', 'pdf', 'firebase', 'ui.tree', 'ui.router', 'ngDialog'])
    .config(["dashboardProvider", function(dashboardProvider) {
        dashboardProvider
        //   .widget('pdfviewer', {
        //     title: 'PDF Viewer',
        //     description: 'PDFJS viewer',
        //     controller: 'PDFController',
        //     controllerAs: 'pdf',
        //     templateUrl: '{widgetsPath}/testwidget/src/pdfview.html',
        //     frameless: true,
        //     reload: true,
        //     styleClass: 'card-fancy',
        //     edit: {
        //       templateUrl: '{widgetsPath}/iframe/src/edit.html',
        //       reload: true,
        //       controller: 'PDFController',
        //       controllerAs: 'pdf'

        //     }
            
        //     })
            .widget('tocwidget-less', {
                title: '+Table of Contents',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'Prototype LLP Platform App',
                controller: 'PhdTocWidgetCtrl',
                controllerAs: 'toc',
                templateUrl: '{widgetsPath}/testwidget/src/view.html',
                frameless: true,
                reload: true,
                immediate: false,
                styleClass: 'llp-memo-draft-basic',
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/edit.html',
                    modalSize: 'lg',
                    controller: 'PhdTocWidgetCtrl',
                    reload: false
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = $firebaseArray(new Firebase(FIREBASE_URL + 'matters/' + $rootScope.$stateParams.groupId + '/' + $rootScope.$stateParams.matterId + '/content/'));
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
            }).widget('tocwidget', {
                title: '-Table of Contents',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'Prototype LLP Platform App',
                controller: 'PhdTocWidgetCtrl',
                controllerAs: 'toc',
                templateUrl: '{widgetsPath}/testwidget/src/view.html',
                frameless: true,
                reload: true,
                immediate: false,
                styleClass: 'llp-memo-draft-basic',
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/edit.html',
                    modalSize: 'lg',
                    controller: 'PhdTocWidgetCtrl',
                    reload: false
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = $firebaseArray(new Firebase(FIREBASE_URL + 'matters/' + $rootScope.$stateParams.groupId + '/' + $rootScope.$stateParams.matterId + '/content/'));
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
            }).widget('ckwidget-less', {
                title: '-LexPad',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'text editor',
                controller: 'CKEWidgetCtrl',
                templateUrl: '/newwidget/src/ckeditor.html',
                frameless: true,
                reload: true,
                immediate: true,
                styleClass: ' panel-default',
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/editckeditor.html',
                    modalSize: 'lg',
                    controller: 'CKEditorCtrl',
                    reload: true
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL","ckdefault",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL, ckdefault) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = $firebaseArray(new Firebase(FIREBASE_URL + 'matters/' + $rootScope.$stateParams.groupId + '/' + $rootScope.$stateParams.matterId + '/content/'));
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
                            //config.editor = ckdefault;

                            return config;
                          });
                          return config;


                        }
                      }
                    ]
                  }
            }).widget('ckwidget', {
                title: '+LexPad',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'text editor',
                controller: 'CKEWidgetCtrl',
                templateUrl: '/newwidget/src/ckeditor.html',
                frameless: true,
                reload: true,
                immediate: true,
                styleClass: 'panel panel-default',
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/editckeditor.html',
                    modalSize: 'lg',
                    controller: 'CKEditorCtrl',
                    reload: true
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL","ckdefault",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL, ckdefault) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = $firebaseArray(new Firebase(FIREBASE_URL + 'matters/' + $rootScope.$stateParams.groupId + '/' + $rootScope.$stateParams.matterId + '/content/'));
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
                            //config.editor = ckdefault;

                            return config;
                          });
                          return config;


                        }
                      }
                    ]
                  }
            }).widget('embed', {
                title: '+EmbedViewer',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'embed arbitrary content from remote sites',
                template: '<div ng-bind-html="configs[0]"></div>',
                controller: ['$sce', 'config', '$scope', '$compile', function($sce, config, $scope, $compile) {
                    $scope.configs = $compile($sce.trustAsHtml(config.content))($scope);
                }],
                styleClass: 'panel panel-default',
                frameless: false,
                reload: true,
                edit: {
                    template: '<div class="card"><label for="content">Enter embed code</label><textarea name="content" class="form-control" ng-model="config.content"></textarea></div>',
                    immediate: true,
                    reload: true
                }
            }).widget('embed-less', {
                title: '-EmbedViewer',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'embed arbitrary content from remote sites',
                template: '<div ng-bind-html="configs[0]"></div>',
                controller: ['$sce', 'config', '$scope', '$compile', function($sce, config, $scope, $compile) {
                    $scope.configs = $compile($sce.trustAsHtml(config.content))($scope);
                }],
                styleClass: 'card card-block',
                frameless: true,
                reload: true,
                edit: {
                    template: '<div class="card"><label for="content">Enter embed code</label><textarea name="content" class="form-control" ng-model="config.content"></textarea></div>',
                    immediate: true,
                    reload: true
                }
            })


    }])


/*
.widget('dash', {
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

  })
*/



.controller('PDFController', ['$scope', 'pdfDelegate','config','Collection', function($scope, pdfDelegate, config, Collection) {
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
  .controller('PhdTocWidgetCtrl', ["$scope", "config", "ckdefault", "ckmin", "Collection", "$controller", "$rootScope","$ACTIVEROAR","Collections","$q","$state",
        function($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, $ACTIVEROAR, Collections,$q,$state) {
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
            if($state.includes('roartheatre')){
                $scope.parentstate = 'theatretoptab';
                config.editable = false;
                $('#dragbutton').hide();
            }
            else{
                $scope.parentstate = 'toptab';
            }
            toc.broadcast = function (data) {
              $rootScope.$broadcast('TABLEOFCONTENTS', data);
            };
            toc.returnroot = function () {
              $rootScope.$broadcast('RETURNROOT', config.id);
            };
            // var pj = {
            //   editable: editable()
            // };
           toc.canedit = function() {
              if ($rootScope.$state.includes('projectdashboard')) {
                return true;
              }
              if ($rootScope.$state.includes('roartheatre')) {
                return false;
              }
            };
           toc.editable = false;
            $scope.$on('adfToggleEditMode', function(){
              toc.editable = !toc.editable;
            })
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
                var draft = Collection(draftId);
                draft.$bindTo($scope, 'tree');
            };


            //draft.$bindTo($scope, 'draft');
            //var notes = ROARsnippets(matterId);
            //$scope.notecards = notes;
            var DasH = function(draftid, rootid) {
                var dashref = Collection(draftid).$ref();
                var dash = {
                
                
                titleTemplateUrl: '/llp_core/modules/lionlawlabs/partial/projectdashboard/tabs/memo/title.html',
                structure: '4-8',
                styleClass: 'PTO', 
                renderClass: 'llp-memo-draft-basic',
                isActive: true,
                editable: true,
                collapsible: true,
                maximizable: true,
                enableConfirmDelete: true,
                hideme: false,
                isRoot: false,
                
                    rows: [{
                        columns: [{
                            styleClass: 'col-sm-4',
                            widgets: [{type: 'tocwidget',title:'Table of Contents', config:{id: rootid}}]
                        }, { styleClass: 'col-md-8', widgets: [{type: 'ckwidget',title:'',config:{id: draftid, editor: 'ckdefault'}}]
                        }]
                    }]
                };
                 dashref.update(dash); 
                 return dashref.key();
            };
          

            var Section = function(){
              var section = this;
                section.title = 'Section Title';
                section.content = 'Section content';
                section.isnotRoot = true;
               return section;
            };
            toc.newtopsection = function () {
              var modelref = Collection($scope.tree.id).$ref();

              Collections().$add(new Section()).then(function (ref) {
                var id = ref.key();
                DasH(id, config.id);
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
                  DasH(id, config.id);
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
            toc.opensubsection = function (node) {
              //window.alert(scope);
              alertify.log('TOC OUT');
              $rootScope.$broadcast('TABLEOFCONTENTS', node.id || node);
              //debugger;
              //toc.broadcast(node.id);
              //debugger;
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
          
        }
  ]).controller('CKEditorCtrl', ["$scope", "config", "ckdefault", "ckmin","ckclip","ckreport","$sce","ROARCLASSES","formattags", function ($scope, config, ckdefault, ckmin,ckclip, ckreport,$sce,ROARCLASSES,formattags) {
    var editors = [
      { name: 'Default', obj: ckdefault }
    //   { name: 'Minimal', obj: ckmin },
    //   { name: 'Clip', obj: ckclip },
    //   { name: 'Report', obj: ckreport },
    //   { name: 'Full', obj: null}
    ];
    $scope.ROARCLASSES = [{label: 'Memo Basic', value: 'llp-memo-draft-basic'}];
    $scope.config = config;
    $scope.editors = editors;
    $scope.formattags = formattags;
    
    
  }])
  .controller('CKEWidgetCtrl', ["$scope", "config", "ckdefault", "ckmin", "Collection", "$controller", "$rootScope","ckclip","ckreport","$ACTIVEROAR","$stateParams","$sce","$compile","ckstarter","ckender","toastr","ROARAnnotations","ROARAnnotation","NGAnnotation","Users","Profile",
        function($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, ckclip, ckreport, $ACTIVEROAR, $stateParams, $sce, $compile,ckstarter,ckender, toastr,ROARAnnotations,ROARAnnotation,NGAnnotation,Users,Profile) {
            $scope.size = 'lg';

            $scope.ckclip = ckclip;
            $scope.ckreport = ckreport;
            $scope.config = config;
            $scope.ckdefault = ckdefault;
            $scope.ckmin = ckmin;
            $scope.ckstarter = ckstarter;
            $scope.ckender = ckender;
            $('#dragbutton').draggable({cursor: 'move'});
            $scope.profile = Profile($rootScope.authData.uid);
            $scope.menu = {
                items: [
                    {   icon: 'fa-pencil',
                        label: 'Toggle Edit Mode',
                        styleClass: 'text-info',
                        onClick: function(draft){return config.showeditor = !config.showeditor; }
                    },{
                        icon: 'fa-alert',
                        label: 'Syncronize Editor',
                        styleClass: classy(),
                        onClick: function(draft){ return $scope.updateid();}  
                    },{
                        icon: 'fa-refresh',
                        label: 'Restore Defaults',
                        styleClass: 'text-success',
                        onClick: function(draft){ var content = draft.content.slice(draft.content.indexOf('<body>'),draft.content.length); return $scope.draft.content = $scope.ckstarter + content + $scope.ckender;}
                    }]
            };
            function classy(){
                if($stateParams.tabid){
                    if (config.id === $stateParams.tabid){
                        return 'hide';
                    }
                    else{
                        return 'warning';
                    }
                }
                else if ($stateParams.pageid){
                     if (config.id === $stateParams.pageid){
                        return 'hide';
                    }
                    else{
                        return 'warning';
                    }
                }
                else if ($stateParams.pId){
                     if (config.id === $stateParams.pId){
                        return 'hide';
                    }
                    else{
                        return 'warning';
                    }
                }
                else{
                    return 'primary';
                }
            };
            $scope.dosave = function(content){
                var d = new Date();
                var time = d.getTime();
                var prev = $scope.draft.content;
                if (angular.isUndefined($scope.draft.versionhistory)){
                   $scope.draft.versionhistory = {};
                    $scope.draft.versionhistory[time] = {author: $rootScope.authData.uid,
                                                            content: prev};
                }else{
                    $scope.draft.versionhistory[time] = {author: $rootScope.authData.uid, content: prev};
                }
                $scope.draft.content = content;
                $scope.draft.lastModified = time;
                $scope.draft.$save();
                config.showeditor = false;
            };
            $scope.getAuthor = function(id){
                return Users.all.$getRecord(id).auth.profile.name;
            };
            // var pj = {
            //   editable: editable()
            // };
            $scope.ckdefault = ckdefault;
            // if (angular.isString(config.editor)) {
            //   if (config.editor === 'ckdefault') {
            //     config.editor = ckdefault;
            //   }
            //   else if (config.editor === 'ckmin') {
            //     config.editor = ckmin;
            //   }
            //   else if (config.editor === 'ckreport') {
            //     config.editor = ckreport;
            //   }
            //   else if (config.editor === 'ckclip') {
            //     config.editor = ckclip;
            //   }
            // }
            // else{
            //     config.editor = ckdefault;
            // }
            if (config.id !== ($stateParams.tabid || $stateParams.pageid || $stateParams.pId)) {
              $('#ckdrafter' + config.id).css({ 'border': '1px dotted red' });
            }
            $scope.updateid = function () {
              //config.id = $ACTIVEROAR.tabid;
              $scope.$parent.$parent.config.id = $stateParams.tabid || $stateParams.pageid || $stateParams.pId;
              $scope.$parent.$parent.reload();
            };
            $scope.$on('RETURNROOT', function ($event, $data) {
              $scope.$parent.$parent.config.id = $data;
              $scope.$parent.$parent.reload();
            });
            $scope.$on('TABLEOFCONTENTS', function ($event, $data) {
             
               alertify.log('TOC REC');
               alertify.log($data);
              
               $scope.$parent.$parent.config.id = $data;
               $scope.$parent.$parent.reload();
               $scope.loaddraft($data);
             
            });
            
        
            //$scope.pj = pj;
            var draft = Collection(config.id);
            // draft.$bindTo($scope, 'draft');
            $scope.draft = draft;
            draft.$loaded().then(function(draft){
                 $scope.content = angular.copy(draft.content);
            });
           
            // $scope.loaddraft = function(draftId) {
            //     var draft = Collection(draftId);
            //     draft.$bindTo($scope, 'draft');
            // };

            // draft.$loaded().then(function(d){
            //     var head = "<!DOCTYPE html><html class='html'><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css'><link rel='stylesheet' href='//lexlab.io/llp_core/dist/app.full.min.css'><script src='https://code.jquery.com/jquery-2.2.0.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js'></script><base href='/' target='_blank'/></head><body class='html' style='padding:10px 5px;'><div class='card card-block'>";
            //     $scope.sourcedoc = $sce.trustAsHtml(head + d.content);
            // });
            
            var Section = function(){
              var section = this;
               section={ titleTemplateUrl: '/llp_core/modules/lionlawlabs/partial/projectdashboard/tabs/memo/title.html',
                structure: '4-8',
                styleClass: 'PTO', 
                renderClass: 'llp-memo-draft-basic',
                isActive: true,
                editable: true,
                collapsible: true,
                maximizable: true,
                enableConfirmDelete: true,
                hideme: false,
                isRoot: false,
                
                    rows: [{
                        columns: [{
                            styleClass: 'col-sm-4',
                            widgets: [{type: 'tocwidget',title:'Table of Contents', config:{id: draftid}}]
                        }, { styleClass: 'col-md-8', widgets: [{type: 'ckwidget',title:'',config:{id: draftid, editor: 'ckdefault'}}]
                        }]
                    }]
               };
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
       

         
        }
   ]).value('formattags', [
       {name: 'h1', label: 'heading1', value: '<h1></h1>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']},
       {name: 'h2', label: 'heading2', value: '<h2></h2>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']},
       {name: 'h3', label: 'heading3', value: '<h3></h3>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']},
       {name: 'h4', label: 'heading4', value: '<h4></h4>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']},
       {name: 'h5', label: 'heading5', value: '<h5></h5>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']},
       {name: 'h6', label: 'heading6', value: '<h6></h6>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']},
       {name: 'p', label: 'paragraph', value: '<p></p>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']},
       {name: 'pre', label: 'preformatted', value: '<pre></pre>',attributes:['fontSize','color','backgroundColor','fontFamily','fontStyle','textDecoration','margin', 'padding','border','overflow']}
       
   ]);

angular.module("adf.widget.testwidget").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/testwidget/src/ckeditor.html","<div class=card style=\"margin: -0.1rem;padding: 0.1rem;text-align: left;overflow: scroll; height: 60rem;border: 0rem solid #110000;box-shadow:0 0 0 transparent;\" ng-if=\"config.showeditor && !config.versionhistory\"><div class=card-header ng-show=draft.isnotRoot><h3 class=card-title>{{draft.title}}</h3></div><form name=editorform ng-submit=dosave(content);><textarea id={{config.id}} name=editorta ng-change ckeditor=ckdefault ng-model=content ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 500, \'blur\': 0} }\" class=\"card card-block\" style=width:100%;min-height:500px;font-size:12px;color:#444;></textarea><div class=btn-group style=position:absolute;top:5px;right:5px;><input type=submit style=\"border-radius:0;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1);border:1px solid white;\" class=\"button btn fa fa-save text-success\" value=SAVE> <button style=\"border-radius:0;padding: 5px 5px; box-shadow: 1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1); border: 1px solid white;\" class=\"button btn fa fa-2x fa-close text-danger\" ng-click=\"config.showeditor = false;\"></button></div></form></div><div ng-bind-html=draft.content id=draftdocument class=\"{{config.styleClass}} {{config.custom || \'llp-memo-draft-basic\'}}\" ng-if=\"!config.showeditor && !config.iframe && !config.versionhistory\" style=width:100%;min-height:500px;></div><iframe id=draftdocument2 class=\"card card-block {{config.styleClass}} {{config.custom || \'llp-memo-draft-basic\'}}\" ng-if=\"!config.showeditor && config.iframe && !config.versionhistory\" seamless sandbox=\"allow-scripts allow-same-origin allow-popups-to-escape-sandbox allow-popups allow-pointer-lock allow-orientation-lock allow-modals allow-forms\" referrerpolicy=unsafe-url name=draftrenderer allowfullscreen ng-attr-srcdoc={{draft.content}} style=width:100%;min-height:500px;></iframe><div ng-bind-html=\"draft.content | diff:config.version.content\" id=draftdocument class=\"{{config.styleClass}} {{config.custom || \'llp-memo-draft-basic\'}}\" ng-if=\"!config.showeditor && !config.iframe && config.versionhistory\" style=width:100%;min-height:500px;></div><div class=pull-right uib-dropdown uib-keyboard-nav dropdown-append-to-body style=position:absolute;top:0;right:0; ng-if=!config.showeditor><button id=dragbutton draggable class=\"dragbutton pull-right btn btn-default btn-sm fa fa-2x\" ng-class=\"{\'fa-edit text-info\':!config.showeditor,\'fa-save text-success\':config.showeditor, \'btn-danger\':!(editorform.editorta.$modelValue == editorform.editorta.$viewValue)}\" style=\"position:absolute;top:-25px;right:-25px;border-radius:50%;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1);border:1px solid white;\" uib-dropdown-toggle></button><ul class=\"uib-dropdown-menu dropdown-menu-right\"><li class={{menuitem.styleClass}} ng-repeat=\"menuitem in menu.items\"><a ng-click=menuitem.onClick(draft) class=\"fa fa-2x {{menuitem.icon}} {{menuitem.styleClass}}\">&nbsp;&nbsp;&nbsp;&nbsp;{{menuitem.label}}</a></li><li></li><li ng-if=config.versionhistory ng-repeat=\"(key,version) in draft.versionhistory\"><a ng-click=\"config.version = version\"><h5><strong>{{$index}} - {{key | date : \'medium\'}}</strong><br><em>{{getAuthor(version.author)}}</em></h5></a></li><cursor ng-repeat=\"(key,user) in profile.users\" userid={{key}}></cursor></ul></div>");
$templateCache.put("{widgetsPath}/testwidget/src/dashedit.html","<div class=\"card-fancy card-rounded card-thick\"><div class=card-header><button type=button class=close ng-click=closeDialog() aria-hidden=true>&times;</button><h4 class=modal-title>Edit Page</h4></div><div class=\"card card-block\"><form role=form><div class=form-group><label for=dtitle>Title</label> <input type=text ng-model=config.title placeholder=Title></div><div class=form-group><label>Structure</label><div class=card-columns><div class=\"radio card {{key}}\" ng-repeat=\"(key, structure) in structures\"><label><input type=radio value={{key}} ng-model=model.structure ng-change=\"changeStructure(key, structure)\"> {{key}}</label></div></div></div><div class=row><div class=\"form-group row\"><label>Collapsible?</label> <input type=checkbox ng-model=dashboard.collapsible></div><div class=\"form-group row\"><label>Maxizable?</label> <input type=checkbox ng-model=dashboard.maximizable></div><div class=\"form-group row\"><label>Protected?</label> <input type=checkbox ng-model=dashboard.enableConfirmDelete></div></div><select ng-model=dashboard.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\" class=form-control placeholder=\"Select Style...\"></select></form><adf-dashboard name={{dashboard.title}} structure={{dashboard.structure}} collapsible={{dashboard.collapsible}} maximizable={{dashboard.maximizable}} enable-confirm-delete={{dashboard.enableConfirmDelete}} class={{dashboard.styleClass}} frameless={{dashboard.frameless}} continuous-edit-mode=false adf-model=dashboard.model></adf-dashboard></div><div class=card-footer><button type=button class=\"btn btn-primary card-link\" ng-click=closeDialog()>Close</button></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/diff.html","<div class=col-sm-6><pre>\n       \n       {{draft.content | json:4 | diff:editorform.editorta.$modelValue}}\n       \n   </pre></div><div class=col-sm-6><div ng-bind-html=\"draft.content | diff: editorform.editorta.$modelValue\"></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/document.html","<div class=card><section ng-repeat=\"(key, node) in node.roarlist\" node=\"{{node.id || node}}\"><label>{{node.title}}</label><ng-annotate-text text=node.content></ng-annotate-text><div ng-include=\"\'./document.html\'\" ng-repeat=\"(key, node) in node.roarlist\"></div></section></div>");
$templateCache.put("{widgetsPath}/testwidget/src/edit.html","<form role=form><div class=form-group><label for=draftid>Tree Root</label><select ng-model=config.id ng-change=loaddraft(config.id) ng-options=\"branch.id as branch.name for branch in tree\" class=form-control id=draftid placeholder=\"Select Root Branch...\"></select></div><a class=\"card fa fa-file\" ng-repeat=\"branch in tree\" ng-click=\"config.id = branch.id\">{{branch.name}}</a> <button class=\"dashed-outline fa fa-4x fa-plus\" ng-click=newdraft()></button></form>");
$templateCache.put("{widgetsPath}/testwidget/src/editckeditor.html","<form role=form editable-form><div class=form-group><label for=draftid>Style Configuration</label><select ng-model=config.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\" class=form-control id=styleclass placeholder=\"Select style...\"><option label=default></option></select><input type=text ng-model=config.custom placeholder=\"custom style class(es)\" style=padding:0.8rem> <button editable-checklist=config.styleClass e-options=\"class.value as class.label for class in ROARCLASSES\">{{config.styleClass}}</button></div><div class=form-group><label for=renderframe>Render in iframe</label> <input type=checkbox ng-model=config.iframe></div><div class=form-group><label for=renderversionhistory>Version History</label> <input type=checkbox ng-model=config.versionhistory></div><div class=row ng-repeat=\"class in helperclasses\"><label for=helperclass>{{class.label}}</label> <input type=checkbox ng-checked=\"(config.class.value == true)\"><div class=pull-left ng-bind-html=tag.value></div><div ng-repeat=\"attribute in tag.attributes\"><a editable-text=attribute.value>{{attribute.label}}</a></div></div></form>");
$templateCache.put("{widgetsPath}/testwidget/src/editembed.html","<div class=card><button ng-click=push(newtab) class=\"btn btn-info fa fa-plus\"></button> <label for=tabname>Enter Title</label> <input type=text ng-model=newtab.title><select ng-model=newtab.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\"></select><label for=content>Enter embed code</label> <textarea name=content class=form-control ng-model=newtab.content></textarea></div><div style=\"overflow: scroll;\"><h4>Edit existing sections:</h4><div class=card ng-repeat=\"tab in config.content track by $index\"><label for=tabname>Edit Title</label> <input type=text name=tabname ng-model=tab.title> <label for=content>Edit Embed Code</label> <textarea name=content class=form-control ng-model=tab.content></textarea></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/embed.html","<div class=expand><tabset class=\"ngDialogTab tab-stacked\" vertical=true><tab ng-repeat=\"tab in tabs\"><ul class=list-group-action><li class=list-group-item>{{tab.title}} <button class=\"circle btn btn-info fa fa-chevron-right fa-2x pull-right\" ng-click=loadDashboard(tab.content)></button> <span class=show-menu><span class=\"glyphicon glyphicon-chevron-right\"></span></span><ul class=list-group-submenu><li class=\"list-group-submenu-item success\"><span class=\"glyphicon glyphicon-remove\"></span></li><li class=\"list-group-submenu-item danger\"><span class=\"glyphicon glyphicon-ok\"></span></li></ul></li></ul></tab><tab ng-repeat=\"tab in config.content\" class=\"btn {{tab.styleClass}}\"><tab-heading>{{tab.title}}</tab-heading><div ng-bind-html=tab.content></div></tab></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/pdfview.html","<div ng-pdf=pdf.url ng-pdf-zoom=1 ng-pdf-template=\"\'/llp_core/bower_components/angular-pdf-directive/build/partials/pdf.html\'\"></div><pdf-viewer delegate-handle=pdf url=pdf.url scale=1 show-toolbar=true headers=\"{ \'Access-Control-Allow-Origin\': \'*\' }\"></pdf-viewer>");
$templateCache.put("{widgetsPath}/testwidget/src/sidebar.html","<div class={{config.styleClass}} ng-controller=\"EmbedCtrl as em\"><tabset class=\"{{config.styleClass || \'alert alert-danger\'}}\"></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/title.html","<h5 class=card-title><a title=\"change widget location\" class=adf-move ng-if=editMode><i class=\"glyphicon glyphicon-move\"></i></a> {{config.title || widget.title}} <a title=\"collapse widget\" ng-show=\"options.collapsible && !widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-minus\"></i></a> <a title=\"expand widget\" ng-show=\"options.collapsible && widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-plus\"></i></a> <span class=pull-right><a title=\"reload widget content\" ng-if=widget.reload ng-click=reload()><i class=\"fa fa-refresh\"></i></a> <a title=\"edit widget configuration\" ng-click=edit() ng-if=editMode><i class=\"glyphicon glyphicon-cog\"></i></a> <a title=\"fullscreen widget\" ng-click=openFullScreen() ng-show=options.maximizable><i class=\"glyphicon glyphicon-fullscreen\"></i></a> <a title=\"remove widget\" ng-click=remove() ng-if=editMode><i class=\"glyphicon glyphicon-remove\"></i></a></span></h5>");
$templateCache.put("{widgetsPath}/testwidget/src/view.html","<div class=card-header><button id=dragbutton draggable ng-click=\"config.editable = !config.editable\" class=\"dragbutton pull-right btn btn-default btn-sm fa fa-2x\" ng-class=\"{\'fa-edit text-info\':!config.editable,\'fa-save text-success\':config.editable}\" style=\"position:absolute;top:-25px;right:-25px;border-radius:50%;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.25), inset 0 0 20px rgba(0,0,0,0.1);border:1px solid white;\"></button><h4 class=card-title><span e-form=nameform editable-text=tree.contentlistname buttons=no onaftersave=tree.$save();><span ng-click=toc.opensubsection(tree) ng-if=tree.roarlist>{{tree.contentlistname || \'Contents\'}}</span> <span class=\"fa fa-edit showonhover\" ng-click=nameform.$show()></span> <small class=pull-right><a class=\"fa fa-plus text-warning\" ng-if=config.editable ng-click=toc.newtopsection()></a></small></span></h4></div><div ng-if=tree.roarlist><div ui-tree=treeOptions data-nodrag style=cursor:pointer!important;><ol ui-tree-nodes max-depth=6 ng-model=tree.roarlist><li ui-tree-node ng-repeat=\"(key,node) in tree.roarlist\" ng-include=\"\'nodes_renderer1.html\'\" style=padding-right:0rem;padding-bottom:0.1rem; node=\"{{node.id || node}}\"></li></ol></div></div><script type=text/ng-template id=nodes_renderer1.html><div ui-tree-handle class=\"tree-node tree-node-content\"> <div class=\"tree-node-content flextoprow \" style=\"position:relative;\"> <a class=\"btn \" data-nodrag ng-click=\"toggle(this)\" ng-if=\"node.roarlist\" style=\"\"><span class=\"fa \" ng-class=\"{\'fa-chevron-right\': collapsed, \'fa-chevron-down\': !collapsed}\" style=\"color:steelblue;transition:all 0.25s ease;\"></span></a> <input type=\"text\" ng-model=\"node.title\" ng-change=\"node.$save();\" ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 1000, \'blur\': 0} }\" style=\"padding: 0.5rem;color:#444;\" ng-if=\"config.editable\"> <a class=\"btn showonhover\" data-nodrag ng-if=\"config.editable\" ng-click=\"remove(this);collection.$save();\"><span class=\"fa fa-close text-danger \"></span></a> <a class=\"btn \" data-nodrag ng-if=\"config.editable\" ng-click=\"toc.newsubsection(this)\" style=\"\"><span class=\"fa fa-plus text-success\"></span></a> <a class=\"gototarget btn\" data-nodrag ui-sref=\"{{parentstate}}.righttab({tabid: node.id})\" style=\"\"> <span ng-if=\"!config.editable\" class=\"pull-left\">{{node.title}}</span><i style=\"position:absolute;right:0;\">&nbsp;</i></a> </div> </div> <ol ui-tree-nodes=\"\" ng-model=\"node.roarlist\" ng-class=\"{hidden: collapsed}\" style=\"\"> <li class=\"\" ng-repeat=\"(key, node) in node.roarlist\" ui-tree-node ng-include=\"\'nodes_renderer1.html\'\" style=\"padding-right:0rem;padding-bottom:0.1rem;\" node=\"{{node.id || node}}\"> </li> </ol></script>");}]);})(window);