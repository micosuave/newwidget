'use strict';
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
          height: '90vh',
          framename: 'fframe'
         
        }
      }).widget('iframe-less', {
        title: '-LexFrameViewer',
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
          height: '90vh',
          framename: 'fframe'
        }
      });
  }])
  .controller('iframeController', ["$sce", "config","ckdefault","$scope","$rootScope", function($sce, config, ckdefault, $scope,$rootScope){
    if (config.url){
      this.url = $sce.trustAsResourceUrl(config.url);
    }
    if (config.iframe === true){
        this.srcdoc = $sce.trustAsHtml(config.srcdoc);
    }
   
    $scope.destroy = function(){
        $rootScope.$broadcast('adfToggleEditMode');
    };
   // var loc = $('this').children().children('iframe').get(0).contentWindow.location;
    $scope.ckdefault = ckdefault;
    
  }]);

angular.module("adf.widget.frame").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/iframe/src/edit.html","<form role=form><div class=form-group><label for=url>URL</label> <input type=url class=form-control id=url ng-model=config.url placeholder=http://www.example.com></div><div class=form-group><label for=height>Height</label> <input type=text class=form-control id=height ng-model=config.height></div><div class=form-group><label for=name>Frame name (for url targets)</label> <input type=text class=form-control id=name ng-model=config.framename></div><div class=form-group><label for=name>Use srcdoc instead of url?</label> <input type=checkbox class=form-control id=name ng-model=config.iframe ng-change=destroy()></div><textarea ng-if=\"config.iframe\"ckeditor=ckdefault ng-model=config.srcdoc  ng-model-options=\"{updateOn: 'default blur', debounce: {'default': 20000, 'blur': 0}}\" ng-change=\"destroy()\"></div></form>");
$templateCache.put("{widgetsPath}/iframe/src/view.html","<div><iframe class=\"adf-iframe\" style=\"height: {{config.height}};width:100%;\" ng-attr-srcdoc={{iframe.srcdoc}} ng-src={{iframe.url}} seamless allowfullscreen name=\"fframe\"></iframe></div>");}]);



angular.module('adf.widget.testwidget', ['adf.provider', 'pdf', 'firebase', 'ui.tree', 'ngDialog'])
    .config(function(dashboardProvider) {
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
                styleClass: 'card',
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/edit.html',
                    modalSize: 'lg',
                    controller: 'CKEditorCtrl',
                    reload: false
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL) {
                        if (config.id) {
                          return config;
                        } else {
                        
                        var params = $rootScope.$stateParams;
                        var id = params.tabid || params.pageid || params.pId;
                            config.id = id;
                            
                        
                        //     return config;
                        //   });
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
                styleClass: 'card',
                edit: {
                    templateUrl: '{widgetsPath}/testwidget/src/edit.html',
                    modalSize: 'lg',
                    controller: 'CKEditorCtrl',
                    reload: false
                },
                resolve: {
                    config: ["config", "$firebaseArray", "$rootScope", "FIREBASE_URL",
                      function (config, $firebaseArray, $rootScope, FIREBASE_URL) {
                        if (config.id) {
                          return config;
                        } else {
                        
                         var params = $rootScope.$stateParams;
                        var id = params.tabid || params.pageid || params.pId;
                            config.id = id;
                        
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
                    config: ["config", "Collections", "$rootScope", "FIREBASE_URL","ckdefault",
                      function (config, Collections, $rootScope, FIREBASE_URL, ckdefault) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = Collections;
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
                            config.framename = 'fframe';
                            config.height = '90vh';
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
                    config: ["config", "Collections", "$rootScope", "FIREBASE_URL","ckdefault",
                      function (config, Collections, $rootScope, FIREBASE_URL, ckdefault) {
                        if (config.id) {
                          return config;
                        } else {
                          var a = Collections;
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
                            config.framename = 'fframe';
                            config.height = '90vh';
                            //config.editor = ckdefault;

                            return config;
                          });
                          return config;


                        }
                      }
                    ]
                  }
            })
            // .widget('embed', {
            //     title: '+EmbedViewer',
            //     titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
            //     description: 'embed arbitrary content from remote sites',
            //     template: '<div ng-bind-html="configs[0]"></div>',
            //     controller: ['$sce', 'config', '$scope', '$compile', function($sce, config, $scope, $compile) {
            //         $scope.configs = $compile($sce.trustAsHtml(config.content))($scope);
            //     }],
            //     styleClass: 'panel panel-default',
            //     frameless: false,
            //     reload: true,
            //     edit: {
            //         template: '<div class="card"><label for="content">Enter embed code</label><textarea name="content" class="form-control" ng-model="config.content"></textarea></div>',
            //         immediate: true,
            //         reload: true
            //     }
            // })
            .widget('embed-less', {
                title: 'EmbedViewer',
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
            });


    })
.controller('PDFController', ['$scope', 'pdfDelegate','config','Collection', function($scope, pdfDelegate, config, Collection) {
    var pdf = this;
    pdf.config = config;
    if (config.url) {
      $scope.pdfUrl = config.url;
    } else if (config.id) {
      Collection(config.id).$loaded().then(function (thing) {
        pdf.item = thing;
      });
    }
    // pdfDelegate.$getByHandle('my-pdf-container').zoomIn();
  }])
  .controller('PhdTocWidgetCtrl', ["$scope", "config", "ckdefault", "ckmin", "Collection", "$controller", "$rootScope","$ACTIVEROAR","Collections","$q","$state","ckstarter","ckender",
        function($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, $ACTIVEROAR, Collections,$q,$state,ckstarter,ckender) {
            $scope.size = 'lg';

            // if (!config.draftid) {
            //     config.draftid = '';
            // } else {
            //     var draft = PROJECTDRAFT(config.draftid);
            //     $scope.draft = draft;
            // }
            var ckstarter = ckstarter;
            var ckender = ckender;
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
                section.content = ckstarter + '<div class="card card-block" style="padding: 10px 20px;"><p>Section content</p></div>' + ckender;
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
  ]).controller('CKEditorCtrl', ["$scope", "config", "ckdefault", "ckmin","ckclip","ckreport","$sce","ROARCLASSES","formattags","$stateParams","Collection", function ($scope, config, ckdefault, ckmin,ckclip, ckreport,$sce,ROARCLASSES,formattags,$stateParams,Collection) {
    var editors = [
      { name: 'Default', obj: ckdefault }
    //   { name: 'Minimal', obj: ckmin },
    //   { name: 'Clip', obj: ckclip },
    //   { name: 'Report', obj: ckreport },
    //   { name: 'Full', obj: null}
    ];
    var treeroot = Collection($stateParams.pId);
    $scope.tree = treeroot;
    $scope.ROARCLASSES = [{label: 'Memo Basic', value: 'llp-memo-draft-basic'}];
    $scope.config = config;
    $scope.editors = editors;
    $scope.formattags = formattags;
    
    var helperclasses=[
        {name: 'h1', label: 'heading1', tag:'<h1 ng-style="this.customstyle">h1</h1>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'h2', label: 'heading2', tag:'<h2 ng-style="this.customstyle">h2</h2>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'h3', label: 'heading3', tag:'<h3 ng-style="this.customstyle">h3</h3>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'h4', label: 'heading4', tag:'<h4 ng-style="this.customstyle">h4</h4>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'h5', label: 'heading5', tag:'<h5 ng-style="this.customstyle">h5</h5>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'h6', label: 'heading6', tag:'<h6 ng-style="this.customstyle">h6</h6>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'p', label: 'paragraph', tag:'<p ng-style="this.customstyle">p</p>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'link', label: 'link', tag:'<a ng-style="this.customstyle">link</a>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'preformatted', label: 'preformatted', tag:'<pre ng-style="customstyle">preformatted</pre>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}},
        {name: 'blockquote', label: 'blockquote', tag:'<blockquote ng-style="customstyle">blockquote</blockquote>',customstyle: {color: 'black', backgroundColor: "white", fontSize: "24px", fontFamily:"Arial"}}
        
    ];
    $scope.helperclasses= helperclasses;
  }])
  .controller('CKEWidgetCtrl', ["$scope", "config", "ckdefault", "ckmin", "Collection", "$controller", "$rootScope","ckclip","ckreport","$ACTIVEROAR","$stateParams","$sce","$compile","ckstarter","ckender","toastr","ROARAnnotations","ROARAnnotation","NGAnnotation","Users","Profile","$http","Upload","$uibModal", function($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, ckclip, ckreport, $ACTIVEROAR, $stateParams, $sce, $compile,ckstarter,ckender, toastr,ROARAnnotations,ROARAnnotation,NGAnnotation,Users,Profile,$http,Upload,$uibModal) {
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
                    },{
                        icon: 'fa-upload',
                        label: 'Upload',
                        styleClass: 'text-primary',
                        onClick: function(draft){ return $scope.getBook();/*var now = new Date().getTime(); var blob = new Blob([draft.content.toString()]); return /**Upload.upload({url: '/upload/',data: {file: Upload.rename(blob, $scope.draft.$id+'.html')}})*/}
                    }]
            };
            function classy(){
                if(config.id !== $scope.$parent.$parent.$parent.adfModel.$id){
                    return 'warning';
                }
                else{
                    return 'hide';
                }
            };
            $scope.getBook = function(){
                alertify.log('submitting form');
              $http.get('/publisher/download/'+config.id).then(function(resp){
                  var data = new File(resp.data);
                  data.saveAs();
            });
            
            $scope.prepareBook = function(draft){
                
                var editScope = $scope.$new();
                editScope.ebook = draft;
                editScope.ebook.content = [editScope.ebook.content];
                // editScope.ebook.content.push(draft);
                angular.forEach(draft.roarlist, function(roar, key){
                    Collection(key).$loaded().then(function(collection){
                        collection.data = collection.content;
                        editScope.ebook.content.push(collection);
                    });
                });
                
                var opts = {
            scope: editScope,
            template: '<div class=modal-header>  <h4 class=modal-title>{{definition.title}}</h4> <div class=\"pull-right widget-icons\"> <a href title=\"Reload Widget Content\" ng-if=widget.reload ng-click=reload()> <i class=\"glyphicon glyphicon-refresh\"></i> </a> <a href title=close ng-click=closeDialog()> <i class=\"glyphicon glyphicon-remove\"></i> </a> </div></div> <div class=modal-body><div ng-include=\"\'{widgetsPath}/getphd/src/phd/epubform.html\'\" ></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"closeDialog()\">Close</button></div>',
            backdrop: 'static',
            size: 'lg'
          };

          var instance = $uibModal.open(opts);
          editScope.getBook = function(ebook){
              alertify.log('submitting form');
              $http.post('/publisher/', ebook);
          };
          editScope.closeDialog = function() {
            
            instance.close();
            editScope.$destroy();
          };
            };
            $scope.dowrap = function(content){
               $scope.content = ckstarter + content + ckender;

            };
             
            var stringtest = function(input){
                return input.startsWith(ckstarter);
            };
            $scope.doclose = function(){
                config.showeditor = false;
            };
            $scope.dosave = function(content){
                var d = new Date();
                var time = d.getTime();
                var prev = $scope.draft.content || "<!DOCTYPE html><html><head><title>Untitled</title></head><body></body></html>";
                if (angular.isUndefined($scope.draft.versionhistory)){
                   $scope.draft.versionhistory = {};
                    $scope.draft.versionhistory[time] = {author: $rootScope.authData.uid,
                                                            content: prev};
                }else{
                    $scope.draft.versionhistory[time] = {author: $rootScope.authData.uid, content: prev};
                }
                //$http.post('/upload',angular.toJson(content));
                $scope.draft.content = content;
                $scope.draft.lastModified = time;
                $scope.draft.$save();
                
            };
            $scope.getAuthor = function(id){
                return Users.all.$getRecord(id).auth.profile.name;
            };
       
            $scope.ckdefault = ckdefault;
         
            if (config.id !== $scope.$parent.$parent.$parent.adfModel.$id) {
              $(this).css({ 'border': '1px dotted red' });
            }
            $scope.updateid = function () {
              //config.id = $ACTIVEROAR.tabid;
              $scope.$parent.$parent.config.id = $scope.$parent.$parent.$parent.adfModel.$id;
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
            }     } 
   ]);