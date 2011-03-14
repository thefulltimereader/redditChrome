function resume(){
  if (!supports_html5_storage()) return null;
  json = localStorage.getItem("json");
  lastPage=localStorage.getItem("lastPage");
  lastTime = localStorage.getItem("lastTime");
  if (lastTime!= null && new Date().getTime() - lastTime < TIME)
  if(lastPage==null) lastPage = 0;
  else  lastPage = parseInt(lastPage);
  return {json:json, id:lastPage, time:lastTime};
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
  localStorage.setItem("json",json);
  return true;
}


$('a').click(function(){
    var time = new Date().getTime();
    var id = $('img .curr').attr('id');
    console.log('store id: ' + id + ')');
    localStorage.setItem('lastPage', id);
    localStorage.setItme('lastTime', time);
  });