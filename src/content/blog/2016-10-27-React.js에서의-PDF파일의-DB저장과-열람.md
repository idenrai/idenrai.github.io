---
title: "React.js에서의 PDF파일의 DB저장과 열람"
date: 2016-10-27
tags: ["Tech", "React.js"]
tistory_url: "https://idenrai.tistory.com/97"
---

일단 화면은 이런 식.

Modal을 열 때, 해당 데이터의 컨디션에 따라 업로드/열람 버튼을 구분하여 출력한다.

```
var React = require('react');var basic = require('../../../basic');var DatePicker = require('../../datepicker');var Header = React.createClass({render: function() {return (// ...);}});var PdfButton = React.createClass({render: function() {if(this.props.data.interview_pdf && (this.props.data.status=="interviewed")) {return (<button type='button' className='btn btn-warning btnPdfDownload center-block'>면담결과 열람</button>)}return (<button type='button' className='btn btn-warning btnPdfUpload center-block'>면담결과 업로드</button>)}});var Body = React.createClass({render: function() {var iframeStyle = {width: '100%',height: '700px'}return (<div className='modal-body'><div className='box-body'><div className='form-horizontal'><div className='form-group'><label htmlFor='inputInterviewDate' className='col-sm-2 control-label'>면담일</label><div className='col-sm-10'><DatePicker.Simple id='inputInterviewDate' placeholder='YYYY-MM-DD' value={this.props.data.interview_date} /></div></div><div className='form-group'><label htmlFor='inputInterviewNote' className='col-sm-2 control-label'>비고</label><div className='col-sm-10'><textarea className='form-control' id='inputInterviewNote' rows="3"></textarea></div></div><div className='form-group'><div id="pdfFileName" className="span12 text-center"><label></label></div><PdfButton data={this.props.data} /><input id="inputPdfFile" type="file" style={{display: 'none'}} /></div></div></div></div>);}});var Footer = React.createClass({render: function() {return (// ...)}});var Modal = React.createClass({getDefaultProps: function() {return {id: 'modal-id',header: {title: 면담결과Modal}}},render: function() {return (<div id={this.props.id} className='modal fade' tabIndex='-1' role='dialog'><div className='modal-dialog'><div className='modal-content' data-user={JSON.stringify(this.props.content_value)}><Header data={this.props.header} /><Body data={this.props.content_value} /><Footer data={this.props.is_update} /></div></div></div>);}});module.exports = {Header: Header,Body: Body,Footer: Footer,Modal: Modal}
var React = require('react');
var basic = require('../../../basic');
var DatePicker = require('../../datepicker');

var Header = React.createClass({
render: function() {
return (
// ...
);
}
});

var PdfButton = React.createClass({
render: function() {
if(this.props.data.interview_pdf && (this.props.data.status=="interviewed")) {
return (
<button type='button' className='btn btn-warning btnPdfDownload center-block'>면담결과 열람</button>
)
}
return (
<button type='button' className='btn btn-warning btnPdfUpload center-block'>면담결과 업로드</button>
)
}
});

var Body = React.createClass({
render: function() {
var iframeStyle = {
width: '100%',
height: '700px'
}
return (
<div className='modal-body'>
<div className='box-body'>
<div className='form-horizontal'>
<div className='form-group'>
<label htmlFor='inputInterviewDate' className='col-sm-2 control-label'>면담일</label>
<div className='col-sm-10'>
<DatePicker.Simple id='inputInterviewDate' placeholder='YYYY-MM-DD' value={this.props.data.interview_date} />
</div>
</div>
<div className='form-group'>
<label htmlFor='inputInterviewNote' className='col-sm-2 control-label'>비고</label>
<div className='col-sm-10'>
<textarea className='form-control' id='inputInterviewNote' rows="3"></textarea>
</div>
</div>
<div className='form-group'>
<div id="pdfFileName" className="span12 text-center"><label></label></div>
<PdfButton data={this.props.data} />
<input id="inputPdfFile" type="file" style={{display: 'none'}} />
</div>
</div>
</div>
</div>
);
}
});

var Footer = React.createClass({
render: function() {
return (
// ...
)
}
});

var Modal = React.createClass({

getDefaultProps: function() {
return {
id: 'modal-id',
header: {
title: 면담결과Modal
}
}
},
render: function() {
return (
<div id={this.props.id} className='modal fade' tabIndex='-1' role='dialog'>
<div className='modal-dialog'>
<div className='modal-content' data-user={JSON.stringify(this.props.content_value)}>
<Header data={this.props.header} />
<Body data={this.props.content_value} />
<Footer data={this.props.is_update} />
</div>
</div>
</div>
);
}
});

module.exports = {
Header: Header,
Body: Body,
Footer: Footer,
Modal: Modal
}

Colored by Color Scripter
```

Modal을 열 때, parameter를 전부 JSON.stringify를 사용해 div.modal-content에 때려박아 두었다.

input type file은 별로 이쁘지 않으니, 따로 버튼을 만들어, trigger를 걸어놓는 것으로 하였다.

```
// PDF파일 업로드 버튼
$('#' + param.id + ' .btnPdfUpload').off('click').on('click', function(e) {
e.preventDefault();
e.stopPropagation();

var $target = $(e.target);
$target.siblings('input#inputPdfFile').trigger('click');
});
Colored by Color Scripter
```

하여, trigger로 파일 입력 버튼을 기동하면 파일 선택 창이 열림.

여기서 업로드 할 파일을 선택하여, onChange가 발동했다면 다음 동작을 실행.

```
// file select
$('#' + param.id + ' input#inputPdfFile').change(function(e) {
e.preventDefault();
e.stopPropagation();

var selectedFile = $(this)[0].files;
var param = {
file: selectedFile[0],
target: $(e.target)
}
Promise.resolve(param)
.then(validatePdf)
.then(setPdfFile)
.then(resolve)
.catch(reject)
;
});
Colored by Color Scripter
```

선택된 파일에 대한 validate를 실행.

```
function validatePdf(param) {
return new Promise(function(resolve, reject) {

var errors = 0;

// 브라우저 호환 확인
if (!window.FileReader) {
errors = errors+1;
notice.error(basic.i18n.get('App.validate.notFitBrowser'));
}

// 파일이 존재하는지 확인
if (!param.file) {
errors = errors+1;
noice.error(basic.i18n.get('App.validate.notExistFile'));
}

// 파일 사이즈 확인
if (param.file.size==0) {
errors = errors+1;
notice.error(basic.i18n.get('App.validate.emptyFile'));
}

// 확장자가 PDF가 맞는지 확인
var fileName = param.file.name.split('.');
if (fileName[fileName.length-1] != 'pdf' && (fileName[fileName.length-1] != "PDF")) {
errors = errors+1;
notice.error(basic.i18n.get('App.validate.notPdfFile'));
}
if (errors > 0) {
reject(param);
}else{
resolve(param);
}
});
}

Colored by Color Scripter
```

validate를 통과했다면, pdf를 base64로 변환하여 div#pdfFileName에 attr로 박아둔다.

이후 저장 버튼을 눌러, 다른 입력값과 함께 DB에 저장.

```
function setPdfFile(param) {
return new Promise(function(resolve, reject) {

param.target.siblings('div#pdfFileName').text(param.file.name);
var fileReader = new FileReader();
var base64;

fileReader.onload = function(fileLoadedEvent) {
base64 = fileLoadedEvent.target.result;
param.target.siblings('div#pdfFileName').attr("data-pdffile", base64);
};
fileReader.readAsDataURL(param.file);

resolve(param);
});
}
Colored by Color Scripter
```

이미 PDF가 업로드 되었으며, 데이터 컨디션이 interviewed인 데이터일 경우는,

면담결과 업로드 버튼 대신 면담결과 열람 버튼이 나온다.

이 경우는 이미 div.modal-content에 해당 PDF가 base64의 형태로 들어가 있으니,

그걸 따와서 pdf로 변환하기만 하면 된다.

```
// 면담결과 열람 버튼
$('#' + param.id + ' .btnPdfDownload').off('click').on('click', function(e){
e.preventDefault();
e.stopPropagation();

var $target = $(e.target);
var user = $target.closest('div.modal-content').data('user');
var base64EncodedPDF = user.interview_pdf;
if (base64EncodedPDF && base64EncodedPDF.length>0) {
window.open(encodeURI(base64EncodedPDF));
}
});
Colored by Color Scripter
```

변환 후, 새 탭에서 해당 PDF를 출력하도록 하는 것으로 완료.
