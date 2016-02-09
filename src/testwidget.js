'use strict';
angular.module('adf.widget.frame', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('iframe', {
        title: 'LexFrame',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/iframe/src/view.html',
        controller: 'iframeController',
        controllerAs: 'iframe',
        frameless: true,
        reload: true,
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
                title: 'Table of Contents',
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
            }).widget('ckwidget', {
                title: 'LexPad',
                titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
                description: 'text editor',
                controller: 'CKEWidgetCtrl',
                templateUrl: '/newwidget/src/ckeditor.html',
                frameless: true,
                reload: true,
                immediate: false,
                styleClass: 'llp-memo-draft-basic panel-default',
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
                            config.editor = ckdefault;

                            return config;
                          });
                          return config;


                        }
                      }
                    ]
                  }
            }).widget('embed', {
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
            })


    })


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
  ]).controller('CKEditorCtrl', ["$scope", "config", "ckdefault", "ckmin","ckclip","ckreport","$sce", function ($scope, config, ckdefault, ckmin,ckclip, ckreport,$sce) {
    var editors = [
      { name: 'Default', obj: ckdefault },
      { name: 'Minimal', obj: ckmin },
      { name: 'Clip', obj: ckclip },
      { name: 'Report', obj: ckreport },
      { name: 'Full', obj: null}
    ];
    var templates=[
     {title: "Memorandum",
    image:"template1.gif",
    description: "Template for a simple memo.",
    html: $sce.trustAsHtml('<div class="panel" style="width: 816px;height:1056px;border: 1px solid black;padding:48px"> <table id="pageheadertable" style="width: 100%;height: 48px;border: 0px solid red;"> <colgroup> <col width="50px"> <col width=""> <col width="49px"> </colgroup> <tbody> <tr> <td style="text-align: left;border-right: 5px double black;color:#aaaaaa">Left</td> <td style="text-align:center;color:#aaaaaa">Center</td> <td style="text-align: right;text-indent: 48px;color:#aaaaaa">Right</td> </tr> </tbody> </table> <div style="border: 0px solid blue;width:15px;margin-left:30px;height:864px;"> <table height="100%"> <tr><td>&nbsp&nbsp1</td></tr> <tr><td>&nbsp&nbsp2</td></tr> <tr><td>&nbsp&nbsp3</td></tr> <tr><td>&nbsp&nbsp4</td></tr> <tr><td>&nbsp&nbsp5</td></tr> <tr><td>&nbsp&nbsp6</td></tr> <tr><td>&nbsp&nbsp7</td></tr> <tr><td>&nbsp&nbsp8</td></tr> <tr><td>&nbsp&nbsp9</td></tr> <tr><td>10</td></tr> <tr><td>11</td></tr> <tr><td>12</td></tr> <tr><td>13</td></tr> <tr><td>14</td></tr> <tr><td>15</td></tr> <tr><td>16</td></tr> <tr><td>17</td></tr> <tr><td>18</td></tr> <tr><td>19</td></tr> <tr><td>20</td></tr> <tr><td>21</td></tr> <tr><td>22</td></tr> <tr><td>23</td></tr> <tr><td>24</td></tr> <tr><td>25</td></tr> <tr><td>26</td></tr> <tr><td>27</td></tr> <tr><td>28</td></tr> </table> </div> <div style="width: 624px;height: 864px;border: 1px solid #DDDDDD;border-left: 5px double black;margin: -864px 48px 0px 48px;overflow:hidden;"> <span style="text-align:right;"><img class="pull-right" src="/llp_core/img/gs.jpeg" width="50px" /></span> <h2 style="text-align:right;">Memorandum&nbsp</h2> <p>&nbsp</p> <h4 style="margin-top: -5px"><strong> &nbspFrom:</strong><small style="margin-left:10px;">Sender</small></h4> <h4><strong> &nbspTo:</strong><small style="margin-left:35px;">Reciever</small></h4> <h4><strong> &nbspRe:</strong><small style="margin-left:35px;">Subject</small></h4> <h4><strong> &nbspDate:</strong><small style="margin-left:15px;">MM/DD/YYYY</small></h4> <p></p> <hr style="height: 0px;border: 1px solid #aaaaaa;"> <p style="text-indent: 50px;margin-top:0px;line-height: 2.15">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur arcu massa, eu tristique tortor semper nec. Proin consectetur consectetur massa, in gravida tortor finibus eget. Nunc vel metus lacinia, mattis enim non, porttitor tellus. Curabitur dignissim nec sapien et finibus. Cras nec urna feugiat, fermentum est ac, dapibus quam. Vivamus ipsum orci, dapibus vel felis ultrices, placerat iaculis nulla. Vivamus ut interdum nunc. In sit amet pharetra nulla, ut vulputate mi.</p> <p style="text-indent: 50px;margin-top:0px;line-height: 2.15">Cras ac tortor ac odio tempus iaculis. Aliquam sed accumsan elit, ac facilisis felis. Morbi vulputate ante justo, eu porttitor nibh volutpat sed. Sed tincidunt arcu at vehicula eleifend. Nam tristique semper sagittis. Praesent a ultricies odio. Etiam at nibh urna. Curabitur feugiat justo ac metus suscipit, gravida interdum dolor rutrum. Curabitur sit amet dui mattis, cursus turpis eget, fringilla felis. Morbi mollis dapibus hendrerit. Quisque elementum sodales nibh a varius. In sollicitudin ultricies tempus.</p> <p style="text-indent: 50px;margin-top:0px;line-height: 2.15">Suspendisse vel nunc et tellus sagittis volutpat. Cras imperdiet leo ut mauris lobortis vestibulum. Cras in venenatis est. In finibus in augue quis vestibulum. Pellentesque suscipit sit amet neque et ornare. Aliquam sit amet turpis at dolor condimentum tincidunt. Duis sed sodales nulla, sed dictum mauris. Proin in nunc tincidunt, efficitur quam id, placerat ipsum. Sed varius lectus et auctor consectetur. Aenean elementum lectus sed bibendum semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean posuere dui nulla, quis efficitur turpis semper at. Morbi scelerisque ligula nibh, sed commodo arcu vehicula at. Vestibulum odio nunc, interdum quis ornare sit amet, ornare non orci. Nulla in ante nisi. Mauris a tincidunt neque, elementum elementum neque.</p> <p></p> <p></p> </div> <table id="pageheadertable" style="width: 100%;height: 48px;border: 0px solid red;"> <colgroup> <col width="50px"> <col width=""> <col width="49px"> </colgroup> <tbody> <tr> <td style="text-align: left;border-right: 5px double black;color:#aaaaaa">Left</td> <td style="text-align:center;color:#aaaaaa">Center</td> <td style="text-align: right;text-indent: 48px;color:#aaaaaa">Right</td> </tr> </tbody> </table> </div> <div class="panel" style="width: 816px;height:1056px;border: 1px solid black;padding:48px"> <table id="pageheadertable" style="width: 100%;height: 48px;border: 0px solid red;"> <colgroup> <col width="50px"> <col width=""> <col width="49px"> </colgroup> <tbody> <tr> <td style="text-align: left;border-right: 5px double black;color:#aaaaaa">Left</td> <td style="text-align:center;color:#aaaaaa">Center</td> <td style="text-align: right;text-indent: 48px;color:#aaaaaa">Right</td> </tr> </tbody> </table> <div style="border: 0px solid blue;width:15px;margin-left:30px;height:864px;"> <table height="100%"> <tr><td>&nbsp&nbsp1</td></tr> <tr><td>&nbsp&nbsp2</td></tr> <tr><td>&nbsp&nbsp3</td></tr> <tr><td>&nbsp&nbsp4</td></tr> <tr><td>&nbsp&nbsp5</td></tr> <tr><td>&nbsp&nbsp6</td></tr> <tr><td>&nbsp&nbsp7</td></tr> <tr><td>&nbsp&nbsp8</td></tr> <tr><td>&nbsp&nbsp9</td></tr> <tr><td>10</td></tr> <tr><td>11</td></tr> <tr><td>12</td></tr> <tr><td>13</td></tr> <tr><td>14</td></tr> <tr><td>15</td></tr> <tr><td>16</td></tr> <tr><td>17</td></tr> <tr><td>18</td></tr> <tr><td>19</td></tr> <tr><td>20</td></tr> <tr><td>21</td></tr> <tr><td>22</td></tr> <tr><td>23</td></tr> <tr><td>24</td></tr> <tr><td>25</td></tr> <tr><td>26</td></tr> <tr><td>27</td></tr> <tr><td>28</td></tr> </table> </div> <div style="width: 624px;height: 864px;border: 1px solid #DDDDDD;border-left: 5px double black;margin: -864px 48px 0px 48px;overflow:hidden;"> <p style="text-indent: 50px;margin-top:0px;line-height: 2.15">Integer eu leo sed mauris vestibulum vulputate. Nam augue enim, finibus a mauris eget, semper maximus justo. Duis sed ligula pulvinar nisi elementum elementum. Proin pulvinar pellentesque erat, eget bibendum massa. Integer cursus eu lorem et egestas. Ut pulvinar sapien nibh, vitae facilisis metus accumsan non. Curabitur condimentum bibendum scelerisque. Vestibulum gravida ornare vulputate. Duis vehicula mauris eros, vel viverra diam imperdiet eget. Nulla iaculis rhoncus velit, sed tincidunt lacus rhoncus non.</p> <p style="text-indent: 50px;margin-top:0px;line-height: 2.15">Maecenas pulvinar lorem sed ipsum ornare viverra. Cras quis lorem vitae velit pulvinar suscipit. Fusce gravida venenatis purus, et faucibus magna tristique in. Nulla non diam nibh. Maecenas fringilla a mauris non dictum. Vivamus sed erat sit amet nibh lacinia ullamcorper. Quisque in pretium quam. Sed vehicula sapien nec tortor consectetur, sed gravida velit feugiat.</p> <p></p> <p></p> </div> <table id="pageheadertable" style="width: 100%;height: 48px;border: 0px solid red;"> <colgroup> <col width="50px"> <col width=""> <col width="49px"> </colgroup> <tbody> <tr> <td style="text-align: left;border-right: 5px double black;color:#aaaaaa">Left</td> <td style="text-align:center;color:#aaaaaa">Center</td> <td style="text-align: right;text-indent: 48px;color:#aaaaaa">Right</td> </tr> </tbody> </table> </div>')},

     {title: "Response to Office Action",
    image:"template2.gif",
    description: "Template for a response to an office action.",
    html:$sce.trustAsHtml('<div style="padding: 100px;width: 850px;height: 1100px;position: relative;overflow: scroll;font-size: 12px;background-color: white;"> <div style="font-size: 0.5em;float: right;margin: -50px;"> <h6 style="text-align:right">Attorney Docket [Number]</h6> </div> <div> <h4 style="text-align:center;"><strong>IN THE UNITED STATES PATENT &amp; TRADEMARK OFFICE</strong></h4> <table border="0" cellpadding="1" cellspacing="1" width="100%" style="margin-top: 25px;"> <colgroup> <col width="25%"> <col width="25%"> <col width="25%"> <col width="25%"> </colgroup> <tbody> <tr> <td style="padding-bottom: 25px;">Applicants:</td> <td style="padding-bottom: 25px;"><small style="background-color: rgba(100,100,100,0.05);font-size: 9px;">[[LAST, ET AL.]]</small></td> <td style="padding-bottom: 25px;">Confirmation No.:</td> <td style="padding-bottom: 25px;"><small style="background-color: rgba(100,100,100,0.05);font-size: 9px;">[[0000]]</small></td> </tr> <tr> <td style="padding-bottom: 25px;">Application No.:</td> <td style="padding-bottom: 25px;"><small style="background-color: rgba(100,100,100,0.05);font-size: 9px;">[[00/000,000]]</small></td> <td style="padding-bottom: 25px;">Art Unit:</td> <td style="padding-bottom: 25px;"><small style="background-color: rgba(100,100,100,0.05);font-size: 9px;">[[0000]]</small></td> </tr> <tr> <td style="padding-bottom: 25px;">Filed</td> <td style="padding-bottom: 25px;"><small style="background-color: rgba(100,100,100,0.05);font-size: 9px;">[[DATE]]</small></td> <td style="padding-bottom: 25px;">Examiner:</td> <td style="padding-bottom: 25px;"><small style="background-color: rgba(100,100,100,0.05);font-size: 9px;">[[LAST, FIRST]]</small></td> </tr> <tr> <td style="padding-bottom: 25px;">Title:</td> <td style="padding-bottom: 25px;" colspan="3"><small style="background-color: rgba(100,100,100,0.05);font-size: 9px;">[[SUBJECT]]</small></td> </tr> </tbody> </table> <div style="text-indent: 50px;"> <address> <p style="text-indent: 0px;line-height: 5px;"><span style="line-height:1">Honorable Commissioner of Patents &amp; Trademarks</span></p> <p style="text-indent: 0px;line-height: 5px;"><span style="line-height:1">P.O. Box 1450 </span></p> <p style="text-indent: 0px;line-height: 5px;"><span style="line-height:1">Alexandria, VA 22313-1450</span></p> </address> <h5 style="text-align:center"><u><strong>AMENDMENT AND RESPONSE TO OFFICE ACTION</strong></u></h5> <p>&nbsp</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis, nunc ut pulvinar congue, diam odio luctus tellus, sed aliquet quam elit in velit. Etiam vel eros eu dui mollis bibendum quis vel erat. Aenean blandit efficitur odio quis rhoncus. In vitae ex lacus. Cras non consectetur est. Praesent a ipsum non nisi auctor mattis ut molestie mi. Donec interdum tellus eros, et euismod justo venenatis non. Praesent consequat nisl turpis, eu convallis enim fringilla vitae. Donec in dui posuere, imperdiet arcu ullamcorper, sagittis velit. Pellentesque lobortis sed enim eu elementum. Donec sodales mauris enim. Vestibulum bibendum maximus arcu, vitae rutrum nisl accumsan ac.</p> </div> </div> </div> ')}]; 
    $scope.config = config;
    $scope.editors = editors;
    $scope.templates = templates;
  }])
  .controller('CKEWidgetCtrl', ["$scope", "config", "ckdefault", "ckmin", "Collection", "$controller", "$rootScope","ckclip","ckreport","$ACTIVEROAR","$stateParams","$sce","$compile",
        function($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, ckclip, ckreport, $ACTIVEROAR, $stateParams, $sce, $compile) {
            $scope.size = 'lg';

            $scope.ckclip = ckclip;
            $scope.ckreport = ckreport;
            $scope.config = config;
            $scope.ckdefault = ckdefault;
            $scope.ckmin = ckmin;
            var pj = {
              editable: editable()
            };
            
            if (angular.isString(config.editor)) {
              if (config.editor === 'ckdefault') {
                config.editor = ckdefault;
              }
              else if (config.editor === 'ckmin') {
                config.editor = ckmin;
              }
              else if (config.editor === 'ckreport') {
                config.editor = ckreport;
              }
              else if (config.editor === 'ckclip') {
                config.editor = ckclip;
              }
            }
            else{
                config.editor = ckdefault;
            }
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
            
            $scope.showeditor = false;
            $scope.$on('adfToggleEditMode', function($event, $data){
                $scope.showeditor = !$scope.showeditor;
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
            
            $scope.loaddraft = function(draftId) {
                var draft = Collection(draftId);
                draft.$bindTo($scope, 'draft');
            };

            draft.$loaded().then(function(d){
                var head = "<!DOCTYPE html><html class='html'><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css'><link rel='stylesheet' href='//lexlab.io/llp_core/dist/app.full.min.css'><script src='https://code.jquery.com/jquery-2.2.0.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js'></script><base href='/' target='_blank'/></head><body class='html' style='padding:10px 5px;'><div class='card card-fancy'>";
                $scope.sourcedoc = $sce.trustAsHtml(head + d.content);
            });
            
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
   ]);
