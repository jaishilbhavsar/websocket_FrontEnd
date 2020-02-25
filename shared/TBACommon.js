var jsonExportExcel = '';
var jsonExportChart = '';
var jsonBrownstoneBlotter = '';
var jsonExportSSF = '';
function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });
  }
  
function checkForRepeatingCharacters(string) {
    var regularExpression = /(.)\1\1/;
    if (regularExpression.test(string)) { return false; }
    else { return true; }
};

function RepositionOpenedWidget() {
    try {
        //Reading elementid around which widget is getting opened.
        var widgetElement = $.trim($('#hdnWgtElement').val());

        if (widgetElement !== null && widgetElement !== '') {
            positionWidget(widgetElement);
        }
    }
    catch (err) {
        alert(err.Message);
    }
}

function positionWidget(elementId) {
    try {
        //Repositioning widget around elementId
        var element = $('#' + elementId);
        var elementHeight = $(element).outerHeight(true);
        var elementWidth = $(element).outerWidth(true);

        var elementOffSet = $(element).offset();
        elementOffSet.top += elementHeight;

        var widgetId = "";

        if ($(element).hasClass("priceWidget")) {
            widgetId = "dvPriceWidgetMobile";
        }
        else if ($(element).hasClass("termWidget")) {
            widgetId = "dvTermWidgetMobile";
        }
        else if ($(element).hasClass("basisWidget")) {
            widgetId = "tblBasis";
            if ($('#divTermBasisWidget').css('display') == 'block') {
                this.Reposition_Term_BasisWidget($('#txtFrequency'));
            }

        }

        var widget = $('#' + widgetId);

        $(widget).css({
            'margin-left': '0px !important',
        });

        $(widget).offset(elementOffSet);

        //If element is not visible on screen will reposition.
        if (!isElementCompletelyVisible(widget)) {
            elementOffSet.top = elementOffSet.top - widget.outerHeight(true) - elementHeight;
            //$(widget).offset(elementOffSet);
            $(widget).offset($('#' + elementId).offset());
        }
        if (!isElementCompletelyVisibleHorizontal(widget)) {
            elementOffSet.left = elementOffSet.left - widget.outerWidth(true) + elementWidth;
            //$(widget).offset(elementOffSet);
            $(widget).offset($('#' + elementId).offset());
        }
    }
    catch (err) {
        $('#hdnWgtElement').val('');
    }
}

function Reposition_Term_BasisWidget(objClicked) {
    try {
        var offset = $($("#tblBasis")).offset();
        var height = $($("#tblBasis")).outerHeight(true);

        var x = offset.top;
        var y = offset.left;

        if (x <= 50) // height from top to link is less than widget open below otherwise it will open on top side
        {
            $('#divTermBasisWidget').css({
                top: 0,
                left: 0
            });
        }
        else {
            $('#divTermBasisWidget').css({
                top: 0,
                left: 0
            });
        }
    }
    catch (err) {
        var strerrordesc = "Function:display_Term_BasisWidget(); Error is : " + err.description + "; Error number is " + err.number + "; Message :" + err.message;
        onJavascriptLog("basisWidgetScript.js", strerrordesc);
    }
}

//Common function to check specified html element is visible on screen or not.
function isElementCompletelyVisible(element) {
    var windowTop = $(window).scrollTop();
    var windowBottom = windowTop + $(window).height();

    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    return ((elementBottom <= windowBottom) && (elementTop >= windowTop));
}

function isElementCompletelyVisibleHorizontal(element) {

    var windowLeft = $(window).scrollLeft();
    var windowRight = windowLeft + $(window).width();

    var elementLeft = $(element).offset().left;
    var elementRight = elementLeft + $(element).width();

    return ((elementRight <= windowRight) && (elementLeft >= windowLeft));
}

$.keyCode = {
    BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CONTROL: 17, ALTER: 18, PAUSE_BREAK: 19, CAPS_LOCK: 20, ESCAPE: 27, SPACE: 32,
    PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, INSERT: 45, DELETE: 46,
    ZERO: 48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    a: 58, b: 59, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78,
    o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
    LEFTWINDOW_KEY: 91, RIGHTWINDOW_KEY: 92, SELECT_KEY: 93,
    NUMPAD_ZERO: 96, NUMPAD_ONE: 97, NUMPAD_TWO: 98, NUMPAD_THREE: 99, NUMPAD_FOUR: 100, NUMPAD_FIVE: 101,
    NUMPAD_SIX: 102, NUMPAD_SEVEN: 103, NUMPAD_EIGHT: 104, NUMPAD_NINE: 105,
    NUMPAD_MULTIPLY: 106, NUMPAD_ADD: 107, NUMPAD_ENTER: 108, NUMPAD_SUBTRACT: 109, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111,
    F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123,
    NUM_LOCK: 144, SCROLL_LOCK: 145, SEMI_COLON: 186, EQUAL_SIGN: 187, COMMA: 188, DASH: 189, PERIOD: 190, FORWARD_SLASH: 191, GRAVE_ACCENT: 192,
    OPEN_BRACKET: 219, BACK_SLASH: 220, CLOSE_BRACKET: 221, SINGLE_QUOTE: 222
};

function GEN_Func_IsPositiveNumberOnly(_key) {
    if ((_key >= $.keyCode.ZERO && _key <= $.keyCode.NINE)) {
        return true;
    }
    else { return false; }
}

function GEN_Func_IsNumberWithDotAndMinus(_key) {
    if ((_key >= $.keyCode.ZERO && _key <= $.keyCode.NINE) || _key == $.keyCode.INSERT || _key == $.keyCode.DELETE) {
        return true;
    }
    else { return false; }
}

function GEN_Func_IsNumberOrHyphenKey(_key) {
    if (GEN_Func_IsNumberAndHyphenKey(_key) || $.keyCode.DASH || $.keyCode.NUMPAD_SUBTRACT) {
        return true;
    }
    else { return false; }
}

function GEN_Func_IsDefaultAllowedKeys(_key) {
    if (_key == $.keyCode.TAB || _key == $.keyCode.BACKSPACE || _key == $.keyCode.ALTER || _key == $.keyCode.LEFTWINDOW_KEY || _key == $.keyCode.RIGHTWINDOW_KEY || _key == $.keyCode.CONTROL || _key == $.keyCode.CAPS_LOCK || _key == $.keyCode.DELETE || _key == $.keyCode.RIGHT || _key == $.keyCode.LEFT) {
        return true;
    }
    else { return false; }
}

function ReplaceAll(Source, stringToFind, stringToReplace) {
    var temp = Source;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}

function ValidateEmailId(emailString) {
    emailAddress = $.trim(emailString);
    if (emailAddress != "") {
        var regularExpression = /^[a-zA-Z0-9!#$%&'-*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z](?:[a-zA-Z]*[a-zA-Z])+$[^>]?/g;
        if (regularExpression.test(emailAddress)) { return true; }
        else { return false; }
    }
}

function isTextSelected(input) {
    if (typeof input.selectionStart == "number") {

        return input.selectionStart < input.selectionEnd; //<= input.value.length;
    } else if (typeof document.selection != "undefined") {
        input.focus();
        return document.selection.createRange().text == input.value;
    }
}

function isFullTextSelected(input) {
    if (typeof input.selectionStart == "number") {
        return input.selectionStart == 0 && input.selectionEnd == input.value.length;
    } else if (typeof document.selection != "undefined") {
        input.focus();
        return document.selection.createRange().text == input.value;
    }
}

function EscapeString(text) {
    return text.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

function ValidatePhoneId(phoneNumber) {
    phoneNumber = $.trim(phoneNumber);
    if (phoneNumber != "") {
        //var pattern = new RegExp(/^[+0-9()-/]{4,20}$/);
        //var pattern = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
        //(^(\+?\-? *[0-9]+)([,0-9 ]*)([0-9 ])*$)|(^ *$)
        //Starting with + and continues digit of length 7 to 15.
        var pattern = new RegExp(/^\+\d{7,15}$/);
        if (!phoneNumber.match(pattern)) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}

var curntSpanIndex = 0;

function getCurrentRowName() {
    return "rowNum" + curntSpanIndex;
}

function getRelativeRowName(spnIndx) {
    return "rowNum" + spnIndx;
}

function getCurrentRowIndex() {
    return curntSpanIndex;
}

function IncrCurrentRowIndex() {
    curntSpanIndex++;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function mobileAndTabletcheck() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function detectBrowserOld() {
    var N = navigator.appName;
    var UA = navigator.userAgent;
    var temp;
    var browserVersion = UA.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (browserVersion && (temp = UA.match(/version\/([\.\d]+)/i)) != null)
        browserVersion[2] = temp[1];
    browserVersion = browserVersion ? [browserVersion[1], browserVersion[2]] : [N, navigator.appVersion, '-?'];
    return browserVersion;
}

function detectBrowser() {
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

var shareErrorCode = {
    SuccessfullLogin: 0,
    UserNotRegisteredOrBlocked: -1,
    FailedAutoUrl: -2,
    FailedWithAutoUrl: -3,
    UnauthorizedIp: -5,
    NoSessionRights: -6,
    UrlExpired: -9,
    CalculatorClosed: -10,
    properties: {
        '0': { name: "SuccessfullLogin", value: 0, description: "Shared Beast Calc - Successful login" },
        '-1': { name: "UserNotRegisteredOrBlocked", value: -1, description: "Shared Beast Calc - Failed to login with the AutoURL as User is either not registered or blocked" },
        '-2': { name: "FailedAutoUrl", value: -2, description: "Shared Beast Calc - Failed to login for AutoURL" },
        '-3': { name: "FailedWithAutoUrl", value: -3, description: "Shared Beast Calc - Failed to login with the AutoURL" },
        '-5': { name: "UnauthorizedIp", value: -5, description: "Shared Beast Calc - Failed to login because of Unauthorized IP Address" },
        '-6': { name: "NoSessionRights", value: -6, description: "Shared Beast Calc - Failed to login because of no rights for the Session" },
        '-9': { name: "UrlExpired", value: -9, description: "Shared Beast Calc - Failed to login with the AutoURL as URL Expired" },
        '-10': { name: "CalculatorClosed", value: -10, description: "Shared Beast Calc - Failed to login with the AutoURL as the initiator has closed the calculator" },
        '-99999': { name: "SessionError", description: "Their is some Error! Not able to store your session." },
    }
};

//var loginErrorCode = {
//    properties: {
//        '-2': { name: "UserNotFound", description: "Invalid username or password combination." },
//        '-3': { name: "PasswordWrong", description: "Invalid username or password combination." },
//        '-4': { name: "PasswordWrongLastTime", description: "Invalid username or password combination, You Have Last Attempt To Login." },
//        '-5': { name: "PasswordWrongUserLockedOut", description: "Your Account has been locked." },
//        '-6': { name: "PasswordMustChange", description: "Please change your password." },
//        '-7': { name: "MaxLoginExceeded", description: "Maximum login exceeded." },
//        '-8': { name: "UserDisabled", description: "Account is disabled." },
//        '-9': { name: "InvalidIp", description: "Invalid IP Address." },
//        '-10': { name: "NoUserRole", description: "User does not have role of trader or broker." },
//        '-11': { name: "NoAllowedOnWeb", description: "You have no access to this product on web," },
//        '-12': { name: "NoAllowedOnExcel", description: "You have no access to this product on excel." },
//        '-13': { name: "NoAllowedOnElectron", description: "User does not have rights to access." },
//        '-14': { name: "NotAllowedIp", description: "User IP Address does not have rights to access." },
//        '-15': { name: "NotAllowedIpInSpecificRange", description: "User IP Address does not have rights to access." },
//        '-16': { name: "BlockedSpeficIp", description: "User IP Address does not have rights to access." },
//        '-17': { name: "AccessTimeExpired", description: "Your Product operation time is expired," },
//        '-18': { name: "NoProductAccess", description: "You are not permitted access to this Product," },
//        '-19': { name: "ViewOnlyProductAccess", description: "You have view only privilege for this Product," },
//        '-21': { name: "NotActiveAccount", description: "Your account is not active," },
//        '-22': { name: "NotActiveAccount", description: "Your account is not active," },
//        '-30': { name: "PasswordExpired", description: "" },
//        '-31': { name: "PasswordExpiredError", description: "There is some Error! Please click on forget password to reset your password." },
//        '-32': { name: "JWTTokenError", description: "There is some Error in creating your session." },
//        '-100': { name: "InvalidCaptcha", description: "Invalid Captcha," },
//        '-101': { name: "InvalidCaptchaScore", description: "Captcha score not allowed," },
//        '-99999': { name: "SessionError", description: "There is some Error! Not able to store your session." },
//        '-999999': { name: "PasswordExpireError", description: "Your password is expired, click on the forgot password link to set the new password." },
//    }
//};

var activationLinkErrorCode = {
    properties: {
        '1': { name: 'InvalieLink', description: 'This link is not valid' },
        '2': { name: 'Error', description: 'Something went wrong, Link could not be generate.' },
        '-5': { name: 'ActiveAccount', description: 'User is already active' },
        '-6': { name: 'InvalidLink', description: 'This link is not valid' },
        '-8': { name: 'DisabledAccount', description: 'Your account is disabled.' },
        '-100': { name: 'InvalidCaptcha', description: 'Invalid captcha' },
        '-101': { name: 'CaptchaScoreNotAllowd', description: 'Captcha score is not Allowed' }
    }
};

var activationPasswordErrorCode = {
    properties: {
        '-1': { name: 'InvalidLink', description: 'Invalid activation link.' },
        '1': { name: 'InvalidUser', description: 'User does not exist.' },
        '2': { name: 'DisabledUser', description: 'Your account is disabled.' },
        '3': { name: 'InvalidActivationCode', description: 'Invalid activation code [1000].' },
        '4': { name: 'ActivationCodeExpired', description: 'Invalid activation code [1001].' },
        '-5': { name: 'ResetPasswordLinkNotValid', description: 'Reset Password link is invalid [1002].' },
        '-6': { name: 'ActivationLinkExpired', description: 'This activation link is expired.' },
        '-7': { name: 'ActivationLinkNotValid', description: 'Activation link is invalid [1003].' },
    }
};

var productpermissionType = {
    Allowed: 1,
    ViewOnly: 2,
    NotAllowed: 3,
};

var PasswordExpiryType = {
    NotExpired: 0,
    AboutToExpire: 1,
    Expired: 2
};

var ResetPasswordResponse = {
    SuccessfullyChanged: 1,
    LinkExpired: -2,
    CodeDoesNotExist: -3,
    CodeExpired: -4,
    OldPasswordUsed: -7,
    CommonlyUsedPassword: -8,
    PasswordInDictionary: -9,
    AccountDisabled: -10
};
var ChangePasswordResponse = {
    SuccessfullyChanged: 1,
    OldPasswordMismatch: -2,
    CodeDoesNotExist: -3,
    CodeExpired: -4,
    OldPasswordUsed: -7,
    CommonlyUsedPassword: -8,
    PasswordInDictionary: -9,
    AccountDisabled: -10
};
// Called when an exception is occured during Token Authentication
function ShowExceptionPopUp(exceptionMessage) {
    try {
        $('#exceptionMessage').html(exceptionMessage);
        $('#exceptionModal').draggable({ handle: "#errorModalHeader" });
        $('#exceptionModal').modal({ keyboard: false, backdrop: 'static' });
    }
    catch (err) {
        console.log("popup error.");
    }
}

Array.prototype.remove = function (element, array) {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === element) {
            this.splice(i, 1);
            if (!array)
                break;
        }
    }
    return this;
};

// Switches name with value. Called on Focus change of text field.
function switchValuesForNameAndDisplayOut(element, appParameter) {
    var valFrmTitle = element.attr("name");
    if (element.attr("title") != "datepick" && element.hasClass("priceWidget") == false && element.hasClass("termWidget") == false && element.hasClass("basisWidget") == false && element.hasClass("inputDisable") == false) {
        var elementValue = element.val();
        element.val(valFrmTitle).attr("name", elementValue);
        if (elementValue !== "" || (elementValue == "" && element.attr("allownull") == "true")) {
            appParameter.ElementType = "DDList";
            appParameter.ElementId = element.attr("id").substring(element.attr("id").lastIndexOf('_') + 1);
            appParameter.ElementValue = elementValue;
            signalrService.UpdateValueInApplication(appParameter);
        }
    }
}
// Switches name with value. Called on Focus change of text field.
function switchValuesForNameAndDisplay(element) {
    var valFrmTitle = element.attr("name");
    if (element.attr("title") != "datepick" && element.hasClass("priceWidget") == false && element.hasClass("termWidget") == false && element.hasClass("basisWidget") == false && element.hasClass("inputDisable") == false) {
        var elementValue = element.val();
        element.val(valFrmTitle).attr("name", elementValue);

    }
}

// Common DatePicker change date events for all applications.
function datepickChangeDate(currentControl, appParameter) {
    try {
        var value = currentControl.val();
        appParameter.ElementType = "DDList";
        appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
        appParameter.ElementValue = (value !== "") ? value : "clr";
        signalrService.UpdateValueInApplication(appParameter);
    } catch (err) {
        console.log("Function:datepick(); Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
    }

}

// Common texbox click events for all applications.
function textClick(currentControl, appParameter) {
    appParameter.ElementType = "DDList";
    appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
    appParameter.ElementValue = currentControl.val();

    if (currentControl.hasClass("priceWidget")) {
        try {
            display_PriceWidget(appParameter, currentControl);
        }
        catch (err) {
            console.log("Function:text_priceWidget(); Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
        }
    }
    else if (currentControl.hasClass("termWidget")) {
        try {
            display_TermWidget(appParameter, currentControl);
        }
        catch (err) {
            console.log("Function:text_termWidget(); Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
        }
    }
    else if (currentControl.hasClass("basisWidget")) {
        try {
            display_BasisWidget(appParameter, currentControl);
        }
        catch (err) {
            console.log("Function:text_basisWidget(); Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
        }
    }
}

// Common dropdown change events for all applications.
function selectChange(currentControl, appParameter) {

    try {
        var value = currentControl;
        if (value.val() !== "" && value.val() !== "notselected") {
            appParameter.ElementType = "DDList";
            appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
            appParameter.ElementValue = currentControl.val();
            signalrService.UpdateValueInApplication(appParameter);
        }

    } catch (err) {
        console.log("Function:select_DDList();  Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
    }

}

function selectHospitalChange(currentControl, appParameter) {

    try {
        var value = currentControl;

        appParameter.ElementType = "DDList";
        appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
        appParameter.ElementValue = currentControl.val();
        signalrService.UpdateValueInApplication(appParameter);

    } catch (err) {
        console.log("Function:select_DDList();  Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
    }

}

// Common Textbox key down event for all applications.
function textKeyDown(event, currentControl, appParameter, isNumeric) {
    var keyNumber = event.keyCode;
    var keyValue = event.key;

    var letterNumber = /^[0-9a-zA-Z]+$/;
    var Numeric = /^[0-9.-]+$/;
    var allCharacter = /^[0-9a-zA-Z!@#$%^&*()_+-{}|\\:;'"~,./]+$/;

    if (currentControl.attr("title") === "datepick") {
        // Added condition to allow TAB for Datepicker
        if (keyNumber != 9) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        }
    }
    if (keyNumber === 13 || keyNumber === 9) {

        if (currentControl.prop('required') == true) {
            if (!(currentControl.hasClass('inputDisable'))) {
                if (((currentControl.val().trim()) == "" || (currentControl.val().trim()) == undefined)) {
                    currentControl.addClass('requiredField');
                }
                else {
                    currentControl.removeClass('requiredField');
                }
            }
        }

        var hasChanged = currentControl.hasClass('changeDone');
        if (hasChanged) {
            currentControl.removeClass('changeDone');
            var value = currentControl.val();
            if (value !== "" || (value == "" && currentControl.attr("allownull") == "true") || (value == "" && currentControl.attr("allowclear") == "true")) {
                appParameter.ElementType = "DDList";
                appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
                if (value.indexOf("-") !== -1) {
                    currentControl[0].name = "-" + value.replace('-', '');
                    currentControl[0].value = "-" + value.replace('-', '');
                    appParameter.ElementValue = "-" + value.replace('-', '');
                }
                else if (value == "" && currentControl.attr("allowclear") == "true") {
                    appParameter.ElementValue = "clr";
                }
                else {
                    appParameter.ElementValue = value;
                }
                signalrService.UpdateValueInApplication(appParameter);
                $("#" + currentControl.attr('id')).blur();
            }
        }
    }
    else {
        if (!isNumeric) {
            if (event.key.match(letterNumber) != null) {
                currentControl.addClass('changeDone');
            }
            else {
                event.preventDefault();
            }
        }
            // Added Condition for Decimal Point in IE
        else if (event.key.match(Numeric) != null || keyNumber === 8 || keyNumber === 46 || keyNumber === 110 || keyNumber === 109) {
            if (currentControl.val().indexOf("-") !== -1 && event.key == "-") {
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
            if (currentControl.val().indexOf(".") !== -1 && (event.key == "." || event.key == 'Decimal')) {
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
            currentControl.addClass('changeDone');
        }
        else if (keyNumber > 34 && keyNumber < 41) {
            event.returnValue = true;
        }
        else {
            event.preventDefault();
        }
    }
}

function textKeyDownAllCharacter(event, currentControl, appParameter) {
    var keyNumber = event.keyCode;
    var keyValue = event.key;

    var allCharacter = /^[0-9a-zA-Z!@#$%^&*()_+-{}|\\:;'"~,./ ]+$/g;

    if (currentControl.attr("title") === "datepick") event.preventDefault ? event.preventDefault() : event.returnValue = false;
    if (keyNumber === 13 || keyNumber === 9) {
        var hasChanged = currentControl.hasClass('changeDone');
        if (hasChanged) {
            currentControl.removeClass('changeDone');
            var value = currentControl.val();
            if (value !== "" || (value == "" && currentControl.attr("allownull") == "true")) {
                appParameter.ElementType = "DDList";
                appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
                if (value.indexOf("-") !== -1) {
                    currentControl[0].name = "-" + value.replace('-', '');
                    currentControl[0].value = "-" + value.replace('-', '');
                    appParameter.ElementValue = "-" + value.replace('-', '');
                }
                else {
                    appParameter.ElementValue = value;
                }
                signalrService.UpdateValueInApplication(appParameter);
            }
        }
    }

    if (event.key.match(allCharacter) != null) {
        if (appParameter.AppId == "170" || appParameter.AppId == "174") {
            if (appParameter.ElementId == "1700" || appParameter.ElementId == "1701" || appParameter.ElementId == "1702") {

                if (event.key == "^") {

                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                }
            }

        }
        currentControl.addClass('changeDone');
    }
    else {
        event.preventDefault();
    }
}
// Common button click event for all applications.
function buttonClick(currentControl, appParameter) {
    try {

        if (!currentControl.hasClass("inputDisable")) {
            var value = currentControl.attr("name");
            if (value === "1")
                currentControl.attr("name", "0");
            else
                currentControl.attr("name", "1");
            value = value === "1" ? 0 : 1;
            appParameter.ElementType = "DDList";
            appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
            appParameter.ElementValue = value;
            signalrService.UpdateValueInApplication(appParameter);
        }
    } catch (err) {
        console.log("Function:button_inputDisable(); Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
    }

}

// Common text box changes event for all applications.
function textChange(currentControl, appParameter) {
    try {
        if (currentControl.attr("title") !== "datepick") {
            appParameter.ElementType = "DDList";
            appParameter.ElementId = currentControl.attr("id").substring(currentControl.attr("id").lastIndexOf('_') + 1);
            appParameter.ElementValue = currentControl.val();
            signalrService.UpdateValueInApplication(appParameter);
            currentControl.name = currentControl.val();
        }
    } catch (err) {
        console.log("Function:textChange(); Error is : " + err.description + "; ElementId is :" + currentControl.attr("id") + "; Error number is " + err.number + "; Message :" + err.message);
    }

}

function getCurrentEpochTime() {
    //return (new Date().getTime());
    //return Math.floor((new Date()).getTime() / 1000);
    //return (new Date).getTime();
    return new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
}

function getGuid() {
    function calGuid() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return calGuid() + calGuid() + '-' + calGuid() + '-' + calGuid() + '-' + calGuid() + '-' + calGuid() + calGuid() + calGuid();
}

function getCurrentDateString() {
    //Format will be yyyy-mm-dd hh-mm-ss-mmm e.i.2018-03-07 6:56:10:000
    var date = new Date(),
        year = date.getFullYear(),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        milliSeconds = date.getMilliseconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;
    if (milliSeconds.length < 2) milliSeconds = '00' + milliSeconds;
    if (milliSeconds.length < 3) milliSeconds = '0' + milliSeconds;

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + ':' + milliSeconds;

}

Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}

$(document).ready(function () {
    if (config.Environment && config.Environment != "") {
        $(".platformAlert").css("display", "block");
        $("#environment").html(config.Environment);
    }
    else {
        $(".platformAlert").css("display", "none");
    }
    $("#logo").prop("href", config.clientUrl);
    $(".companyLogo").prop("href", config.clientUrl);
    $("#home").prop("href", config.clientUrl);
    $("#linkAppStore").prop("href", config.clientUrl);
    $('#spnYear').html('Copyright (c) ' + getYearText() + ',');
});

function getYearText() {
    var year = new Date().getFullYear()
    return "2018-" + year.toString().slice(-2);
}

//Used to remove all cookie.
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


// Called when no is clicked in delete confirmation modal.
function DeleteConfirmationNo() {
    $("#DeleteConfirmation").modal("hide");
}

// Called when yes is clicked in delete confirmation modal.
function DeleteConfirmationYes(appParameter) {
    signalrService.UpdateValueInApplication(appParameter);

    if (appParameter.AppId == "2614") {
        $('#TBA_2614_searchReport tr:last').remove();
    }
    else if (appParameter.AppId == "2619") {
        $('#TBA_2619_searchReport tr:last').remove();
    }
    else {
        $("#TBA_" + appParameter.AppId + " tr:last").remove();
    }

    $("#DeleteConfirmation").modal("hide");
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function showLoading() {
    //$('#divLoading').remove();
    //$('#appDiv').append('<div id="divLoading"><img class="loader" src="images/final.gif" alt="Loading..." /></div>');
}

function hideLoading() {
    $('#divLoading').remove();
}

function GetFirstAvailableProductToRedirect(AllowedProducts) {
    try {
        var redirectUrl = config.clientUrl;
        if (config.isRunningLocal && AllowedProducts) { //Local
            var lastOpenProduct = AllowedProducts.filter(function (data) {
                return data.IsLastOpenProduct == true
            })[0];
            var redirectProduct;
            if (lastOpenProduct) {
                redirectProduct = config.ProductsMapping.filter(function (data) {
                    return data.ProductId == lastOpenProduct.ProductId;
                });
                if (redirectProduct && redirectProduct.length > 0) {
                    redirectUrl = redirectProduct[0].URL;
                }
            }
            else {
                //if there is not last open product open default product
                var defaultProduct = AllProducts.filter(function (data) {
                    return data.IsDefaultProduct == 1
                })[0];
                if (defaultProduct) {
                    redirectProduct = config.ProductsMapping.filter(function (data) {
                        return data.ProductId == defaultProduct.ProductId;
                    });
                    if (redirectProduct && redirectProduct.length > 0) {
                        redirectUrl = redirectProduct[0].URL;
                    }
                }
            }
        } else if (AllowedProducts) {
            var lastOpenProduct = AllowedProducts.filter(function (data) {
                return data.IsLastOpenProduct == true;
            });
            if (lastOpenProduct && lastOpenProduct.length > 0) {
                redirectUrl = lastOpenProduct[0].WebURL;
            }
            else {
                //if there is not last open product open default product
                var defaultProduct = AllowedProducts.filter(function (data) {
                    return data.IsDefaultProduct == 1;
                });
                if (defaultProduct && defaultProduct.length > 0) {
                    redirectUrl = defaultProduct[0].WebURL;
                }
            }
        }
        return redirectUrl;
    } catch (e) {
        return redirectUrl;
    }
}

function GetAvailableProductToRedirect(returnURLCode, AllowedProducts) {
    var redirectUrl = config.clientUrl;
    try {
        if (config.isRunningLocal && AllowedProducts) { //Local
            var userAllowedProducts = AllowedProducts.filter(function (data) {
                return data.ProductPermissionType == productpermissionType.Allowed || data.ProductPermissionType == productpermissionType.ViewOnly
            });

            if (userAllowedProducts) {
                var allowedProduct = userAllowedProducts.filter(function (data) {
                    return data.ProductId == returnUrlProduct.ProductId;
                });
                if (allowedProduct && allowedProduct.length > 0) {
                    var product = config.ProductsMapping.filter(function (data) {
                        return data.ProductId == allowedProduct[0].ProductId;//getUrlVars()["returnUrlCode"];
                    });
                    if (product && product.length > 0) {
                        redirectUrl = product[0].URL;
                    }
                }
            }
            return redirectUrl;

        } else if (AllowedProducts) { //When not running on local
            //Total allowed products
            var userAllowedProducts = AllowedProducts.filter(function (data) {
                return data.ProductPermissionType == productpermissionType.Allowed || data.ProductPermissionType == productpermissionType.ViewOnly
            });

            if (userAllowedProducts && userAllowedProducts.length > 0) {
                //Getting product id from the config using product code passed in URL
                var returnURLProductId = config.ProductsMapping.filter(function (data) {
                    return data.ProductCode == returnURLCode;//getUrlVars()["returnUrlCode"];
                })[0];

                if (returnURLProductId) {
                    //Getting URL and object using product id from allowed products
                    var returnUrlProduct = userAllowedProducts.filter(function (data) {
                        return data.ProductId == returnURLProductId.ProductId;
                    })[0];

                    if (returnUrlProduct) {
                        var allowedProduct = userAllowedProducts.filter(function (data) {
                            return data.ProductId == returnUrlProduct.ProductId;
                        })[0];
                        if (allowedProduct) {
                            redirectUrl = allowedProduct.WebURL;
                        }
                    }
                }
            }
        }

        return redirectUrl;
    } catch (e) {
        return redirectUrl;
    }
}

function RenderProductsHtml(AllowedProducts) {

    var productsHtml = "";
    for (var k = 0; k < AllowedProducts.length; k++) {
        var currentProduct = AllowedProducts[k];
        if (currentProduct.Is_WebVisible) {
            if (AllowedProducts[k].ProductPermissionType == productpermissionType.Allowed) {
                productsHtml +=
                '<li>' +
                    '<a target="_blank" id="pid' + currentProduct.ProductId + '" title="Full access to this product." class="allowed" href="' + rootURL + currentProduct.WebURL + '">' +
                        '<img src="' + rootURL + currentProduct.WebLogoURL + '" alt=' + currentProduct.WebProductName + ' class="allowed" />' +
                        '<label>' + currentProduct.WebProductName + '</label>' +
                    '</a>' +
                '</li>';
            }
            else if (AllowedProducts[k].ProductPermissionType == productpermissionType.ViewOnly) {
                var title = "";
                var isTrader = userInfo.Roles == "trader";
                if (isTrader) {
                    title = "You have view only privilege for this Product,Please contact your broker for additional access to this product.";
                }
                else {
                    title = "You have view only privilege for this Product. Please contact the support team for additional access to this product.";
                }
                productsHtml +=
                '<li>' +
                    '<a  target="_blank" id="pid' + currentProduct.ProductId + '" title="' + title + '" class="viewonly" href="' + rootURL + currentProduct.WebURL + '">' +
                        '<img src="' + rootURL + currentProduct.WebLogoURL + '" alt=' + currentProduct.WebProductName + ' class="viewonly" />' +
                        '<label>' + currentProduct.WebProductName + '</label>' +
                    '</a>' +
                '</li>';

                //Set screen view-only if current product have viewonly rights
                if (currentProduct.ProductId == config.ProductId)
                { setupScreenForViewOnlyAccess(); }
            }
            else {
                var title = "";
                var isTrader = userInfo.Roles == "trader";
                if (isTrader) {
                    title = "You are not permitted access to this Product, Please contact your broker for an access to this product.";
                }
                else {
                    title = "You are not permitted access to this Product, Please contact the support team for an access to this product.";
                }
                productsHtml +=
                '<li>' +
                    '<a target="_blank" id="pid' + currentProduct.ProductId + '"  title="' + title + '"  class="notallowed">' +
                        '<img src="' + rootURL + currentProduct.WebLogoURL + '" alt=' + currentProduct.WebProductName + ' class="notallowed" />' +
                        '<label>' + currentProduct.WebProductName + '</label>' +
                    '</a>' +
                '</li>';
            }
        }
    }
    if ($('#allowedProducts').length > 0)
        $('#allowedProducts').html("").append(productsHtml);
}

var NotificationType = {
    Info: 'info',
    Warning: 'warning',
    Error: 'error',
    Critical: 'critical',
    Default: 'default'
};

function showDebugMessage(message, messageLevel) {
    removeFooterNotification(0);
    var title = 'Message:';
    footerNotification(messageLevel, title, message, 0, false);
}

/*Notification related changes start*/
//footerNotification(NotificationType.Critical, 'Test', 'This is test message', 0, true);
//footerNotification(NotificationType.Error, 'Test', 'This is test message', 5000, false);
//footerNotification(NotificationType.Warning, 'Test', 'This is test message', 0, true);
//footerNotification(NotificationType.Info, 'Test', 'This is test message', 0, false);
//removeFooterNotification();
function footerNotification(type, title, message, messageStayTime, allowClose) { //messageStayTime=ms
    var fadeTime = 300;//ms
    var closeBtnHtml = '';
    var uniqueId = getGuid();
    if (allowClose)
        closeBtnHtml = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
    var divHtml = '<div id="' + uniqueId + '" style="display:none;" class="alert ' + type + ' alert-dismissible fade in">' +
                    closeBtnHtml +
                    '<strong>' + title + '    </strong>' + message +
                    '<div class="copyright">Copyright (c) ' + getYearText() + ',<span style="color:white;"> XP Investments US, LLC. ALL RIGHTS RESERVED.</span></div>' +
                  '</div>';

    if ($('#alertWrapper').length == 0) {
        $("footer").before('<div id="alertWrapper" class="alertWrapper"></div>');
    }

    if (type == NotificationType.Critical) {
        $('#alertWrapper').prepend(divHtml);
    } else {
        $('#alertWrapper').append(divHtml);
    }

    var $messageDiv = $('#' + uniqueId);
    $messageDiv.show();

    if (messageStayTime && messageStayTime > 0) {
        setTimeout(function () {
            $messageDiv.remove();
        }, messageStayTime);
    }
}

function removeFooterNotification(hideInTime) {
    if (hideInTime) {
        setTimeout(function () {
            $('#alertWrapper').remove();
        }, (hideInTime));
    } else {
        $('#alertWrapper').remove();
    }
}

var changePasswordMethodType = {
    UserActivation: 1,
    ResetPassword: 2,
    ChangePassword: 3
}

function getUTCDate() {
    var d = new Date();
    return new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
}

function checkURLReachable(url) {
    // IE vs. standard XHR creation
    var x = new (window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP"),
        s;
    x.open(
      // requesting the headers is faster, and just enough
      "HEAD",
      // append a random string to the current hostname,
      // to make sure we're not hitting the cache
      url,
      // make a synchronous request
      false
    );
    try {
        x.send();
        s = x.status;
        // Make sure the server is reachable
        return (s >= 200 && s < 300 || s === 304);
        // catch network & other problems
    } catch (e) {
        return false;
    }
}