var maxW = 400;
var maxH = 500;
var minW = 300;
//fetches and decomposes json feed from reddit pics
/**
 * using jsonp to go around cross-domain issues
 */
$.ajax({
  url:'http://www.reddit.com/r/pics/.json?limit=25&jsonp=?',
  dataType:'jsonp',
      success:function(json){digestData(json)},
  error: function(xhr,status, errorThrown){
    console.error("error!" + errorThrown);
    }
  }    
);


var digestData = function(json){
  console.log("json request successful.");
    $.each(json.data.children, function(i, json){
	title = escape(json.data.title);
	     imgSrc = json.data.url;
	     redditUrl = "http://www.reddit.com" + json.data.permalink;
	     output = "<li>"+
"<a href='" +redditUrl + "' title='"+title+"' target='_blank'>"+
"<img src='" + imgSrc + "'>"+
"</a></li>";
	     $('section ul').append(output);
      });
    $('.loading').hide();
    startCycle();
};

function startCycle(){    //start colorbox
 $("section ul").cycle({
     timeout:0,
       before: setTitle,
       //       after: clean,
       next: '#next',
       prev: '#prev'
       });
}
function clean(){
  $('.curr').removeClass("curr");
  console.log("done, remove:"+this);
}

function setTitle(){
  $(this).addClass("curr");
  var title = unescape($(".curr a").attr('title'));
  $('section h1').html(title);  
  resize();

}

var resize = function(){
  var imgW =$('.curr img').width();
  var imgH = $('.curr img').height();
    console.log("w: " + imgW + " h: " + imgH);
  if(imgW==0 || imgH ==0 || imgW == null){
    setTimeout(resize,250);
  }
  else if (imgW > maxW || imgH > maxH){
    console.log('imresize');
    $('.curr img').height(maxH);
    var ratio = imgW/imgH;
    var ratioW = maxH*ratio;
    $('.curr img').width(ratioW);
    resizePanel({w: ratioW, h:maxH});
    clean();
  }
  else{
    resizePanel({w: imgW, h:imgH});
    clean();
  }
}
var resizePanel = function(size){
  size.w < minW ? size.w = minW : console.log("safe") ;
  $('section').css({width: size.w, height:size.h+20}); 
};
