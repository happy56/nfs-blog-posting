/*
	
*/
(function(w,d){
	"use strict";
	var no_of_img = 5,
		debra_id = 'debra',
		var_id = 'variable',
		grade_id = 'condition',
		loop_id = 'loop',
		inital_pic = 'frog green', 
		css = '#debra, #variable,#loop,#condition{margin:auto;width:600px;}#var_id{font-size:.75em;}.g{color:green;}.ip{margin:auto;padding:0 50px;}#debra input{font-size: 1.2em; height:50px; margin-top:10px; padding:10px; border-radius:5px;aline:cete} #debra .thumb, #loop .thumb{height:100px;width:100px;border-radius:5px;margin:5px; padding:0px;border:none;} #debra .v{visibility: visible;opacity: 1;transition: opacity 2s linear;} #debra .h{visibility: hidden;opacity: 0;transition: visibility 0s 1s, opacity 1s linear;display:none;}',
		flickr_url = 'http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&',
		cat_array,
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
		cat = function(ob){ //cat callback
			
			cat_array = ob.items;
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
		},
		image_search = function(tags, cb){
			if(typeof cb ==='undefined') {
				cb = 'icb';
			}
			var url = flickr_url+ 'jsoncallback=' + cb +'&tags='+tags,
			s = ce('script', '','', url);
			d.body.appendChild(s);
		},
		click = function(){
			image_search(ei('itext').value);
		},
		calculate = function(){
			var a = parseFloat(ei('input-a').value),
				b = parseFloat(ei('input-b').value),
				sum, multiplication;
				
				sum = a + b;
				multiplication = a * b;
				
				ei('sum').innerHTML = sum;
				ei('ml2').innerHTML = multiplication;
		},
		add_cat = function(e, no) {
			var fr = dfr(), 
				i,
			    img;
			    //console.log('hhhhhh addd');
			
			// check if object.items is not empty
			for (i = 0; i < no; i+=1) { 
				img = ce('img', 'timg-' + i, 'thumb v', cat_array[i].media.m);
				fr.appendChild(img);
			}
			ei(e).appendChild(fr);
		},
		calculate_greade = function(){
			var score = parseFloat(ei('score').value),
				result;
				//console.log('dddddddddddd');
			if  (score < 30) { result = ' F ' ;}
			else if ( score < 40) { result = ' E' ;}
			else if ( score < 50) { result = ' D' ;}
			else if ( score < 60) { result = ' C' ;}
			else if ( score < 80) { result = ' B' ;}
			else if ( score <=100) { result = ' A' ;}

			ei('scr').innerHTML = result;	
		},
		init2_variables = function(){
			var fr = dfr(), 
				out = ce('div','math'),
				text,
				in_a = ce('input', 'input-a'), 
				in_b = ce('input', 'input-b'); 

			in_a.onkeyup = in_b.onkeyup = calculate;
			fr.appendChild(out);
			text = ce('span','s-a');
			text.innerHTML = 'a = ';
			fr.appendChild(text);
			fr.appendChild(in_a);
			text = ce('span','s-b');
			text.innerHTML = '; <b class=g> // Input for a </b><br>b = ';
			fr.appendChild(text);
			fr.appendChild(in_b);

			text = ce('span','s-r');
			text.innerHTML = '; <b class=g> // Input for b </b> <br><br> sum = a + b; <br> print sum; <b class=g>// Ouput sum =  <span id="sum"> ?</span> </b><br><br> multiplication = a X b; <br> print multiplication; <b class=g> //Output multiplication =  <span id="ml2">?</span></b> <br>';
			fr.appendChild(text);
			

			ei(var_id).appendChild(fr);

			// greades 
			fr = dfr();
			in_a = ce('input', 'score');
			in_a.onkeyup = calculate_greade;
			text = ce('span','s-score');
			text.innerHTML = '<b class=g>// Input Your Score </b><br>Score = ';
			fr.appendChild(text);
			fr.appendChild(in_a);
			text = ce('span','sc-b');
			text.innerHTML = '; <br>  if ( score > 79){ greade = A;} <br> ... <br> print greade; <b class=g> // Output greade : <b id=scr>?</b>  </b> ';
			fr.appendChild(text);
			ei(grade_id).appendChild(fr);			


			// loop
			fr = dfr();
			in_a = ce('input', 'nloop');
			in_a.type = 'button';
			in_a.value = 'Give me One more cat!';

			in_a.onclick = function(e) {
				add_cat('ncat', 1);
			};

			fr.appendChild(in_a);

			text = ce('span','s-nloop');
			text.innerHTML = '<br> X = ';
			fr.appendChild(ce('div', 'ncat'));
			fr.appendChild(text);

			in_a = ce('input', 'txtloop');
			in_a.type = 'text';
			in_a.value = 10;
			fr.appendChild(in_a);

			in_a = ce('input', 'loop');
			in_a.type = 'button';
			in_a.value = 'Give me X number of cats!';
			in_a.onclick = function(e) {
				add_cat('catloop', ei('txtloop').value);
			};

			fr.appendChild(in_a);

			fr.appendChild(ce('div', 'catloop'));
			
			
			// cat_array
			ei(loop_id).appendChild(fr);
			image_search('cat','cat');	
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


			ei(debra_id).appendChild(fr);
			image_search(inital_pic);
			// end of debra
			init2_variables();
		};
	//init();
	w.icb = icb;
	w.cat = cat;
}(window, window.document));