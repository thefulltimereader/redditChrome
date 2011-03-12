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
	var title = escape(json.data.title);
	var imgSrc = (function(){
            var redditUrl = json.data.url;
	    if (!/\.jpg$|\.png$|\.gif$|\.jpeg$|\.bmp$/.test(redditUrl))   {
	      //url is not an image
	      if(redditUrl.search(/imgur/) == -1)
		return 'http://placekitten.com/g/400/300';
	      else{
		return imgurRequest(redditUrl);// 'http://placekitten.com/g/200/300'; 
	      }
	    }
	    return redditUrl;
	}());
	redditUrl = "http://www.reddit.com" + json.data.permalink;
	if (imgSrc=="") console.log(title);
	output = "<li>"+
	  "<a href='" +redditUrl + "' title='"+title+"' target='_blank'>"+
	  "<img src='" + imgSrc + "'>"+
	  "</a></li>";
	$('section ul').append(output);
      });
  $('.loading').hide();
  $('li img').bind('load',function(){imresize(this)});
  //  $('li img:last').bind('load',function(){console.log('start cycle');startCycle()});
  $(window).load(function(){console.log('start cycle');startCycle()});
  //  startCycle();
};

function startCycle(){    //start colorbox
 $("section ul").cycle({
     timeout:0,
       before: setTitle,
       //after: clean,
       next: '#next',
       prev: '#prev'
       });
}
function clean(){
  console.log("done, remove:"+$('.curr').html());
  $('.curr').removeClass("curr");
}

function setTitle(){
  $(this).addClass("curr");
  var title = unescape($(".curr a").attr('title'));
  $('section h1').html(title);  
  // resize();
  resizeFrame();
}
function imresize(img){
  var imgW =$(img).width();
  var imgH = $(img).height(); 
 console.log("set im for " + $(img).attr('src')+" w: " + imgW + " h: " + imgH);
  if (imgW > maxW || imgH > maxH){
    //console.log("need imresize for: " + $(img).attr('src')+"w: " + imgW + " h: " + imgH);
    if(maxH < imgH){
    $(img).height(maxH);
    var ratio = imgW/imgH;
    var ratioW = maxH*ratio;
    $(img).width(ratioW);
    }
    else{ //on width
    $(img).width(maxW);
    var ratio = imgH/imgW;
    var ratioH = maxW*ratio;
    $(img).height(ratioH);
    }
  }
  else{
    $(img).width(imgW);
    $(img).height(imgH);
  }
}
/*
var resize = function(){
  var imgW =$('.curr img').width();
  var imgH = $('.curr img').height();
    console.log("w: " + imgW + " h: " + imgH);
  if(imgW==0 || imgH ==0 || imgW == null){
    console.log("koreha..??" +$('.curr').html() + " ");
    //  if( $('.curr').html() != null)
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
}*/
var resizeFrame = function(){
  var imgW =$('.curr img').width();
  var imgH = $('.curr img').height();
  console.log("set frame to -> w: " + imgW + " h: " + imgH);
  resizePanel({w: imgW, h:imgH});
  
}
/**
 * Resize the panel s.t. the size of the image  = size + height of the header with the titles
 * when the title is long fucks everything up
 **/
var resizePanel = function(size){
  //  size.w < minW ? size.w = minW : console.log("safe") ;
  $('section').css({width: size.w, height:size.h+$('header h1').height()+13}); 
clean();
};


IMGUR_API = 'http://api.imgur.com/2/image/';
function imgurRequest(url){

  var hash = url.match(/imgur\.com\/(.*)/)[1];

  //return 'http://placekitten.com/g/300/200';
  var imurl = IMGUR_API + hash;
  var result = '';
  $.ajax({
    url:imurl, 
	async: false,
	dataType: 'json',
	success:function(json){
	   result= json.image.links.original;
	   console.log('inimgurR: ' + result);
	   return result;
	 }, 
	error:function(xhr, txt, e){
	   console.error("error request to: " + imrul+ " :"+e); 
	 }
    });
  return result;
  }; 
