$(document).ready(function () {

	/*!
	 * jQuery Cookiebar
	 * https://github.com/ninefour/cookiebar.js
	 *
	 * Copyright 2012, Nathan Pitman
	 */

	// For reading the cookie
	function cb_vis() {
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf("cb_vis=") == 0) return c.substring("cb_vis=".length,c.length);
		}
		return null;
	}
	
	// Cookie Policy URL (cp:url)
	var cb_policy = $("link[rel=cookie-policy]").attr("href");

	if (cb_policy) {
	
		// The markup for the cookie bar itself
		var cb_html = "<div id='cb'><p>This website uses cookies. You can <a href='" + cb_policy + "'>change your cookie settings</a> to disable them, if not we'll assume that you are happy to receive all cookies.</p><button title='Dismiss'><span>Dismiss</span></button></div>";
	
		// Get the offset of the body to pass to the cookiebar CSS below	
		var cb_offset = $('body').offset();
	
		// The CSS that's applied to the cookiebar (note the base64 encoded dismiss icon)
		var cb_css = "<style>#cb { margin-top: -" + cb_offset['top'] + "px; margin-left: -" + cb_offset['left'] + "px; margin-right: -" + cb_offset['left'] + "px; min-height: 34px; border-top: 1px solid #FFFFFF; border-bottom: 1px solid #CCCCCC; background-color: #EBEBEB; background-image:-moz-linear-gradient(50% 0% -90deg,rgb(236,236,236) 0%,rgb(225,225,225) 100%); background-image:-webkit-gradient(linear,50% 0%,50% 100%,color-stop(0, rgb(236,236,236)),color-stop(1, rgb(225,225,225))); background-image:-webkit-linear-gradient(-90deg,rgb(236,236,236) 0%,rgb(225,225,225) 100%); background-image:linear-gradient(-90deg,rgb(236,236,236) 0%,rgb(225,225,225) 100%); } #cb p { margin: 0 20px 0 0; padding: 10px; color: #000000; font-size: 12px; } @media (max-width: 480px) { #cb p { margin: 0 40px 0 0; } } #cb button { position: absolute; top: 10px; right: 10px; background-color: transparent; width: 15px; height: 15px; border: none; cursor: pointer; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAYAAAAkNenBAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAVdEVYdENyZWF0aW9uIFRpbWUAMTcvNi8xMmBTpuoAAARWSURBVGiB7ZrBceM4EEUfVXv3ZrDKwJ4IRhmMJwJRF+A42gy0EaznCFxERbByBpwM5AzsDKwItAeCEgg2QMoWKZdrfpXKFEE08MTuBth0djgc+AyaXHsCl9LnBMmyDGttYa3Nsyyj/lhrc2vtw7Um2UeZHyPW2gKYu68LrXVhjMmBtTu3UUrlY06wr0LXKr3jtTGm4AQRtn8oNUC01gWw8E7NveOFUqp460CBq7bcV/rULp1lWbd937XqDu5O+BAbrXX+nlQdsb1wP15L57p0K2s5A/Pg9Nydf5eEH2gt2Q0gAOYufqNqgAgG/M5ra21r0L4SII52fRhhDrWSMOEd+eodL7TWC5ox85W3q0y0rY0xeQKi00YrRowxa+CX77tugFul1N+9piwNVNnummhKyWSTjbXX8oI953yYzow5+hZFSPFdimY2X1fZa50B0wsCPuumcSydESfiOiNpdJA3BHsvmFFB3pF+Oxfj0dKvm0gKog7+5DWxNDzmHUntChZa66JHNovaGA3EbXcKoamRYhMwhVIqCjlqjAgw4johwCQhADgcDqN8fBljemUit5H8t888Rwv2ofV7Zf9o+g3y0fRpQBoFI2PMn8ASyIG/vKYXqvz/oJR6TRrsUYMyxkyBe/e5A26CS/bADtgCW631c8xWnXWPoxpj7t1kQ6PhALlSahu7IAVijLkDVsC3xBiSHoGV1noXNjRAHMR/Zxj+HoOJgRhjHoAfZ4wh6afWeumfOII4d3rmdCcWwIyg0khViql3pntgKrlZCOLsl8Dtewg8PQEzrfUrnEAmVDFxhHC70NxNHly5NNj/3Lh+SQ0AgbNVOttHTagCu9asPnAwC/e31R70i6nkshC1bgmKdROa2WnuSpvAcRcKiCVPv19LLiYkiD3whdMdT2njrt0LbbduDEBeR1oF60hhOyqXnaTA3lP59y5wX0m1S++oPEGC+WGtvQMZZBM+I7jvfX7BWivh3BHCs5tH7G58l+6AWUEF8hIz4N8ZYVC/31FusZPWiZm0Dgh2N0Fc1tfVMKG+WWunE5pPbKU3oYLT67dWO/JjK1SrtaRolvNgRIgeNu4vvo5Ya0viRYKuiUaVeL8C8OviK7u19pX0NudsmA4IgP0EQGu9Bb4jB1OjAwkIpxQEBCm+Sz0gAG6OWcvBTIF/aAfyizs/7YDoq14wPSEA+CMoPrxSpbPV2VO7sq71YNUrTnosmkcNAdIVZ2cFe0+Y/RAgrUXP05vSbw+Y3RAgsWSQhDDGFKkE0AGzHRMk+m9SXnbqymYxG5cHcYWCR6GpdLvihoQUK8K4vqVg91Ep9TxU1loJ524IYBLrRAPGg5AW2xUM8MbK+8eAWLFhT7WXW9K92G2o3KlEhviplFrCgCAAxpgdwzzqAjxpre/84sOQmlFVPS6tJ4Jnk0FBXMlmxmVhGuWgWoO6lq+hC3RjvgxdUlVEpNTcpUfgSwjha7Q74muIIvb/QhKbWIynJIkAAAAASUVORK5CYII=); background-position: 0 0; background-repeat: no-repeat; } @media (max-width: 480px) { #cb button { margin: 0; padding: 0; width: 30px; height: 30px; background-position: -20px 0; } } #cb button:hover { background-position: 0 -30px; } @media (max-width: 480px) { #cb button:hover { background-position: -20px -30px; } } #cb button span { display: none; }</style>";
	
		// Checks if the cookie exists, if not it renders the cookiebar
		if (!cb_vis()) {
			
			// Append/prepend the cookiebar CSS and content to the document
			$('head').append(cb_css);
			$('body').prepend(cb_html);
			
			// Write the cookie on click to hide the cookie bar
			$('#cb button').click(function() {
				var expires = 365 * 10;
				document.cookie = "cb_vis=0"+expires+"; path=/";
				$('#cb').toggle();
			});
	
		};
	
	} else {
		alert("You must specify a policy URL in your document head.");
	}	

});