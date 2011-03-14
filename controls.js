var maxW = 400;
var maxH = 500;
var minW = 300;
var TIME =12000000; //20min
var LIMIT = 20;
var currId = 0;
function start(){
  //Try if json exists in cache every 20min
  var last = resume();
  if (last.json == null){
    console.log('no local storage data');
    askReddit();
  }
  else{
    console.log('got json from local storage: ' + last.json);
    digestData(last);
  }
  setPage(last);
//  askReddit();
};

//fetch jsonfrom reddit pics
function askReddit(){
  /**
   * using jsonp to go around cross-domain issues
   */
  $.ajax({
    url:'http://www.reddit.com/r/pics/.json?limit=20&jsonp=?',
	dataType:'jsonp',
	success:function(json){
	saveData(json);
	digestData({json:json, id:0});
	     },
	error: function(xhr,status, errorThrown){
	console.error("error!" + errorThrown);
      }
    });
  
};

var digestData = function(data){
  var json = data.json;
  console.log("json request to reddit successful.");
    $.each(json.data.children, function(i, json){
	var post = {
	title: escape(json.data.title),
	redditUrl: "http://www.reddit.com" + json.data.permalink,
	originalSrc: json.data.url,
	nsf: json.data.nsf,
	visited: false,
	id: i,
	};
	output = "<li>"+
	  "<a href='" +post.redditUrl + "' title='"+post.title+"' target='_blank' id="+post.id+
">"+
	  "<img src='' id="+post.id+" class='clear'>"+
	  "</a></li>";
	$('section ul').append(output);
	$('li img').bind('load',function(){
	    imresize($(this).attr('id'));
	  });
	setImSrc(post);
      });
  /**
   * When all images finished loading..
   */
  $(window).load(function(){
      $('.loading').hide();
        console.log('start cycle from ' + data.id);
        startCycle(data.id);
	});
};

function startCycle(page){    //start colorbox
 $("section ul").cycle({
       timeout:0,
       startingSlide: page,
       after: setTitle,
       next: '#next',
       prev: '#prev'
       });
 //add bindings after they're made
 $('a').click(function(){
    save();
  });
};

function setTitle(curr, next, opts){
  var id = opts.currSlide ==opts.lastSlide? 0: opts.currSlide;
  id = opts.currSlide;
  currId = id;
  var title = unescape($("a[id='"+id+"']").attr('title'));
  console.log('use id:' +id + " and title: " + title);
  $('section h1').html(title);  
  resizeFrame(id);
}
 

var resizeFrame = function(id){
  var imgW =$('img[id="'+id+'"]').width();
  var imgH = $('img[id="'+id+'"]').height();
  console.log("set frame to -> w: " + imgW + " h: " + imgH);
  resizePanel({w: imgW, h:imgH});
}

// when the title is long it fucks everything up need to resize the panel s.t. panel = image height + title height
var resizePanel = function(size){
  $('section').css({width: size.w+2, height:size.h+$('header h1').height()+14}); 
  $('header h1').css({'width': size.w - 64 -5});
};


var KEYPREV = -1;
var KEYNEXT = 1;
$(document.documentElement).keyup(function(e){
    var dir = 0;
    switch(e.keyCode){
    case 37: //left
      dir = KEYPREV;
      break;
    case 39:
      dir = KEYNEXT;
      break;
    }
    if(dir!=0){
      console.log('key push!! prev or next');
	$("section ul").cycle(currId + dir);
    }
  });

function setPage(last){
  var msg = 'Your last visit was: '+new Date(parseInt(last.time)).toUTCString();
  if(last.time!=null)
    $('footer p').html(msg);
};


