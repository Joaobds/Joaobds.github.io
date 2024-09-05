﻿var dialog = CKEDITOR.dialog.add('FMathEditorDialog', function(editor) {
	var editorIFrameID = "editorIFrame" + editor.name;
	var iframe = null;
	var mathml = null;

	return {
		title: 'FMath Editor - www.fmath.info',
		minWidth: 1020,
		minHeight: 490,
		contents: [
			{
				id: 'tab-basic',
				label: 'Basic Settings',
				elements: [
					{
						type: 'html',
						html: '<iframe id="' + editorIFrameID + '" style="width:1024px;height:500px" src="' + CKEDITOR.basePath + 'plugins/FMathEditor/editor/onlyEditor.html"></iframe>'
					}
				]
			}
		],
		onOk: function() {
			var dialog = this;

			iframe.contentWindow.postMessage({ type: 'getMathML' }, '*');

			window.addEventListener('message', function(event) {

				if (event.data.type === 'mathMLResponse') {
					mathml = event.data.mathml;

					document.getElementById(editorIFrameID).contentWindow.getBlobOrUrl(function(result) {
						if (result.indexOf("ERROR:") == 0) {
							alert(result);
						} else {
							var img = result;
							var selection = editor.getSelection();
							if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
								var selElem = selection.getSelectedElement();
								if (selElem.getName() == 'img') {
									selElem.data('cke-saved-src', img);
									selElem.setAttribute("src", img)
									selElem.setAttribute("alt", "MathML (base64):" + window.btoa(mathml));
									return;
								}
							}
							var imgElem = editor.document.createElement('img');
							imgElem.setAttribute("src", img)
							imgElem.setAttribute("alt", "MathML (base64):" + window.btoa(mathml));
							editor.insertElement(imgElem);
						}
					});
				}
			}, false);
		},
		onShow: function() {
			iframe = document.getElementById(editorIFrameID);
			var selection = editor.getSelection();
			if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
				var selElem = selection.getSelectedElement();
				if (selElem.getName() == 'img') {
					var mathmlEnc = selElem.getAttribute("alt");
					if (mathmlEnc != null && mathmlEnc.length > 16) {
						mathmlEnc = mathmlEnc.substring(16, mathmlEnc.length);
						var mathml = window.atob(mathmlEnc);
						if (mathml.indexOf("<math") == 0) {
							iframe.contentWindow.postMessage({ type: 'setMathML', mathml: mathml }, '*');
						}
					}
				}
			}
		},
	};
});