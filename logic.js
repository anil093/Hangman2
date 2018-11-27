window.onload = function() {
	var alphabet = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	];

	var categories;
	var Selectedcatagory;
	var Selectedword;
	var guess;
	var geusses = [];
	var lives;
	var correctgeusses;
	var Numberofspacesinword;

	var howmanyliveleft = document.getElementById('mylives');
	var whatistheClue = document.getElementById('clue');

	var playbuttons = function() {
		hangamnButtons = document.getElementById('buttons');
		letters = document.createElement('ul');

		for (var i = 0; i < alphabet.length; i++) {
			letters.id = 'alphabet';
			list = document.createElement('li');
			list.id = 'letter';
			list.innerHTML = alphabet[i];
			check();
			hangamnButtons.appendChild(letters);
			letters.appendChild(list);
		}
	};

	var selectCat = function() {
		if (Selectedcatagory === categories[0]) {
			catagoryName.innerHTML = 'The Chosen Category Is Premier League Football Teams';
		} else if (Selectedcatagory === categories[1]) {
			catagoryName.innerHTML = 'The Chosen Category Is Films';
		} else if (Selectedcatagory === categories[2]) {
			catagoryName.innerHTML = 'The Chosen Category Is Cities';
		}
	};

	result = function() {
		wordHolder = document.getElementById('hold');
		correct = document.createElement('ul');

		for (var i = 0; i < Selectedword.length; i++) {
			correct.setAttribute('id', 'my-word');

			guess = document.createElement('li');
			guess.setAttribute('class', 'guess');
			if (Selectedword[i] === '-') {
				guess.innerHTML = '-';
				Numberofspacesinword = 1;
			} else {
				guess.innerHTML = '_';
			}

			geusses.push(guess);
			wordHolder.appendChild(correct);
			correct.appendChild(guess);
		}
	};

	Showlives = function() {
		howmanyliveleft.innerHTML = 'I am Gonna Die Only ' + lives + ' lives';
		if (lives < 1) {
			howmanyliveleft.innerHTML = 'Game Over Loser! Hard Luck';
		}
		for (var i = 0; i < geusses.length; i++) {
			if (correctgeusses + Numberofspacesinword === geusses.length) {
				howmanyliveleft.innerHTML = ' You won Congrats!';
			}
		}
	};

	var drawman = function() {
		var drawMe = lives;
		drawArray[drawMe]();
	};

	canvas = function() {
		myStickman = document.getElementById('Hangman');
		context = myStickman.getContext('2d');
		context.beginPath();
		context.strokeStyle = '#fff';
		context.lineWidth = 2;
	};

	head = function() {
		myStickman = document.getElementById('Hangman');
		context = myStickman.getContext('2d');
		context.beginPath();
		context.arc(60, 25, 10, 0, Math.PI * 2, true);
		context.stroke();
	};

	draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
		context.moveTo($pathFromx, $pathFromy);
		context.lineTo($pathTox, $pathToy);
		context.stroke();
	};

	belowline = function() {
		draw(0, 150, 150, 150);
	};

	aboveline = function() {
		draw(10, 0, 10, 600);
	};

	leftline = function() {
		draw(0, 5, 70, 5);
	};

	rigthline = function() {
		draw(60, 5, 60, 15);
	};

	torso = function() {
		draw(60, 36, 60, 70);
	};

	rightArm = function() {
		draw(60, 46, 100, 50);
	};

	leftArm = function() {
		draw(60, 46, 20, 50);
	};

	rightLeg = function() {
		draw(60, 70, 100, 100);
	};

	leftLeg = function() {
		draw(60, 70, 20, 100);
	};

	drawArray = [ rightLeg, leftLeg, rightArm, leftArm, torso, head, belowline, aboveline, leftline, rigthline ];

	check = function() {
		list.onclick = function() {
			var geuss = this.innerHTML;
			this.setAttribute('class', 'active');
			this.onclick = null;
			for (var i = 0; i < Selectedword.length; i++) {
				if (Selectedword[i] === geuss) {
					geusses[i].innerHTML = geuss;
					correctgeusses += 1;
				}
			}
			var j = Selectedword.indexOf(geuss);
			if (j === -1) {
				lives -= 1;
				Showlives();
				drawman();
			} else {
				Showlives();
			}
		};
	};

	play = function() {
		categories = [
			[ 'everton', 'liverpool', 'swansea', 'chelsea', 'hull', 'manchester-city', 'newcastle-united' ],
			[ 'alien', 'dirty-harry', 'gladiator', 'finding-nemo', 'jaws' ],
			[ 'manchester', 'milan', 'madrid', 'amsterdam', 'prague' ]
		];

		Selectedcatagory = categories[Math.floor(Math.random() * categories.length)];
		Selectedword = Selectedcatagory[Math.floor(Math.random() * Selectedcatagory.length)];
		Selectedword = Selectedword.replace(/\s/g, '-');
		console.log(Selectedword);
		playbuttons();

		geusses = [];
		lives = 10;
		correctgeusses = 0;
		Numberofspacesinword = 0;
		result();
		Showlives();
		selectCat();
		canvas();
	};

	play();

	hint.onclick = function() {
		hints = [
			[
				'Based in Mersyside',
				'Based in Mersyside',
				'First Welsh team to reach the Premier Leauge',
				'Owned by A russian Billionaire',
				'Once managed by Phil Brown',
				'2013 FA Cup runners up',
				"Gazza's first club"
			],
			[
				'Science-Fiction horror film',
				'1971 American action film',
				'Historical drama',
				'Anamated Fish',
				'Giant great white shark'
			],
			[
				'Northern city in the UK',
				'Home of AC and Inter',
				'Spanish capital',
				'Netherlands capital',
				'Czech Republic capital'
			]
		];

		var catagoryIndex = categories.indexOf(Selectedcatagory);
		var hintIndex = Selectedcatagory.indexOf(Selectedword);
		whatistheClue.innerHTML = 'Clue: - ' + hints[catagoryIndex][hintIndex];
	};

	document.getElementById('reset').onclick = function() {
		correct.parentNode.removeChild(correct);
		letters.parentNode.removeChild(letters);
		whatistheClue.innerHTML = '';
		context.clearRect(0, 0, 400, 400);
		play();
	};
};
