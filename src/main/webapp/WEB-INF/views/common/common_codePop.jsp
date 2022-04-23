<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
    <head>
    </head>
    <body>
        <div class="modal-header">
            <button type="button" class="close" data-close-btn="ture">X</button>
            <h4 class="modal-title">paragon Grid</h4>
        </div>
        <div class="modal-body">
            <div class="search-form clearfix">
                <form class="form-inline">
                    <!-- search-controls -->
                    <div class="search-controls" style="padding-left:0px">
                        <div class="form-group m-r-10">
                            <input type="text" class="form-control input-sm" id="commCodePopCd" size="10" >
                        </div>
                        <div class="form-group m-r-10">
              			    <input type="text" class="form-control input-sm" id="commCodePopNm" size="10" >
              			</div>
                    </div>
                    <div class="search-button-group">
                        <button id="commCodePopSearchBtn" type="button"  class="btn btn-sm btn-info m-r-5">
                            <i class="fa fa-search"></i> 검색
                        </button>
                        <button id="commCodePopAddRowBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
                            <i class="fa fa-plus"></i> 추가
                        </button>
                        <button id="commCodePopDelRowBtn" type="button"  class="btn btn-sm btn-danger m-r-5">
                            <i class="fa fa-minus"></i> 삭제
                        </button>
                        <button id="commCodePopSaveRowBtn" type="button"  class="btn btn-sm btn-primary m-r-5">
                            <i class="fa fa-download"></i> 저장
                        </button>
                    </div>
                </form>
            </div>
            <div class="grid-wrapper" >
        	    <table id="commCodePopGrid"></table>
        	    <div id="commCodePopGridNavi"></div>
            </div>
        </div>
        <div class="modal-footer">
      	    <a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
        </div>
    <script src="/js/views/common/common_codePop.js"></script>
</body>
</html>
