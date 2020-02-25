var landingURL = 'http://localhost:55572';
var ndfAsiaURL = 'http://localhost:4854';
var mexicanSwapURL = 'http://localhost:4851';
var fxoURL = 'http://localhost:4855';
var rootURL = 'http://localhost:4854';
var middleOfficeURL = 'http://localhost:4866';
var latamURL = 'http://localhost:4858';
var ndfBrlURL = 'http://localhost:4856';
var excelVersion = '1.71';
var excelS3DownloadURL = 'https://s3.amazonaws.com/xps-test-only/DEV/XpExcelInstaller.application?v=' + excelVersion;
var baseS3DownloadURL = 'https://xps-test-db.s3.us-east-2.amazonaws.com/XpExcelPlugin/Demo/XpExcel/XPExcel_Install.exe?v=' + excelVersion;
var ndflS3DownloadURL = 'https://xps-test-db.s3.us-east-2.amazonaws.com/XpExcelPlugin/Demo/XpExcel_XpAsiaMaker_Addin/XpExcel_XpAsiaMaker_Addin_Install.exe?v=' + excelVersion;

var config = {
    //signalrPath: 'https://xpiuat.global/xpwebserver/signalr',
    //webApiServerUrl: 'https://xpiuat.global/xpwebservice',
    //signalrPath: 'https://demo.xpsecurities.com/xpwebserverjwt/signalr',
    //webApiServerUrl: 'https://demo.xpsecurities.com/xpwebservicejwt',
    signalrPath: 'http://wwwtest.vcmpartners.com/xpwebserver/signalr',
    webApiServerUrl: 'http://wwwtest.vcmpartners.com/xpwebservice',
    //signalrPath: 'http://localhost:4849/signalr',
    //webApiServerUrl: 'http://localhost:4848/',
    //signalrPath: 'http://beastdev3/xpwebserver/signalr',
    //webApiServerUrl: 'http://beastdev3/xpwebservice',
    //signalrPath: 'http://localhost:4849/signalr',
    //webApiServerUrl: 'http://localhost:4848/',
    clientUrl: landingURL,
    changePasswordUrl: landingURL + '/Views/ChangePassword.html',
    errorPageUrl: landingURL + '/Views/ErrorPage.html',
    resetPasswordUrl: landingURL + '/resetpassword.html',
    cookieExpiresInMinutes: 0,
    guestEmailAddress: 'guest@fintechglobal.center',
    browserTestGuestEmailAddress: 'guestuser@fintechglobal.center',
    chromversion: '> 64.0 ',
    firefoxversion: '> 60.0 ',
    safariversion: '> 10.0 ',
    edgeversion: '> 16.0 ',
    ieversion: '> 10.0 ',
    virtualDirectory: 'XpNDFWebClient',
    Product: 'Xp_Landing',
    clientType: 'Web',
    cookieDomain: '',
    isLocal: 1,
    isRunningLocal: true,
    EnablePermissionCheck: 1,
    IsHttpOnlyCookie: 0,
    ProductPermissionCheckTime: 60000,
    Environment: "",
    GCaptcha_SiteKey_V2: "6LeBJp0UAAAAAOR-riuMRE_trEaP-ncF_V97TR33",
    GCaptcha_SiteKey_V3: "6Lfc7p4UAAAAAJvkEzmmoT139A90PSIIXb6lCoNM",
    ProductId: 99999,
    IsCaptchaEnable: false,
    // if EnablePermissionCheck is 1 uncomment below
    ProductsMapping: [
      //Url#LogoURL#Display Text
      { ProductId: 7101, URL: ndfAsiaURL + '/Views/Home.html', ImageUrl: ndfAsiaURL + '/images/xp-logo.png', ProductName: 'ASIA FX', ProductCode: 'xpndfasia' },
      { ProductId: 1260, URL: mexicanSwapURL + '/Views/Home.html', ImageUrl: mexicanSwapURL + '/images/xp-logo.png', ProductName: 'TIIE SWAPS', ProductCode: 'xpmxnswap' },
      { ProductId: 7201, URL: fxoURL + '/Views/Home.html', ImageUrl: fxoURL + '/images/xp-logo.png', ProductName: 'EM FXO', ProductCode: 'xpfxo' },
      { ProductId: 11001, URL: middleOfficeURL + '/Views/Home.html', ImageUrl: middleOfficeURL + '/images/xp-logo.png', ProductName: 'APPSTORE', ProductCode: 'xpappstore' },
      { ProductId: 7104, URL: latamURL + '/Views/Home.html', ImageUrl: latamURL + '/images/xp-logo.png', ProductName: 'Latam FX', ProductCode: 'latamfx' },
      { ProductId: 7102, URL: ndfBrlURL + '/Views/Home.html', ImageUrl: ndfBrlURL + '/images/xp-logo.png', ProductName: 'Ndf Brl', ProductCode: 'xpndfbrl' }
    ],
    //till above

    //When EnablePermissionCheck is 0 uncomment below
    defaultProduct: ndfAsiaURL + '/Views/Home.html',
    
    RedirectionMapping: {
        'xpndfasia': ndfAsiaURL + '/Views/Home.html',
        'xpmxnswap': mexicanSwapURL + '/Views/Home.html',
        'xpappstore': middleOfficeURL + '/Views/Home.html',
        'xpfxo': fxoURL + '/Views/Home.html',
        'latamfx': latamURL + '/Views/Home.html',
    },
    LoadLastOpenProductDirectly: 0
};