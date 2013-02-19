/*
	
*/
(function(w,d){
	"use strict";
	var no_of_img = 5,
		parent_id = 'debra',
		inital_pic = 'frog green', 
		css = '#debra{margin:auto;width:600px;}.ip{margin:auto;padding:0 50px;}#debra input{font-size: 1.2em; height:50px; margin-top:10px; padding:10px; border-radius:5px;aline:cete} #debra .thumb{height:100px;width:100px;border-radius:5px;margin:0 5px;} #debra .v{visibility: visible;opacity: 1;transition: opacity 2s linear;} #debra .h{visibility: hidden;opacity: 0;transition: visibility 0s 1s, opacity 1s linear;display:none;}',
		flickr_url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=icb&tagmode=any&format=json&',

		
		ei = function(e) {
			return d.getElementById(e);
		}, 

		ce = function(t, id, c, src) { 
			var b = d.createElement(t); // how the hell i got this ? 
			b.id = id;
			if(typeof c !== 'undefined'){
				b.setAttribute('class', c);
			}
			if(typeof src !== 'undefined'){
				b.src = src;	
			}
			return b;
		},
		dfr = function(){
			return d.createDocumentFragment();
		},
		icb = function(ob){
			var i, 
			    items = ob.items, 
			    fr = dfr(), 
			    img;
			
			// check if object.items is not empty
			for ( i = 0; i < no_of_img; i+=1) { 
				img = ce('img', 'timg-' + i, 'thumb v', items[i].media.m);
				fr.appendChild(img);
			}

			for ( i = 0; i < no_of_img; i+=1) {
				img = d.getElementById('timg-' + i);
				if(img!==null){
					img.setAttribute('class', 'h');
					img.id = '';
				}
			}
			//ei('output').innerHTML = '';
			ei('output').appendChild(fr);
			console.log(ob);
		},
		image_search = function(tags){
			var url = flickr_url + 'tags='+tags,
			s = ce('script', '','', url);
			d.body.appendChild(s);
		},
		click = function(){
			image_search(ei('itext').value);
		},
		init = function(){
			var fr = dfr(), 
				out = ce('div','output'),
				ip = ce('div','in', 'ip'),
				sty = ce('style', 'st'),
				btn = ce('input', 'btn'),
				itext = ce('input', 'itext');



			sty.innerHTML = css;
			fr.appendChild(sty);
			fr.appendChild(out);

			itext.type = 'text';
			itext.value = inital_pic;
			ip.appendChild(itext);

			btn.type = 'button';
			btn.value = ' ABRA-CA-DEBRA! ';
			btn.onclick = click;
			ip.appendChild(btn);
			fr.appendChild(ip);


			ei(parent_id).appendChild(fr);
			image_search(inital_pic);
		};

	init();
	
	//ei('output').innerHTML = 'take it!';
	
	w.icb = icb;
}(window, window.document));