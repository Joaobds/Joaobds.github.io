/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.plugins.addExternal('FMathEditor', 'plugins/FMathEditor/', 'plugin.js');
CKEDITOR.plugins.addExternal('SimpleLink', 'plugins/simple-link/', 'plugin.js');
CKEDITOR.plugins.addExternal('youtube', 'plugins/youtube/', 'plugin.js');
CKEDITOR.plugins.addExternal('openlink', 'plugins/openlink/', 'plugin.js');
CKEDITOR.plugins.addExternal('imageresizerowandcolumn', 'plugins/imageresizerowandcolumn/', 'plugin.js');


CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.width = '100%';
	config.extraPlugins = 'FMathEditor, SimpleLink, youtube, openlink, imageresizerowandcolumn';
	config.removePlugins = 'iframe';
	config.allowedContent = true;
	config.mathJaxLib = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_HTML'
};
