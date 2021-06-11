(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            //角色信息
            var rolename = sessionStorage.getItem("rolename");
            var username = sessionStorage.getItem("username");


            //获取字典数据
            var postStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.postStatus);
            var documentNum = dictUtil.getDictByCode(dictUtil.DICT_LIST.postDocumentNum);
            var publicWay = dictUtil.getDictByCode(dictUtil.DICT_LIST.governerscounter);
            $("#chargePersonSearch").selectUtil(publicWay);


            var addUrl = "/document/post_add";
            var aParam = {

            };

            //点击文件名查看详情事件
            function viewOperation(value, row, index){
                return [
                    '<a class="postview" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >'+row.postDocumentTitle+'</a>',
                ].join('');
            }
            window.viewEvents = {
                'click .postview': function (e, value, row, index){
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/post_view";
                    orange.redirect(viewUrl);
                },
            };

            //操作
            function operation1(value, row, index){
                if(row.postDataStatus == postStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 0.8em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >发送</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[1].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消发送</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[2].id || row.postDataStatus == postStatus[4].id || row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[10].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[3].id || row.postDataStatus == postStatus[5].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[9].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }
            }

            function operation2(value, row, index){
                if(row.postDataStatus == postStatus[1].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[2].id || row.postDataStatus == postStatus[3].id || row.postDataStatus == postStatus[4].id || row.postDataStatus == postStatus[5].id || row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[9].id || row.postDataStatus == postStatus[10].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }
            }

            function operation3(value, row, index){
                if(row.postDataStatus == postStatus[2].id){
                    if (row.postOpinion == "2"){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                            '<a class="transpond"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >转发</a>',
                        ].join('');
                    }else{
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                        ].join('');
                    }
                }else if(row.postDataStatus == postStatus[4].id || row.postDataStatus == postStatus[5].id || row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[9].id || row.postDataStatus == postStatus[10].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }
            }

            function operation4(value, row, index){
                if(row.postDataStatus == postStatus[4].id){
                    //获取意见表的内容
                    var tgAdvice;
                    $.ajax({ cache: false, async: false, type: 'get', data: {dataCode: row.itemcode}, url: "/advice/getByDataCode", success: function (data) {
                            tgAdvice = data; }
                    });
                    if (rolename === "中医处分管局长"){
                       if (!tgAdvice.data.deputyDirector){
                           return [
                               '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                           ].join('');
                       }else {
                           return [
                               '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                           ].join('');
                       }
                    }else if (rolename === "中药处分管局长"){
                        if (!tgAdvice.data.deputyDirector1){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }else {
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            ].join('');
                        }
                    }else if (rolename === "综合处分管局长"){
                        if (!tgAdvice.data.deputyDirector2){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }else {
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            ].join('');
                        }
                    }else if (rolename === "法规监督处分管局长"){
                        if (!tgAdvice.data.deputyDirector3){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }else {
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            ].join('');
                        }
                    }
                }else if(row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[9].id || row.postDataStatus == postStatus[10].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }
            }

            function operation5(value, row, index){
                if(row.postDataStatus == postStatus[6].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[9].id || row.postDataStatus == postStatus[10].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[8].id ){
                    return [
                        '<a  class="send-file"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >发送文件</a>',
                    ].join('');
                }
            }

            function operation6(value, row, index){
                if(row.postDataStatus == postStatus[10].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeletePost",
                        modalTitle : "删除发文信息",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var projectEntity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };
                            var adviceEntity = {
                                dataCode: row.itemcode
                            };
                            var masterSendEntity = {
                                dateCode: row.itemcode,
                                receiverType: 0
                            };
                            var copySendEntity = {
                                dateCode: row.itemcode,
                                receiverType: 1
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/post/delPost",projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/advice/delAdvice",adviceEntity,function (data) {
                                        if (ajaxUtil.success(data)){
                                            ajaxUtil.myAjax(null,"/postref/delPostRef",masterSendEntity,function (data) {
                                                if (ajaxUtil.success(data)) {
                                                    ajaxUtil.myAjax(null,"/postref/delPostRef",copySendEntity,function (data) {
                                                        ajaxUtil.deleteFile(row.itemcode);
                                                        var submitConfirmModal = {
                                                            modalBodyID :"myTopicSubmitTip",
                                                            modalTitle : "提示",
                                                            modalClass : "modal-lg",
                                                            cancelButtonStyle: "display:none",
                                                            modalConfirmFun:function (){
                                                                return true;
                                                            }
                                                        }
                                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                                        submitConfirm.show();
                                                        isSuccess = true;
                                                        refreshTable();
                                                    },false,"","delete");
                                                }
                                            },false,"","delete");
                                        }
                                    },false,"","delete");
                                }
                            },false,"","delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .transpond' : function (e, value, row, index) {
                    var myTranspondModalData ={
                        modalBodyID: "myReceiptModal",
                        modalTitle: "转发文件至",
                        modalClass: "modal-sm",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": postStatus[4].id,
                                "postOpinion1": ""
                            };
                            if ($("#all_select").is(":checked") == true){
                                submitStatus.postOpinion1 = "1234";
                            }else {
                                var po = "";
                                if ($("#zhongyichu").is(":checked") == true){
                                    po = "1";
                                }
                                if ($("#zhongyaochu").is(":checked")== true){
                                    po = po + "2";
                                }
                                if ($("#zonghechu").is(":checked") == true){
                                    po = po + "3";
                                }
                                if ($("#faguijandu").is(":checked") == true){
                                    po = po + "4";
                                }
                                submitStatus.postOpinion1 = po;
                            }
                            if ($("#all_select").is(":checked") == true||$("#zhongyichu").is(":checked") == true||$("#zhongyaochu").is(":checked")== true||$("#zonghechu").is(":checked") == true||$("#faguijandu").is(":checked") == true){
                                ajaxUtil.myAjax(null,"/post/updatePost",submitStatus,function (data) {
                                    if(ajaxUtil.success(data)){
                                        if(data.code == 88888){
                                            var submitConfirmModal = {
                                                modalBodyID :"myTopicSubmitTip",
                                                modalTitle : "提示",
                                                modalClass : "modal-lg",
                                                cancelButtonStyle: "display:none",
                                                modalConfirmFun:function (){
                                                    return true;
                                                }
                                            }
                                            var submitConfirm = modalUtil.init(submitConfirmModal);
                                            submitConfirm.show();

                                            isSuccess = true;
                                            refreshTable();
                                        }else{
                                            alertUtil.error(data.msg);
                                        }
                                    }
                                },false,true,"post");
                            }else {
                                alertUtil.error("选项不能为空");
                            }
                            return isSuccess;
                        }

                    };
                    var myTranspondModal = modalUtil.init(myTranspondModalData);
                    myTranspondModal.show();
                },

                'click .send-file' : function (e, value, row, index) {
                    var mySendFilePostModalData ={
                        modalBodyID :"mySendTips",
                        modalTitle : "文件将发送至对应部门",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": postStatus[10].id,
                            };
                            var postRefEntity = {
                                "sendStatus": 1,
                                "dateCode": row.itemcode
                            };
                            ajaxUtil.myAjax(null,"/post/updatePost", submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        ajaxUtil.myAjax(null, "/postref/updPostRef", postRefEntity, function (data) {
                                            if (ajaxUtil.success(data)) {
                                                var submitConfirmModal = {
                                                    modalBodyID :"myTopicSubmitTip",
                                                    modalTitle : "提示",
                                                    modalClass : "modal-lg",
                                                    cancelButtonStyle: "display:none",
                                                    modalConfirmFun:function (){
                                                        return true;
                                                    }
                                                }
                                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                                submitConfirm.show();

                                                isSuccess = true;
                                                refreshTable();
                                            } else {
                                                alert(data.msg);
                                            }
                                        }, false, true, "post");
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false, true,"post");
                            return isSuccess;
                        }
                    };
                    var mySendFileModal = modalUtil.init(mySendFilePostModalData);
                    mySendFileModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/post_view";
                    orange.redirect(viewUrl);
                },


                'click .submit' : function (e, value, row, index) {
                    var mySubmitPostModalData ={
                        modalBodyID :"mySendModal",
                        modalTitle : "发送",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": postStatus[1].id,
                            };
                            ajaxUtil.myAjax(null,"/post/updatePost", submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();

                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false,true,"post");
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitPostModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitPostModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": postStatus[0].id,
                            };
                            ajaxUtil.myAjax(null,"/post/updatePost", submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();

                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false,true,"post");
                            return isSuccess;
                        }
                    };
                    var mySubmitModal = modalUtil.init(myNoSubmitPostModalData);
                    mySubmitModal.show();
                },
            };


            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
            });


            var url;
            var aCol;
            if (rolename === "政务资源科员"){
                $('#btn_addTask').attr('style', "display:block;");
                url = "/post/getByClerk?postDepartment="+sessionStorage.getItem("cityId");
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation1, events:orgEvents}
                ];

            }else if (rolename === "政务资源处长"){
                url = "/post/getByDirector?postDepartment="+sessionStorage.getItem("cityId");
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation2,events:orgEvents}
                ];

            }else if (rolename === "政务资源综合处处长"){
                url = "/post/getPost?postDataStatus=3";
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation3,events:orgEvents}
                ];

            }else if (rolename === "中医处分管局长" || rolename === "中药处分管局长" || rolename === "综合处分管局长" || rolename === "法规监督处分管局长"){
                if (rolename === "中医处分管局长"){
                    url = "/post/getDeputyDirector?postOpinion1=1";
                }else if (rolename === "中药处分管局长"){
                    url = "/post/getDeputyDirector?postOpinion1=2";
                }else if (rolename === "综合处分管局长"){
                    url = "/post/getDeputyDirector?postOpinion1=3";
                }else if (rolename === "法规监督处分管局长"){
                    url = "/post/getDeputyDirector?postOpinion1=4";
                }
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation4,events:orgEvents}
                ];

            }else if (rolename === "政务资源局长"){
                url = "/post/getPost?postDataStatus=5";
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation5,events:orgEvents}
                ];

            }else if (rolename === "省直管医疗机构"||rolename === "市直管医疗机构"||rolename === "县直管医疗机构"||rolename === "省中医药管理部门"||rolename === "市中医药管理部门"||rolename === "县中医药管理部门"){
                url = "/post/getSend?receiverId="+username;
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation6,events:orgEvents}
                ];

            }

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol, "postPublicWay");


        })
})();
