
function signIn(credentials, successCallback, errorCallback) {

    credentials.grant_type="password";
    credentials.client_id="812741506391";
    credentials.client_secret ="DgkRrHXmyu3KLd0KDdfq";
    
    $.ajax({
        url: 'https://scorecard.fuzzhq.com/authenticate',
        dataType: 'json',
        type: 'post',
        data: credentials,
        success: function(json, textStatus, jQxhr) {
            webix.storage.cookie.put('access_token', json.access_token);
            successCallback(json, textStatus, jQxhr);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(textStatus);
            errorCallback(jqXhr, textStatus, errorThrown);
        }
    });
}

function signOut() {
    Get("https://scorecard.fuzzhq.com/signout");
    webix.storage.cookie.remove('access_token');
    location.reload();
}

function Get(path, successCallback) {
    AJAX('get', path, {}, successCallback);
}


function Post(path, body) {
    AJAX('post', path, body);
}

function AJAX(verb, path, body, successCallback, errorCallback) {
    var bodyData = '';
    if( body && Object.keys(body).length > 0 ){
        console.log('body', body)
        bodyData = JSON.stringify(body);
    }
    
    console.log(body);
    console.log(bodyData);
    $.ajax({
        url: path,
        dataType: 'json',
        contentType: 'application/json',
        type: verb,
        headers: {
            'Authorization': 'Bearer ' + webix.storage.cookie.get('access_token')
        },
        data: bodyData,
        success: function(json, textStatus, jQxhr) {
            if( successCallback ){
                successCallback(json)
            }
        },
        error: function(jqXhr, textStatus, errorThrown) {
            if( errorCallback ){
            errorCallback(errorThrown);
            }
            console.log(textStatus);
        }
    });
}