const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
const self = {
	name: 'MatchWord',
	path: {
		chrome: 'chrome://matchword/content/'
	},
	aData: 0,
};
const myServices = {};
var cssUri;

Cu.import('resource://gre/modules/Services.jsm');
Cu.import('resource://gre/modules/devtools/Console.jsm');
Cu.import('resource://gre/modules/XPCOMUtils.jsm');
XPCOMUtils.defineLazyGetter(myServices, 'sss', function(){ return Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService) });

function startup(aData, aReason) {
	self.aData = aData;
	console.log(self.aData);
	var css = '.findbar-container {-moz-binding:url("' + self.aData.resourceURI.spec + 'findbar.xml#matchword")}';
	//-moz-binding:url('chrome://matchcase/content/findbar.xml#matchword_xbl')
	//var cssEnc = 'data:text/css;base64,' + window.btoa(css);
	var cssEnc = encodeURIComponent(css);
	var newURIParam = {
		aURL: 'data:text/css,' + cssEnc,
		aOriginCharset: null,
		aBaseURI: null
	}
	cssUri = Services.io.newURI(newURIParam.aURL, newURIParam.aOriginCharset, newURIParam.aBaseURI);
	myServices.sss.loadAndRegisterSheet(cssUri, myServices.sss.USER_SHEET);
	
}

function shutdown(aData, aReason) {
	if (aReason == APP_SHUTDOWN) return;
	myServices.sss.unregisterSheet(cssUri, myServices.sss.USER_SHEET);
}

function install() {}

function uninstall() {}