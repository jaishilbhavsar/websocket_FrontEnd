function include(file) { 
  
    var script  = document.createElement('script'); 
    script.src  = file; 
    script.type = 'text/javascript'; 
    script.defer = true; 
    
    document.getElementsByTagName('head').item(0).appendChild(script); 
    
  }
//   include('../websocket_FrontEnd/shared/config.js');
//   include('../websocket_FrontEnd/shared/TBACommon.js');
include('./shared/config.js');
include('./shared/TBACommon.js');
  async function ValidateUser(userName,password,isOldSessionExist,captachCode,isCaptchaV2){
    var loginParameters = {
        ClientType: config.clientType,
        ClientVersion: detectBrowser().toString(),
        userName: userName,
        password: password,
        RequestTime: getCurrentEpochTime(),
        TransactionId: getGuid(),
        HostUrl: config.clientUrl,
        IsOldSessionExist: isOldSessionExist,
        CapchaCode: captachCode,
        IsCaptchaV2: isCaptchaV2
    };
    let urlString=config.webApiServerUrl + '/api/User/Signin/';
    var url = new URL(urlString);
    console.log(url);
    // Object.keys(loginParameters).forEach(key => url.searchParams.append(key, params[key]))
    for (const iterator in loginParameters) {
        url.searchParams.append(iterator,loginParameters[iterator]);
    }
    console.log(url);
    fetch(url).then((resp) => resp.json())
    .then(function(data) {
        console.log(data);
        if(data.IsSuccess){
            localStorage.setItem('Token',data.Data);
            return true;
        }
        else{
            return false;
        }
    }).then(()=>{
        location.href="http://localhost:8080/client.html";
    });
  }