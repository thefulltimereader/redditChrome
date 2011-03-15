var refeed=false;
function resume(){
  if (!supports_html5_storage()){
    refeed = true;
    return null;
  }
  json = localStorage.getItem("json");
  lastPage=localStorage.getItem("lastPage");
  lastTime = localStorage.getItem("lastTime");
  if (lastTime!= null && new Date().getTime() - lastTime < TIME){
    if(lastPage==null) lastPage = 0;
    else  lastPage = parseInt(lastPage);
    refeed = false;
    return {json:$.parseJSON(json), id:lastPage, time:lastTime};
  } 
  
  refeed = true;
  return {time:lastTime}; // need to do feed again
  
}

function supports_html5_storage(){
  try{
    return 'localStorage' in window && window['localStorage'] !== null;
  }catch(e){
    return false;
  }
}

function saveData(json){
  if (!supports_html5_storage()){return false;}
  localStorage.setItem("json", JSON.stringify(json));
  return true;
}


function save(){
  var time = new Date().getTime();
    localStorage.setItem('lastPage', currId);
    if(refeed) localStorage.setItem('lastTime', time);
    console.log('stored : ' + currId + ' and refeed was: '+refeed);
 
}

