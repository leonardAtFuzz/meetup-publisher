
var baseURL = "https://portal-app.fuzzhq.com";

function grantAccess(){
         window.location.href = baseURL+"/grant_access?"
                           +"access_token="+ webix.storage.cookie.get('access_token') 
                           +"&location="+window.location.href;
}

function getMyGroups(){
    Get(baseURL+"/mygroups", function(data){
        console.log(data);
        $$('my_groups').parse(data);
    });
}

function getMyEvents(){
    Get(baseURL+"/myevents");
}

function setAllowGroups(e, id){
    webix.message("Set All Groups");
    Post(baseURL+"/publishgroups", this.getItems());
    return false;
}

function revokeAccess(){
    alert(baseURL+"/revoke_access");
}

function webixSignIn(){
    //using the functionality
    $$("main").showProgress({
       type:"icon",
       delay:3000
    });  

    var values = $$("sign_in_form").getValues();
    signIn(values, function(){ 
   webix.ajax("app.json", function(text){
        webix.ui(webix.DataDriver.json.toObject(text), $$('main'));
    }); 
    })                     
                            
}

function onMyGroupItemClicked(id, e ,node){
    $$("my_published_groups").add(this.getItem(id));
    this.remove(id);
}

function onMyPublishedGroupItemClicked(id, e ,node){
    $$("my_groups").add(this.getItem(id), 0);
    this.remove(id);
}