function imresize(id){
  var imgW =$('img[id="'+id+'"]').width();
  var imgH = $('img[id="'+id+'"]').height(); 
  //console.log("set im for id: " + id+" w: " + imgW + " h: " + imgH);
  if (imgW > maxW || imgH > maxH){
    //console.log("need imresize for: " + $('img[id="'+id+'"]').attr('src')+"w: " + imgW + " h: " + imgH);
    if(maxH < imgH){
    $('img[id="'+id+'"]').height(maxH);
    var ratio = imgW/imgH;
    var ratioW = maxH*ratio;
    $('img[id="'+id+'"]').width(ratioW);
    }
    else{ //on width
    $('img[id="'+id+'"]').width(maxW);
    var ratio = imgH/imgW;
    var ratioH = maxW*ratio;
    $('img[id="'+id+'"]').height(ratioH);
    }
  }
  else{
    $('img[id="'+id+'"]').width(imgW);
    $('img[id="'+id+'"]').height(imgH);
  }
}
