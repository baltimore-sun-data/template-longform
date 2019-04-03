var app = app || {

	init: function(){
		app.share();

	},

	share: function(){

		$(".icon-twitter").on("click", function(){

			var tweet = ""; //Tweet text
			var url = "#"; //Interactive URL

			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

		$(".icon-facebook").on("click", function(){

			var picture = ""; //Picture URL
			var title = ""; //Post title
			var description = ""; //Post description
			var url = "#"; //Interactive URL

	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

	}
	
}

var gallery_app = gallery_app || {

	init: function(){

		gallery_app.open();
		gallery_app.close();
		gallery_app.arrow_events();
		gallery_app.update_caption(1);
		gallery_app.toggle_caption();

	},

	current_slide: 1,
	max_slides: 24,

	open: function(){

		$("btn.inline-media--pic__open-gallery").on("click", function(){
			$(".overlay, #gallery").addClass("is-visible");
		});

	},

	close: function(){

		$("#gallery").find("div.gallery__control--close").on("click", function(){
			$(".overlay, #gallery").removeClass("is-visible");
		});

		$("div.overlay").on("click", function(){
			$(".overlay, #gallery").removeClass("is-visible");
		});

	},

	arrow_events: function(){

		$("#gallery").find("div.gallery__control--slide").on("click", function(){
			gallery_app.update_slide($(this).data("dir"));
		});

	},

	update_slide: function(dir){

		//Increment, decrement or stay static depend on direction and limit
		if (dir === "left"){
			gallery_app.current_slide--;
		} else if (dir === "right") {
			gallery_app.current_slide++;
		}

		//Loop the slides
		if (gallery_app.current_slide < 1){
			gallery_app.current_slide = gallery_app.max_slides;
		} else if (gallery_app.current_slide > gallery_app.max_slides){
			gallery_app.current_slide = 1;
		}

		//Update the slider position
		var new_position = ((gallery_app.current_slide - 1) * -100) + "%";
		$("#gallery").find("div.gallery__photos").css("left",new_position);

		//Update current number indicator
		$("#gallery__current-img").text(gallery_app.current_slide);

		//Update progress bar
		var width = (gallery_app.current_slide - 1) * (100 / (gallery_app.max_slides - 1));
		$("#gallery").find("div.gallery__progress-bar").css("width",width+"%");

		//Update caption
		gallery_app.update_caption(gallery_app.current_slide);

	},

	toggle_caption: function(){

		$("#gallery").find("div.gallery__toggle-caption div").on("click", function(){

			//Update hide/show language
			$(this).parent().toggleClass("is-active");

			//Toggle caption visibility
			$("#gallery").find("div.gallery__caption").toggleClass("is-visible");

		});

	},

	update_caption: function(slide){

		$("#gallery").find("div.gallery__caption").html(gallery_app.captions[slide-1]);

	},

	captions: [""]

}





$(document).ready(function(){
	app.init();
	gallery_app.init();
});
