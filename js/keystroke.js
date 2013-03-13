$(document).ready(function() {
	var keys = [
		{ k: 'Q', w: '1.5' },
		{ k: 'W', w: '1.25' },
		{ k: 'E', w: '1.25' },
		{ k: 'R', w: '1' },
		{ k: 'T', w: '0.75' },
		{ k: 'Z', w: '0.75' },
		{ k: 'U', w: '1' },
		{ k: 'I', w: '1.25' },
		{ k: 'O', w: '1.25' },
		{ k: 'P', w: '1.5' },

		{ k: 'A', w: '1.5' },
		{ k: 'S', w: '1.25' },
		{ k: 'D', w: '1.25' },
		{ k: 'F', w: '1' },
		{ k: 'G', w: '0' },
		{ k: 'H', w: '1' },
		{ k: 'J', w: '1.25' },
		{ k: 'K', w: '1.25' },
		{ k: 'L', w: '1.5' },

		{ k: 'Y', w: '1.5' },
		{ k: 'X', w: '1.25' },
		{ k: 'C', w: '1' },
		{ k: 'V', w: '0.75' },
		{ k: 'B', w: '1' },
		{ k: 'N', w: '1.25' },
		{ k: 'M', w: '1.5' }
	];

	var keyCodes = {
		A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
		H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
		O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85,
		V: 86, W: 87, X: 88, Y: 89, Z: 90
	};

	var leftKeys = ['Q', 'W', 'E', 'R', 'T', 'A', 'S', 'D', 'F', 'G', 'Y', 'X', 'C', 'V'];
	var rightKeys = ['Z', 'U', 'I', 'O', 'P', 'H', 'J', 'K', 'L', 'B', 'N', 'M'];

	var e = 'left';

	for (var i in keys) {
		if (keys.hasOwnProperty(i)) {
			var c = keys[i];
			
			if (inArray(c.k, rightKeys)) {
				e = 'right';
			}

			if (inArray(c.k, leftKeys)) {
				e = 'left';
			}

			$('#layout #' + e).append('<div class="char k' + c.k + '" data-weight="' + c.w + '" data-char="' + c.k + '" data-keycode="' + keyCodes[c.k] + '">' + c.k + '</div>');
			$('#layout #' + e + ' .k' + c.k).delay(i * 50).animate({ opacity: 1 });
		}
	}

	var weightLeft = 0;
	var weightRight = 0;
	finish = false;

	$(window).keyup(function(e) {
		/** 189 = MINUS */
		if (e.keyCode == 189) {
			finish = false;
			self.location.reload();
		} else if (e.keyCode >= 65 && e.keyCode <= 90 && !finish) {
			var keyElement = $('#layout .char[data-keycode=' + e.keyCode + ']');
			
			console.log(keyElement.css('font-size'));

			if (parseFloat(keyElement.css('font-size').replace('px', '')) < 256) {
				keyElement.css({
					fontSize: parseFloat(parseFloat(keyElement.css('font-size').replace('px', '')) + 5.5) + 'px'
				});

				var weight = keyElement.attr('data-weight');
				var currRotate = keyElement.css('transform').replace('rotate', '');
				console.log(currRotate);

				if (inArray(keyElement.attr('data-char'), leftKeys)) {
					weightLeft += parseFloat(weight);
				} else {
					weightRight += parseFloat(weight);
				}

				var weightRotate = weightRight - weightLeft;

				if (weightRotate <= -90 || weightRotate >= 90) {
					$('#layout').html('<h1>Your ship turned over.</h1>').delay(1000).animate({
						marginTop: '10000px'
					}, {
						duration: 5000,
						easing: 'easeInOutExpo'
					});

					finish = true;
					return false;
				}
				

				console.log('weight left: ' + weightLeft + ', weight right: ' + weightRight + ', rotate:' + weightRotate);

				$('#layout').css({
					'-webkit-transform': 'rotate(' + weightRotate + 'deg)',
					'-moz-transform': 'rotate(' + weightRotate + 'deg)',
					'-ms-transform': 'rotate(' + weightRotate + 'deg)',
					'transform': 'rotate(' + weightRotate + 'deg)'
				});
			}
		}
	});
});

function inArray(searchFor, arr) {
	for (var i in arr) {
		if (arr[i] == searchFor) return true;
	}

	return false;
}