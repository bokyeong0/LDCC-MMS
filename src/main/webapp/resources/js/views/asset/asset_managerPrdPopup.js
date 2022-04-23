/** Copyright (c) 2016 VertexID RND, Inc.
 *
 * Application Name : 자산목록 품목별수량 팝업[AssetManagerPrdPopApp]
 * Program Code     :
 * Description      :
 * Revision History
 * Author           Date                Description
 * ------------     -------------       ------------------
 * Kim Seon Ho       2018. 01. 25.        First Draft.
 */
var AssetManagerPrdPopApp = function () {
    "use strict";

    /************************************************
     *전역 객체 선언부 (return 상위부분에 선언해야함)
     ************************************************/

    // [El]프로그램 그리드
    var $assetManagerPrdPopGrid = $("#assetManagerPrdPopGrid");
    var searchData = $("#modalAssetManagerPrdCountPop").PopAppGetData().sendData;

    return {
        init: function () {
            //존관리 Grid생성
            fnListAssetPrdPop();
        }
    };

    /********************************************************************
     * 고객사 팝업 그리드 생성
     * Since   : 2018-01-25
     * 작성자  : Kim Seon Ho
     * 수정내역:
     ********************************************************************/
    //[Fn] jqgrid Area 목록
    function fnListAssetPrdPop(){
    	$assetManagerPrdPopGrid.paragonGrid({
            url: '/ctrl/asset/asset/listAssetManagerPrdCountPop',
            sortable: true,
            rownumbers: true,
            domainId : '품목별수량',
            width:'700',
            postData: {
				compCd 		: searchData.compCd,
				brndCd 		: searchData.brndCd,
				strCd 		: searchData.strCd,
				astSt 		: searchData.astSt,
				prdTypeLv1 	: searchData.prdTypeLv1,
				prdTypeLv2 	: searchData.prdTypeLv2,
				prdTypeLv3 	: searchData.prdTypeLv3,
    			prdCd 		: searchData.prdCd,
    			serialNo 	: searchData.serialNo,
    			strType 	: searchData.strType,
    			aspCompCd 	: searchData.aspCompCd,
    			areaCd 		: searchData.areaCd,
    			astType2 	: searchData.astType2,
    			conYearYn	: searchData.conYearYn
            	},
            colNames : [
                        "제품범주", "제품군", "수량"
                        ],
            colModel:[
                {name : 'PRD_TYPE_LV1_NM', align:"center", width:"50px"},	//제품범주
                {name : 'PRD_TYPE_LV2_NM', align:"center"},					//제품군
                {name : 'PRD_TYPE_LV2_COUNT', align:"center", width:"50px"} 			//제품군 수량
            ],
            pager: "#assetManagerPrdPopGridNavi",
        });
    }
    
}();

$(document).ready(function() {
	AssetManagerPrdPopApp.init();
});
