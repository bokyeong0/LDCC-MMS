var TreeApp = function() {
	"use strict";

	/***************************************************************************
	 * ***전역 객체 선언부 시작******
	 **************************************************************************/

	//[El] 기본 트리
	var $defaultTree = $("#defaultTree");
	//[El] 체크박스 트리
	var $checkBoxTree = $("#checkBoxTree");

	/***************************************************************************
	 * ***전역 객체 선언부 종료******
	 **************************************************************************/
	return {
		init : function() {
			fnDefaultTree();
			fnCheckBoxTree();
		}
	};
	function fnDefaultTree() {
		$defaultTree.paragonTree({
			ajaxUrl:"ctrl/template/tree/ajaxTree",
		});
	}
	function fnCheckBoxTree() {
		$checkBoxTree.paragonTree({
			ajaxUrl:"ctrl/template/tree/ajaxTree",
			plugins:["checkbox"],
			types: { "default": {"icon": "fa fa-folder text-primary fa-lg"}}
		});
	}

}();

$(document).ready(function() {
	TreeApp.init();
});