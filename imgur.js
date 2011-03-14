var IMGUR_API = 'http://api.imgur.com/2/image/';
/**
 * retrieve and set the image on the appropriate id.
 **/
function imgurRequest(post){
  var hash = post.originalSrc.match(/imgur\.com\/(.*)/)[1];
  var imurl = IMGUR_API + hash;
  $.ajax({
    url:imurl, 
	dataType: 'json',
	success:function(json){
	var result= json.image.links.original;
	console.log('inimgurR: ' + result);
	$('img[id='+post.id+']').attr('src', result);
      }, 
	error:function(xhr, txt, e){
	console.error("error request to: " + imrul+ " :"+e); 
      }
    });
}; 

function notAnImg(id){
  $('img[id='+id+']').attr('src', 'img/notanimg.gif');
  $('a[id='+id+']').prepend('<p>Not an image nor an imgur page!!</p>');
};


function setImSrc(post){
     if (!/\.jpg$|\.png$|\.gif$|\.jpeg$|\.bmp$/.test(post.originalSrc))   {
	      //url is not an image
	      if(post.originalSrc.search(/imgur/) == -1)
		notAnImg(post.id);
	      else{
		imgurRequest(post);
	      }
     }
     else{
       $('img[id='+post.id+']').attr('src', post.originalSrc);
     }
}



