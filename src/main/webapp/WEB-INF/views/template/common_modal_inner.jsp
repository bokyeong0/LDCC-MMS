<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html>
	<head>
<!--     <script src="/js/views/template/ui-modal-notification.demo.js"></script> -->
	</head>
<body>
<div class="modal-header">
	<button type="button" class="close" data-close-btn="ture"  >×</button>
	<h4 class="modal-title">회원가입</h4>
</div>
<div class="modal-body">
	<div class="panel panel-inverse" data-sortable-id="form-stuff-1">
	    <div class="panel-body">
	        <form class="form-horizontal">
	            <div class="form-group">
	                <label class="col-md-3 control-label">Default Input</label>
	                <div class="col-md-9">
	                    <input type="text" class="form-control" placeholder="Default input" />
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Disabled Input</label>
	                <div class="col-md-9">
	                    <input type="text" class="form-control" placeholder="Disabled input" disabled />
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Select</label>
	                <div class="col-md-9">
	                    <select class="form-control">
	                        <option>1</option>
	                        <option>2</option>
	                        <option>3</option>
	                        <option>4</option>
	                        <option>5</option>
	                    </select>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Select (multiple)</label>
	                <div class="col-md-9">
	                    <select multiple class="form-control">
	                        <option>1</option>
	                        <option>2</option>
	                        <option>3</option>
	                        <option>4</option>
	                        <option>5</option>
	                    </select>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Textarea</label>
	                <div class="col-md-9">
	                    <textarea class="form-control" placeholder="Textarea" rows="5"></textarea>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Checkbox</label>
	                <div class="col-md-9">
	                    <div class="checkbox">
	                        <label>
	                            <input type="checkbox" value="" />
	                            Checkbox Label 1
	                        </label>
	                    </div>
	                    <div class="checkbox">
	                        <label>
	                            <input type="checkbox" value="" />
	                            Checkbox Label 2
	                        </label>
	                    </div>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Inline Checkbox</label>
	                <div class="col-md-9">
	                    <label class="checkbox-inline">
	                        <input type="checkbox" value="" />
	                        Checkbox Label 1
	                    </label>
	                    <label class="checkbox-inline">
	                        <input type="checkbox" value="" />
	                        Checkbox Label 2
	                    </label>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Radio Button</label>
	                <div class="col-md-9">
	                    <div class="radio">
	                        <label>
	                            <input type="radio" name="optionsRadios" value="option1" checked />
	                            Radio option 1
	                        </label>
	                    </div>
	                    <div class="radio">
	                        <label>
	                            <input type="radio" name="optionsRadios" value="option2" />
	                            Radio option 2
	                        </label>
	                    </div>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Inline Radio Button</label>
	                <div class="col-md-9">
	                    <label class="radio-inline">
	                        <input type="radio" name="optionsRadios" value="option1" checked />
	                        Radio option 1
	                    </label>
	                    <label class="radio-inline">
	                        <input type="radio"  name="optionsRadios" value="option2" />
	                        Radio option 2
	                    </label>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group has-success has-feedback">
	                <label class="col-md-3 control-label">Input with Success</label>
	                <div class="col-md-9">
	                    <input type="text" class="form-control" />
	                    <span class="fa fa-check form-control-feedback"></span>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group has-warning has-feedback">
	                <label class="col-md-3 control-label">Input with Warning</label>
	                <div class="col-md-9">
	                    <input type="text" class="form-control" />
	                    <span class="fa fa-warning form-control-feedback"></span>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group has-error has-feedback">
	                <label class="col-md-3 control-label">Input with Error</label>
	                <div class="col-md-9">
	                    <input type="text" class="form-control" />
	                    <span class="fa fa-times form-control-feedback"></span>
	                </div>
	            </div>
	            <div class="hr-line-dashed"></div>
	            <div class="form-group">
	                <label class="col-md-3 control-label">Submit</label>
	                <div class="col-md-9">
	                    <button type="submit" class="btn btn-sm btn-success">Submit Button</button>
	                </div>
	            </div>
	        </form>
	    </div>
	</div>
</div>
<div class="modal-footer">
	<a href="javascript:;" class="btn btn-sm btn-white" data-close-btn="ture" >닫기</a>
	<a href="javascript:;" class="btn btn-sm btn-danger" >저장</a>
</div>
			
</html>