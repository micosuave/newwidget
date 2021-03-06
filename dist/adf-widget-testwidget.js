(function(window, undefined) {'use strict';


angular.module('adf.widget.testwidget', ['adf.provider',  'firebase', 'ui.tree', 'ngDialog'])
  .config(["dashboardProvider", function (dashboardProvider) {
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
      .widget('tocwidget', {
        title: '-Table of Contents',
        titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
        description: 'Prototype LLP Platform App',
        // collapsed:true,
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
          config: ['config', '$firebaseArray', '$rootScope', 'FIREBASE_URL','$stateParams',
            function (config, $firebaseArray, $rootScope, FIREBASE_URL,$stateParams) {
              if (config.id) {
                return config;
              } else {
                var params = $stateParams;
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
      templateUrl: '{widgetsPath}/testwidget/src/ckeditor.html',
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
        config: ['config', 'Collections', '$rootScope', 'FIREBASE_URL', 'ckdefault',
          function (config, Collections, $rootScope, FIREBASE_URL, ckdefault) {
            if (config.id) {
              return config
            } else {
              var a = Collections()
              var b = {}
              a.$add({
                'name': 'draft'

              }).then(function (ref) {
                var id = ref.key()
                ref.update({
                  id: id,
                  // projectid: $rootScope.$stateParams.pId || 'projectid',
                  // matterId: $rootScope.$stateParams.matterId || 'matterId',
                  // groupId: $rootScope.$stateParams.groupId || 'groupId',
                  // author: $rootScope.authData.uid || 'userid',
                  ispublished: false,
                  content_type: 'document',
                  templateUrl: '{widgetsPath}/getphd/src/view.html',
                  timestamp: Firebase.ServerValue.TIMESTAMP
                });
                config.id = id;
                config.framename = 'fframe';
                config.height = '90vh';
                // config.editor = ckdefault

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
      templateUrl: '{widgetsPath}/testwidget/src/ckeditor.html',
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
        config: ['config', 'Collections', '$rootScope', 'FIREBASE_URL', 'ckdefault',
          function (config, Collections, $rootScope, FIREBASE_URL, ckdefault) {
            if (config.id) {
              return config
            } else {
              var a = Collections()
              var b = {}
              a.$add({
                'name': 'draft'

              }).then(function (ref) {
                var id = ref.key()
                ref.update({
                  id: id,
                  // projectid: $rootScope.$stateParams.pId || 'projectid',
                  // matterId: $rootScope.$stateParams.matterId || 'matterId',
                  // groupId: $rootScope.$stateParams.groupId || 'groupId',
                  // author: $rootScope.authData.uid || 'userid',
                  ispublished: false,
                  content_type: 'document',
                  templateUrl: '{widgetsPath}/getphd/src/view.html',
                  timestamp: Firebase.ServerValue.TIMESTAMP
                })
                config.id = id
                config.framename = 'fframe'
                config.height = '90vh'
                // config.editor = ckdefault

                return config
              })
              return config
            }
          }
        ]
      }
    })
      /* .widget('embed', {
      //     title: '+EmbedViewer',
      //     titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
      //     description: 'embed arbitrary content from remote sites',
      //     template: '<div ng-bind-html="configs[0]"></div>',
      //     controller: ['$sce', 'config', '$scope', '$compile', function($sce, config, $scope, $compile) {
      //         $scope.configs = $compile($sce.trustAsHtml(config.content))($scope)
      //     }],
      //     styleClass: 'panel panel-default',
      //     frameless: false,
      //     reload: true,
      //     edit: {
      //         template: '<div class="card"><label for="content">Enter embed code</label><textarea name="content" class="form-control" ng-model="config.content"></textarea></div>',
      //         immediate: true,
      //         reload: true
      //     }
      // })*/
      .widget('embed-less', {
        title: 'Embed',
        titleTemplateUrl: '{widgetsPath}/testwidget/src/title.html',
        description: 'embed arbitrary content from remote sites',
        template: '<div ng-bind-html="configs[0]"></div>',
        controller: ['$sce', 'config', '$scope', '$compile', function ($sce, config, $scope, $compile) {
          $scope.configs = $compile($sce.trustAsHtml(config.content))($scope)
        }],
        // collapsed: true,
        styleClass: 'card card-block',
        frameless: false,
        reload: true,
        edit: {
          template: '<div class="card"><label for="content">Enter embed code</label><textarea name="content" class="form-control" ng-model="config.content"></textarea></div>',
          immediate: true,
          reload: true
        }
      })
  }])
  .controller('PDFController', ['$scope', 'pdfDelegate', 'config', 'Collection', function ($scope, pdfDelegate, config, Collection) {
    var pdf = this
    pdf.config = config
    if (config.url) {
      $scope.pdfUrl = config.url
    } else if (config.id) {
      Collection(config.id).$loaded().then(function (thing) {
        pdf.item = thing
      })
    }
  // pdfDelegate.$getByHandle('my-pdf-container').zoomIn()
  }])
  .controller('PhdTocWidgetCtrl', ['$scope', 'config', 'ckdefault', 'ckmin', 'Collection', '$controller', '$rootScope', '$ACTIVEROAR', 'Collections', '$q', '$state', 'ckstarter', 'ckender', 'GadgetFactory',
    function ($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, $ACTIVEROAR, Collections, $q, $state, ckstarter, ckender, GadgetFactory) {
      $scope.size = 'lg'

      // if (!config.draftid) {
      //     config.draftid = ''
      // } else {
      //     var draft = PROJECTDRAFT(config.draftid)
      //     $scope.draft = draft
      // }
      var ckstarter = ckstarter
      var ckender = ckender
      var toc = this
      $scope.config = config
      $scope.ckdefault = ckdefault
      $scope.ckmin = ckmin
      if ($state.includes('roartheatre')) {
        $scope.parentstate = 'theatretoptab'
        config.editable = false
        $('#dragbutton').hide()
      } else {
        $scope.parentstate = 'toptab'
      }
      toc.broadcast = function (data) {
        $rootScope.$broadcast('TABLEOFCONTENTS', data)
      }
      toc.returnroot = function () {
        $rootScope.$broadcast('RETURNROOT', config.id)
      }
      // var pj = {
      //   editable: editable()
      // }
      toc.canedit = function () {
        if ($rootScope.$state.includes('projectdashboard')) {
          return true
        }
        if ($rootScope.$state.includes('roartheatre')) {
          return false
        }
      }
      toc.editable = false
      $scope.$on('adfToggleEditMode', function () {
        toc.editable = !toc.editable
      })
      // $scope.pj = pj

      toc.tree = Collection(config.id)
      toc.tree.$bindTo($scope, 'tree')
      $scope.revealclipboard = function (locationid) {
        $rootScope.$broadcast('OPENCLIPBOARD', locationid)
        alertify.log('OPEN CLIPBOARD')
      }

      $scope.loaddraft = function (draftId) {
        var draft = Collection(draftId)
        draft.$bindTo($scope, 'tree')
      }

      var DasH = function (draftid, rootid) {
        var dashref = Collection(draftid).$ref()
        var dash = {
          titleTemplateUrl: '/llp_core/modules/lionlawlabs/partial/projectdashboard/tabs/memo/title.html',
          structure: '4-8',
          styleClass: 'PTO',
          // renderClass: 'llp-memo-draft-basic',
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
              widgets: [{
                type: 'tocwidget',
                title: 'Table of Contents',
                config: {
                  id: rootid
                }
              }]
            }, {
              styleClass: 'col-md-8',
              widgets: [{
                type: 'ckwidget',
                title: '',
                config: {
                  id: draftid,
                  editor: 'ckdefault'
                }
              }]
            }]
          }]
        }
        dashref.update(dash)
        return dashref.key()
      }

      var Section = function () {
        var section = this
        section.title = 'Section Title'
        section.content = ckstarter + '<div class="card card-block" style="padding: 10px 20px;"><p>Section content</p></div>' + ckender
        section.isnotRoot = true
        return section
      }
      toc.newtopsection = function () {
        var modelref = Collection($scope.tree.id).$ref()

        Collections().$add(new Section()).then(function (ref) {
          var id = ref.key()
          DasH(id, config.id)
          ref.update({
            id: id
          })
          modelref.child('roarlist').child(id).set(id)
          $rootScope.$broadcast('BUILDTABS')
          // Collection(id).$loaded().then(function (sect) {

        //   if (angular.isUndefined($scope.tree.roarlist)) {
        //     var sections = []
        //     angular.extend($scope.tree, {
        //       roarlist: sections
        //     })
        //     $scope.tree.roarlist.push(sect)
        //     $rootScope.$broadcast('BUILDTABS')
        //   } else {
        //     $scope.tree.roarlist.push(sect)
        //     $rootScope.$broadcast('BUILDTABS')
        //   }
        // })
        })
      }
      toc.newsubsection = function (section) {
        if (angular.isUndefined(section.$nodeScope.$modelValue)) {
          var model = section.$nodeScope.node
        } else {
          var model = section.$nodeScope.$modelValue
        }
        var modelref = Collection(model.$id).$ref()
        Collections().$add(new Section()).then(function (ref) {
          var id = ref.key()
          DasH(id, config.id)
          ref.update({
            id: id
          })
          modelref.child('roarlist').child(id).set(id)
          $rootScope.$broadcast('BUILDTABS')
        //   Collection(id).$loaded().then(function (sect) {
        //     if (angular.isUndefined(model.roarlist)) {
        //       var sections = []
        //       model.roarlist = sections
        //       model.roarlist.push(sect)
        //       $rootScope.$broadcast('BUILDTABS')
        //     } else {
        //       model.roarlist.push(sect)
        //       $rootScope.$broadcast('BUILDTABS')
        //     }
        //   })
        })
      }
      toc.opensubsection = function (node) {
        // window.alert(scope)
        alertify.log('TOC OUT')
        $rootScope.$broadcast('TABLEOFCONTENTS', node.id || node)
      // debugger
      // toc.broadcast(node.id)
      // debugger
      }
      toc.togglemode = function () {
        var walk = function (node) {
          if (node.roarlist) {
            angular.forEach(node.roarlist, function (node, key) {
              walk(node)
            })
          } else {
            alertify.log(node.content)
          }
        }
        walk($scope.tree)
        console.log(toc.builddoc())
        alertify.log(toc.builddoc())
      // var walk = function (node) {
      //   angular.forEach(node.roarlist, function (node, key) {
      //     if (node.children) {
      //       walk(node)
      //     } else {
      //       Collection(node.id).$save(node)
      //     }
      //   })
      // }
      // walk($scope.tree)
      }
      var roothead = "<!DOCTYPE html><html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css'/></head><body>"
      var roottail = '</body></html>'

      toc.builddoc = function () {
        var deferred = $q.defer()
        var doc = []
        doc.push(roothead)
        var walk = function (node, depth, siblings) {
          if (node && node.content) {
            console.log(depth, node.title)
            doc.push(node.title, node.content)
          }
          if (node && node.roarlist) {
            angular.forEach(node.roarlist, function (node, key) {
              walk(node, depth += 1, node.roarlist)
            })
          }
          if (node && !node.id) {
            Collection(node).$loaded().then(function (node) {
              walk(node, depth += 1)
            })
          }
        }
        try {
          walk($scope.tree, 0)
        } catch (ex) {
          console.log(ex)
        } finally {
          doc.push(roottail)

          deferred.resolve(doc)
        }
        return deferred.promise
      }
    }
  ]).controller('CKEditorCtrl', ['$scope', 'config', 'ckdefault', 'ckmin', 'ckclip', 'ckreport', '$sce', 'ROARCLASSES', '$stateParams', 'Collection', function ($scope, config, ckdefault, ckmin, ckclip, ckreport, $sce, ROARCLASSES, $stateParams, Collection) {
  var editors = [{
    name: 'Default',
    obj: ckdefault
  }
  //   { name: 'Minimal', obj: ckmin },
  //   { name: 'Clip', obj: ckclip },
  //   { name: 'Report', obj: ckreport },
  //   { name: 'Full', obj: null}
  ]
  var treeroot = Collection($stateParams.pId)
  $scope.tree = treeroot
  $scope.ROARCLASSES = [{
    label: 'Memo Basic',
    value: 'llp-memo-draft-basic'
  }]
  $scope.config = config
  $scope.editors = editors
}])
  .controller('CKEWidgetCtrl', ['$scope', 'config', 'ckdefault', 'ckmin', 'Collection', '$controller', '$rootScope', 'ckclip', 'ckreport', '$ACTIVEROAR', '$state', '$stateParams', '$sce', '$compile', 'ckstarter', 'ckender', 'toastr', 'Users', 'Profile', '$http', 'Upload', '$uibModal', '$window', '$location', '$interval',
    function ($scope, config, ckdefault, ckmin, Collection, $controller, $rootScope, ckclip, ckreport, $ACTIVEROAR, $state, $stateParams, $sce, $compile, ckstarter, ckender, toastr, Users, Profile, $http, Upload, $uibModal, $window, $location, $interval) {
      $scope.size = 'lg'
      var draft = Collection(config.id)
      window.CKID = config.id;
      // draft.$bindTo($scope, 'draft')
      //config.slidemode = false;
      $scope.draft = draft, $scope.b = draft;
      // draft.$loaded().then(function(drat){
      //   $scope.b = angular.copy(drat);
      // });*a2swxcv b
//      $http.get('/files/uploads/'+draft.$id+'.html').then(function(resp){$scope.draft.content = resp.data;$scope.b.content = resp.data;});
      if ($state.includes('composer')) {
        $scope.inlab = true
      }
      $scope.ckclip = ckclip
      $scope.ckreport = ckreport
      $scope.config = config
      $scope.ckdefault = ckdefault
      $scope.ckmin = ckmin
      $scope.ckstarter = ckstarter
      $scope.ckender = ckender
      $('#dragbutton').draggable({
        cursor: 'move'
      })
      $scope.poodle = {
        showeditor: false,
        slidemode: false
      };
      $scope.profile = Profile($rootScope.authData.uid)
      $scope.menu = {
        items: [{
          icon: 'fa-pencil',
          label: 'Toggle Edit Mode',
          styleClass: 'text-info',
          onClick: function (draft) {
            window.CKID = config.id;
            return config.showeditor = !config.showeditor
          }
        },
          /*{
                                  icon: 'fa-alert',
                                  label: 'Syncronize Editor',
                                  styleClass: classy(),
                                  onClick: function(draft){ return $scope.updateid();}
                              },
                              {
                                  icon: 'fa-refresh',
                                  label: 'Restore Defaults',
                                  styleClass: 'text-success',
                                  onClick: function(draft){ var content = draft.content.slice(draft.content.indexOf('<body>'),draft.content.length); return $scope.draft.content = $scope.ckstarter + content + $scope.ckender;}
                              },*/
          {
            icon: 'fa-upload',
            label: 'Upload',
            styleClass: '',
            onClick: function (draft) {
              var now = new Date().getTime()
              var blob = new Blob([draft.content.toString()])
              return Upload.upload({
                url: '/upload/',
                data: {
                  file: Upload.rename(blob, $scope.draft.$id + '.html')
                }
              })
            }
          }
        ]
      }

      function classy () {
        if (config.id !== $scope.$parent.$parent.$parent.adfModel.$id) {
          return 'warning'
        } else {
          return 'hide'
        }
      }

      $scope.openpreview = function (draft) {
        var lin = '/files/uploads/' + draft.$id + '.html';
        $window.open(lin,null,'toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,fullscreen=no');
              //  $window.htmltoload = draft.content
        //$window.open('javascript:void( (function(){' +
         // 'document.open();' +
         // 'document.write(window.opener.htmltoload);' +
        //  'document.close();' +
        //  'window.opener.htmltoload = null;' +
         // '})() )', null, 'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=700,height=700')
      };

      $scope.dowrap = function (content) {
        $scope.draft.content = ckstarter + content.slice(content.indexOf('<body'), content.indexOf('<script')) + ckender;
         var blob = new Blob([$scope.draft.content.toString()])
          //$scope.draft = b;
                  $scope.draft.lastModified = time;
                  $scope.draft.$save();

    return Upload.upload({
                method: 'POST',
                url: '/upload',
                data: {
                  file: Upload.rename(blob, $scope.draft.$id + '.html')
                }
              }).then(function(err, resp){
                if(err){console.log(err);alertify.error(err);}
                else{
                    var serverpath = resp.data;
                  console.log(serverpath);
                  alertify.success(serverpath);


                  $scope.poodle.showeditor = !$scope.poodle.showeditor;
                }
              });
    }


      var stringtest = function (input) {
        return input.startsWith(ckstarter);
      }
      $scope.doclose = function () {
        $scope.poodle.showeditor = false;
      }

      $scope.dosave = function (b) {
        var d = new Date()
        var time = d.getTime();

          var blob = new Blob([b.content.toString()]);
          $scope.draft = b;
                  $scope.draft.lastModified = time;
                  $scope.draft.$save();

    return Upload.upload({
                method: 'POST',
                url: '/upload',
                data: {
                  file: Upload.rename(blob, $scope.draft.$id + '.html')
                }
              }).then(function(err, resp){
                if(err){console.log(err);alertify.error(err);}
                else{
                    var serverpath = resp.data;
                  console.log(serverpath);
                  alertify.success(serverpath);


                  $scope.poodle.showeditor = !$scope.poodle.showeditor;
                }
              });
    };

      $scope.getAuthor = function (id) {
        return Users.all.$getRecord(id).auth.profile.name;
      }

      $scope.ckdefault = ckdefault;

      if (config.id !== $scope.$parent.$parent.$parent.adfModel.$id) {
        $(this).css({
          'border': '1px dotted red'
        });
      }
      $scope.updateid = function () {
        // config.id = $ACTIVEROAR.tabid
        $scope.$parent.$parent.config.id = $scope.$parent.$parent.$parent.adfModel.$id;
        $scope.$parent.$parent.reload();
      }
      $scope.$on('RETURNROOT', function ($event, $data) {
        $scope.$parent.$parent.config.id = $data;
        $scope.$parent.$parent.reload();
      })
      $scope.$on('TABLEOFCONTENTS', function ($event, $data) {
        alertify.log('TOC REC');
        alertify.log($data);

        $scope.$parent.$parent.config.id = $data;
        $scope.$parent.$parent.reload();
        $scope.loaddraft($data);
      })

      // $scope.pj = pj

    }
  ])
  .directive('tableOfContents', ['Collection', '$rootScope', function (Collection, $rootScope) {
    return {
      restrict: 'E',
      controller: 'TocWidgetCtrl',
      //controller: 'PhdTocWidgetCtrl',
      controllerAs: 'toc',
      bindToController: true,
      templateUrl: '{widgetsPath}/testwidget/src/view.html',
      scope: {

      },
      link: function ($scope, $element, $attr, $ctrl) {
        var rootid = $attr.root || $scope.roarevent.$id;
        Collection(rootid).$loaded().then(function (collection) {
          collection.$bindTo($scope, 'tree');
          $scope.tree = collection;
        })
        $scope.config = {
          id: rootid
        }
      }
    }
  }]).controller('TocWidgetCtrl', ['$scope', 'ckdefault', 'ckmin', 'Collection', '$controller', '$rootScope', '$ACTIVEROAR', 'Collections', '$q', '$state', 'ckstarter', 'ckender', 'GadgetFactory',
  function ($scope, ckdefault, ckmin, Collection, $controller, $rootScope, $ACTIVEROAR, Collections, $q, $state, ckstarter, ckender, GadgetFactory) {
    $scope.size = 'lg';

    var ckstarter = ckstarter;
    var ckender = ckender;
    var toc = this;

    $scope.ckdefault = ckdefault;
    $scope.ckmin = ckmin;

    toc.canedit = function () {
      if ($rootScope.$state.includes('projectdashboard')) {
        return true;
      }
      if ($rootScope.$state.includes('roartheatre')) {
        return false;
      }
    }
    toc.editable = false;
    $scope.$on('adfToggleEditMode', function () {
      toc.editable = !toc.editable;
    })

    // toc.tree = Collection(config.id)
    // toc.tree.$bindTo($scope, 'tree')
    $scope.revealclipboard = function (locationid) {
      $rootScope.$broadcast('OPENCLIPBOARD', locationid);
      alertify.log('OPEN CLIPBOARD');
    }

    var DasH = function (draftid, rootid) {
      var dashref = Collection(draftid).$ref()
      var dash = {
        titleTemplateUrl: '/llp_core/modules/lionlawlabs/partial/projectdashboard/tabs/memo/title.html',
        structure: '4-8',
        styleClass: 'PTO',
        // renderClass: 'llp-memo-draft-basic',
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
            widgets: [{
              type: 'tocwidget',
              title: 'Table of Contents',
              config: {
                id: rootid
              }
            }]
          }, {
            styleClass: 'col-md-8',
            widgets: [{
              type: 'ckwidget',
              title: '',
              config: {
                id: draftid,
                editor: 'ckdefault'
              }
            }]
          }]
        }]
      }
      dashref.update(dash)
      return dashref.key()
    }

    var Section = function () {
      var section = this
      section.title = 'Section Title'
      section.content = ckstarter + '<div class="card card-block" style="padding: 10px 20px;"><p>Section content</p></div>' + ckender
      section.isnotRoot = true
      return section
    }
    toc.newtopsection = function () {
      var modelref = Collection($scope.tree.id).$ref()

      Collections().$add(new Section()).then(function (ref) {
        var id = ref.key()
        DasH(id, config.id)
        ref.update({
          id: id
        })
        modelref.child('roarlist').child(id).set(id)
        $rootScope.$broadcast('BUILDTABS')
      })
    }
    toc.newsubsection = function (section) {
      if (angular.isUndefined(section.$nodeScope.$modelValue)) {
        var model = section.$nodeScope.node
      } else {
        var model = section.$nodeScope.$modelValue
      }
      var modelref = Collection(model.$id).$ref()
      Collections().$add(new Section()).then(function (ref) {
        var id = ref.key()
        DasH(id, config.id)
        ref.update({
          id: id
        })
        modelref.child('roarlist').child(id).set(id)
        $rootScope.$broadcast('BUILDTABS')
      })
    }
  }
])
'use strict'
angular.module('adf.widget.frame', ['adf.provider'])
  .config(['dashboardProvider', function (dashboardProvider) {
    dashboardProvider
      .widget('iframe', {
        title: '+LexFrame',
        description: 'Embed an external page into the dashboard',
        templateUrl: '{widgetsPath}/iframe/src/view.html',
        // collapsed: true,
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
          height: '60vh',
          framename: 'fframe'

        }
      }).widget('iframe-less', {
      title: '-LexFrameViewer',
      description: 'Embed an external page into the dashboard',
      templateUrl: '{widgetsPath}/iframe/src/view.html',
      // collapsed: true,
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
        height: '60vh',
        framename: 'fframe'
      }
    })
  }])
  .controller('iframeController', ['$sce', 'config', 'ckdefault', '$scope', '$rootScope', function ($sce, config, ckdefault, $scope, $rootScope) {
    if (config.url) {
      this.url = $sce.trustAsResourceUrl(config.url)
    }
    if (config.iframe === true) {
      this.srcdoc = $sce.trustAsHtml(config.srcdoc)
    }

    $scope.destroy = function () {
      $rootScope.$broadcast('adfToggleEditMode')
    }
    // var loc = $('this').children().children('iframe').get(0).contentWindow.location
    $scope.ckdefault = ckdefault
  }])

angular.module('adf.widget.frame').run(['$templateCache', function ($templateCache) {
  $templateCache.put('{widgetsPath}/iframe/src/edit.html', '<form role=form><div class=form-group><label for=url>URL</label> <input type=url class=form-control id=url ng-model=config.url placeholder=http://www.example.com></div><div class=form-group><label for=height>Height</label> <input type=text class=form-control id=height ng-model=config.height></div><div class=form-group><label for=name>Frame name (for url targets)</label> <input type=text class=form-control id=name ng-model=config.framename></div><div class=form-group><label for=name>Use srcdoc instead of url?</label> <input type=checkbox class=form-control id=name ng-model=config.iframe ng-change=destroy()></div><textarea ng-if="config.iframe"ckeditor=ckdefault ng-model=config.srcdoc  ng-model-options="{updateOn: \'default blur\', debounce: {\'default\': 20000, \'blur\': 0}}" ng-change=\'destroy()\'></div></form>')
  $templateCache.put('{widgetsPath}/iframe/src/view.html', '<div><iframe class="adf-iframe" style="height: {{config.height}};width:100%;" ng-attr-srcdoc={{iframe.srcdoc}} ng-src={{iframe.url}} seamless allowfullscreen name="fframe"></iframe></div>')
}])

angular.module("adf.widget.testwidget").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/testwidget/src/ckeditor.html","<div class=card style=\"margin:0;padding: 0;height:80vh;\"><div class=\"row toolbar fade\" id=toolbartop ng-class=\"{\'in\':poodle.showeditor}\"></div><form name=editorform ng-if=poodle.showeditor ng-submit=dosave(b);><textarea ckeditor=ckdefault class=\"card card-block\" id=editorta name=editorta ng-change ng-if=!poodle.slidemode ng-model=b.content ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 500, \'blur\': 0} }\" style=width:100%;font-size:12px;color:#444;></textarea> <textarea ckeditor=ckdefault class=\"card card-block\" id=editora name=editora ng-change ng-if=poodle.slidemode ng-model=b.slide ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 500, \'blur\': 0} }\" style=width:100%;font-size:12px;color:#444;></textarea><div class=btn-group style=position:absolute;top:25px;right:5px;><input class=\"button btn fa\" ng-class=\"{\'text-success\':editorform.editorta.$dirty}\" style=\"border-radius:0;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1);border:1px solid white;\" type=submit value=SAVE> <button class=\"button btn btn-default fa fa-lg fa-refresh\" ng-class=\"{\'text-warning\':editorform.editorta.$dirty}\" ng-click=dowrap(b.content) style=\"border-radius:0;padding: 5px 5px; box-shadow: 1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1); border: 1px solid white;\"></button> <button class=\"button btn btn-default fa fa-lg fa-close\" ng-class=\"{\'text-danger\':editorform.editorta.$dirty}\" ng-click=doclose() style=\"border-radius:0;padding: 5px 5px; box-shadow: 1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1); border: 1px solid white;\"></button></div></form><iframe allowfullscreen=allowfullscreen class=\"card card-block\" id=\"{{b.$id || b.id}}\" name=draftrenderer ng-attr-srcdoc=\"{{draft.content | trustAsHTML}}\" ng-if=\"!poodle.showeditor && !config.versionhistory && !poodle.slidemode\" seamless style=width:100%;height:80vh;></iframe><iframe allowfullscreen=allowfullscreen class=\"card card-block\" id=draftdocument name=fframe ng-attr-srcdoc=\"{{draft.slide | trustAsHTML}}\" ng-if=\"!poodle.showeditor && !config.versionhistory && poodle.slidemode\" seamless style=width:100%;height:80vh;></iframe><button class=\"dragbutton pull-right btn btn-default btn-sm fa\" id=dragbutton ng-class=\"{\'fa-edit text-info\':!poodle.showeditor,\'fa-save text-success\':poodle.showeditor, \'btn-danger\':!(editorform.editorta.$modelValue == editorform.editorta.$viewValue)}\" ng-click=\"poodle.showeditor = !poodle.showeditor;\" ng-if=\"inlab && !poodle.showeditor\" style=\"width:25px;height:25px;border-radius:0;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1);border:1px groove white;position:absolute;top:25px;right:0;\"></button> <button class=\"dragbutton pull-right btn btn-default btn-sm fa\" id=drabutton ng-class=\"{\'fa-search text-info\':!poodle.showeditor,\'fa-search text-success\':poodle.showeditor, \'btn-danger\':!(editorform.editorta.$modelValue == editorform.editorta.$viewValue)}\" ng-click=openpreview(draft) style=\"width:25px;height:25px;border-radius:0;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1);border:1px groove white;position:absolute;top:0;right:0;\"></button><footer class=\"navbar navbar-static-bottom navbar-inverse\"><div class=container><p class=navbar-text>Mode: <span ng-show=poodle.slidemode>slide</span> <span ng-show=!poodle.slidemode>draft</span> <strong editable-text=config.filename>{{config.filename}}</strong></p><button class=\"navbar-btn navbar-right btn btn-default btn-sm fa\" id=dragbutton ng-class=\"{\'fa-edit text-info\':!poodle.showeditor,\'fa-save text-success\':poodle.showeditor, \'btn-danger\':!(editorform.editorta.$modelValue == editorform.editorta.$viewValue)}\" ng-click=\"poodle.showeditor = !poodle.showeditor;\" ng-if=\"inlab && !poodle.showeditor\" style=\"width:2vw;height:2vw;border-radius:0;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1);border:1px groove white;\"></button> <button class=\"navbar-btn navbar-right btn btn-default btn-sm fa\" id=drabutton ng-class=\"{\'fa-search text-info\':!poodle.showeditor,\'fa-search text-success\':poodle.showeditor, \'btn-danger\':!(editorform.editorta.$modelValue == editorform.editorta.$viewValue)}\" ng-click=openpreview(draft) style=\"width:20px;height:20px;border-radius:0;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.5), inset 0 0 2px rgba(0,0,0,0.1);border:1px groove white;;\"></button></div></footer></div>");
$templateCache.put("{widgetsPath}/testwidget/src/dashedit.html","<div class=\"card-fancy card-rounded card-thick\"><div class=card-header><button type=button class=close ng-click=closeDialog() aria-hidden=true>&times;</button><h4 class=modal-title>Edit Page</h4></div><div class=\"card card-block\"><form role=form><div class=form-group><label for=dtitle>Title</label> <input type=text ng-model=config.title placeholder=Title></div><div class=form-group><label>Structure</label><div class=card-columns><div class=\"radio card {{key}}\" ng-repeat=\"(key, structure) in structures\"><label><input type=radio value={{key}} ng-model=model.structure ng-change=\"changeStructure(key, structure)\"> {{key}}</label></div></div></div><div class=row><div class=\"form-group row\"><label>Collapsible?</label> <input type=checkbox ng-model=dashboard.collapsible></div><div class=\"form-group row\"><label>Maxizable?</label> <input type=checkbox ng-model=dashboard.maximizable></div><div class=\"form-group row\"><label>Protected?</label> <input type=checkbox ng-model=dashboard.enableConfirmDelete></div></div><select ng-model=dashboard.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\" class=form-control placeholder=\"Select Style...\"></select></form><adf-dashboard name={{dashboard.title}} structure={{dashboard.structure}} collapsible={{dashboard.collapsible}} maximizable={{dashboard.maximizable}} enable-confirm-delete={{dashboard.enableConfirmDelete}} class={{dashboard.styleClass}} frameless={{dashboard.frameless}} continuous-edit-mode=false adf-model=dashboard.model></adf-dashboard></div><div class=card-footer><button type=button class=\"btn btn-primary card-link\" ng-click=closeDialog()>Close</button></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/diff.html","<div class=col-sm-6><pre>\n       \n       {{draft.content | json:4 | diff:editorform.editorta.$modelValue}}\n       \n   </pre></div><div class=col-sm-6><div ng-bind-html=\"draft.content | diff: editorform.editorta.$modelValue\"></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/document.html","<div class=card><section ng-repeat=\"(key, node) in node.roarlist\" node=\"{{node.id || node}}\"><label>{{node.title}}</label><ng-annotate-text text=node.content></ng-annotate-text><div ng-include=\"\'./document.html\'\" ng-repeat=\"(key, node) in node.roarlist\"></div></section></div>");
$templateCache.put("{widgetsPath}/testwidget/src/edit.html","<form role=form><div class=form-group ui-tree><label for=draftid>Select Document</label><ol ui-tree-nodes ng-model=tree.roarlist><li ui-tree-node ng-repeat=\"node in tree.roarlist\" ng-include=\"\'quicklinkid\'\" node={{node}} data-collapsed=true></li></ol><script type=text/ng-template id=quicklinkid><div class=\"card card-rounded\" ng-class=\"{\'text-success\': (config.id === node.id)}\"> <a class=\"btn btn-xs\" ng-click=\"toggle(this)\" ng-if=\"node.roarlist\" style=\"\"><span class=\"fa \" ng-class=\"{\'fa-chevron-right\': collapsed, \'fa-chevron-down\': !collapsed}\" style=\"color:steelblue;transition:all 0.25s ease;\"></span></a> <a ng-click=\"config.id = node.id;$close();\" ng-class=\"{\'text-success\': (config.id === node.id)}\" class=\"\"><span class=\"fa fa-stack fa-pull-left fa-border\"><span class=\"fa fa-stack-2x fa-file-o\"><span class=\"fa fa-stack-1x\" style=\"font-size: 10px;vertical-align:bottom;\">{{node.rid}}</span></span></span>&nbsp;&nbsp;{{node.title}}<br><small class=\"text-muted\">{{node.date | date}}</small></a> </div> <ol ui-tree-nodes=\"\" ng-model=\"node.roarlist\" ng-class=\"{hidden: collapsed}\" style=\"\"> <li class=\"\" ng-repeat=\"(key, node) in node.roarlist\" ui-tree-node ng-include=\"\'quicklinkid\'\" style=\"padding-right:0rem;padding-bottom:0.1rem;\" node=\"{{node.id || node.$id || node.$value || node}}\" data-collapsed=\"true\"> </li> </ol></script></div></form>");
$templateCache.put("{widgetsPath}/testwidget/src/editckeditor.html","<form role=form><div class=form-group><label for=draftid>Style Configuration</label><select ng-model=config.modelfield><option ng-value=\"\'draftcontent\'\" value=\"\'draftcontent\'\" label=draft></option><option ng-value=\"\'slide\'\" value=\"\'slide\'\" label=slide></option></select><div class=\"form-group col-sm-4\"><label for=renderversionhistory>Version History</label> <input type=checkbox ng-model=config.versionhistory></div></div></form>");
$templateCache.put("{widgetsPath}/testwidget/src/editembed.html","<div class=card><button ng-click=push(newtab) class=\"btn btn-info fa fa-plus\"></button> <label for=tabname>Enter Title</label> <input type=text ng-model=newtab.title><select ng-model=newtab.styleClass ng-options=\"class.value as class.label for class in ROARCLASSES\"></select><label for=content>Enter embed code</label> <textarea name=content class=form-control ng-model=newtab.content></textarea></div><div style=\"overflow: scroll;\"><h4>Edit existing sections:</h4><div class=card ng-repeat=\"tab in config.content track by $index\"><label for=tabname>Edit Title</label> <input type=text name=tabname ng-model=tab.title> <label for=content>Edit Embed Code</label> <textarea name=content class=form-control ng-model=tab.content></textarea></div></div>");
$templateCache.put("{widgetsPath}/testwidget/src/embed.html","<div class=expand><tabset class=\"ngDialogTab tab-stacked\" vertical=true><tab ng-repeat=\"tab in tabs\"><ul class=list-group-action><li class=list-group-item>{{tab.title}} <button class=\"circle btn btn-info fa fa-chevron-right fa-2x pull-right\" ng-click=loadDashboard(tab.content)></button> <span class=show-menu><span class=\"glyphicon glyphicon-chevron-right\"></span></span><ul class=list-group-submenu><li class=\"list-group-submenu-item success\"><span class=\"glyphicon glyphicon-remove\"></span></li><li class=\"list-group-submenu-item danger\"><span class=\"glyphicon glyphicon-ok\"></span></li></ul></li></ul></tab><tab ng-repeat=\"tab in config.content\" class=\"btn {{tab.styleClass}}\"><tab-heading>{{tab.title}}</tab-heading><div ng-bind-html=tab.content></div></tab></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/pdfview.html","<div ng-pdf=pdf.url ng-pdf-zoom=1 ng-pdf-template=\"\'/llp_core/bower_components/angular-pdf-directive/build/partials/pdf.html\'\"></div><pdf-viewer delegate-handle=pdf url=pdf.url scale=1 show-toolbar=true headers=\"{ \'Access-Control-Allow-Origin\': \'*\' }\"></pdf-viewer>");
$templateCache.put("{widgetsPath}/testwidget/src/sidebar.html","<div class={{config.styleClass}} ng-controller=\"EmbedCtrl as em\"><tabset class=\"{{config.styleClass || \'alert alert-danger\'}}\"></tabset></div>");
$templateCache.put("{widgetsPath}/testwidget/src/title.html","<h5 class=card-title><a title=\"change widget location\" class=adf-move ng-if=editMode><i class=\"fa fa-move img-shadow hovergold\"></i></a> {{config.title || definition.title}} <a title=\"collapse widget\" ng-show=\"options.collapsible && !widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"fa fa-minus img-shadow hovergold\"></i></a> <a title=\"expand widget\" ng-show=\"options.collapsible && widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"fa fa-plus img-shadow hovergold\"></i></a> <span class=pull-right><a title=\"reload widget content\" ng-if=widget.reload ng-click=reload()><i class=\"fa fa-refresh img-shadow hovergold\"></i></a> <a title=\"edit widget configuration\" ng-click=edit() ng-if=editMode><i class=\"fa fa-cog img-shadow hovergold\"></i></a> <a title=\"fullscreen widget\" ng-click=openFullScreen() ng-show=options.maximizable><i class=\"fa fa-fullscreen img-shadow hovergold\"></i></a> <a title=\"remove widget\" ng-click=remove() ng-if=editMode><i class=\"fa fa-remove img-shadow hovergold\"></i></a></span></h5>");
$templateCache.put("{widgetsPath}/testwidget/src/view.html","<div class=card-header><button id=dragbutton draggable ng-click=\"config.editable = !config.editable\" class=\"dragbutton pull-left btn btn-default btn-sm fa fa-2x\" ng-class=\"{\'fa-edit text-info\':!config.editable,\'fa-save text-success\':config.editable}\" style=\"position:absolute;top:0;right:0;border-radius:0;padding: 5px 5px;box-shadow:1px 1px 5px rgba(0,0,0,0.25), inset 0 0 20px rgba(0,0,0,0.1);border:1px solid white;\"></button><h4 class=card-title><span e-form=nameform editable-text=tree.contentlistname buttons=no onaftersave=tree.$save();><span ng-click=toc.opensubsection(tree) ng-if=tree.roarlist>{{tree.contentlistname || \'Contents\'}}</span> <span class=\"fa fa-edit showonhover\" ng-click=nameform.$show()></span> <small class=pull-right><a class=\"fa fa-plus text-warning\" ng-if=config.editable ng-click=toc.newtopsection()></a></small></span></h4></div><div ng-if=tree.roarlist><div ui-tree=treeOptions style=cursor:pointer!important;><ol ui-tree-nodes max-depth=6 ng-model=tree.roarlist><li ui-tree-node class=card ng-repeat=\"(key,node) in tree.roarlist\" ng-include=\"\'nodes_renderer1.html\'\" style=padding-right:0rem;padding-bottom:0.1rem; node=\"{{node.id || node}}\" data-collapsed=true></li></ol></div></div><script type=text/ng-template id=nodes_renderer1.html><div class=\"tree-node tree-node-content\"> <div class=\"tree-node-content flex-row \" style=\"position:relative;\"> <!-- <a class=\"btn btn-xs\" ng-click=\"revealclipboard(node.$id)\"><span class=\"fa fa-paste showonhover\"></span></a> --> <a class=\"btn btn-xs\" ng-click=\"toggle(this)\" style=\"flex-grow:1;flex-shrink:0;\"><span class=\"fa \" ng-class=\"{\'fa-chevron-right\': (node.roarlist && collapsed), \'fa-chevron-down\': (node.roarlist && !collapsed) , \'disabled\': !node.roarlist}\" style=\"transition:all 0.25s ease;\"></span></a> <label class=\"ui-tree-handle label label-pill badge label-{{node.styleClass}} fa-stack fa-lg\" style=\"flex-grow:1;flex-shrink:0;margin:auto;\"> <i class=\"fa fa-stack-1x {{node.icon}}\"></i> <i class=\"fa fa-stack-1x text-{{node.styleClass}}\">{{node.rid || \'-\'}}</i> </label> <input type=\"text\" ng-model=\"node.title\" ng-change=\"node.$save();\" ng-model-options=\"{ updateOn: \'default blur\', debounce: {\'default\': 1000, \'blur\':c.note.title }\" style=\"padding: 0.5rem;color:#444;width:auto;min-width:300px;\" ng-if=\"config.editable\"> <a class=\"btn\" ng-if=\"config.editable\" ng-click=\"remove(this);collection.$save();\"><span class=\"fa fa-close text-danger \"></span></a> <!--<a class=\"btn \" ng-if=\"config.editable\" ng-click=\"toc.newsubsection(this)\" style=\"\"><span class=\"fa fa-plus text-success\"></span></a>--> <a class=\"gototarget btn flextoprow\" ng-if=\"!config.editable\" ui-sref=\"toptab.righttab({pageid: node.$id, tabid: node.$id})\" style=\"flex-grow:1;flex-shrink: 1;\"><span ng-if=\"!config.editable\" class=\"\" style=\"word-wrap:break-word;\">{{node.title}}</span></a> <dropdownmenu target=\"{{node.$id}}\" type=\"insert\" icon=\"fa-plus text-success fa-2x\" ng-if=\"config.editable\" style=\"margin:5px;\"></dropdownmenu> <dropdownmenu target=\"{{node.$id}}\" type=\"action\" icon=\"fa-ellipsis-v text-warning fa-2x\" style=\"margin:5px;\"></dropdownmenu> </div> </div> <ol ui-tree-nodes=\"\" ng-model=\"node.roarlist\" ng-class=\"{hidden: collapsed}\" ng-if=\"!collapsed\" style=\"\"> <li class=\"\" ng-repeat=\"(key, node) in node.roarlist\" ui-tree-node ng-include=\"\'nodes_renderer1.html\'\" node=\"{{node.id || node.$id || node.$value || node}}\" data-collapsed=\"true\"> </li> </ol></script>");}]);})(window);