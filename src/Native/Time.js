
// FRAMES PER SECOND

var elm_lang$core$Native$Time$fpsWhen = F2(function fpsWhen(desiredFPS, isOn)
{
	var msPerFrame = 1000 / desiredFPS;
	var ticker = elm_lang$core$Native$Signal$input('fps-' + desiredFPS, null);

	function notifyTicker()
	{
		elm_lang$core$Native$Runtime$instance.notify(ticker.id, null);
	}

	function firstArg(x, y)
	{
		return x;
	}

	// input fires either when isOn changes, or when ticker fires.
	// Its value is a tuple with the current timestamp, and the state of isOn
	var input = elm_lang$core$Signal$timestamp(
		A3(
			elm_lang$core$Signal$map2,
			F2(firstArg),
			elm_lang$core$Signal$dropRepeats(isOn),
			ticker
		)
	);

	var initialState = {
		isOn: false,
		time: elm_lang$core$Native$Runtime$instance.timer.programStart,
		delta: 0
	};

	var timeoutId;

	function update(input, state)
	{
		var currentTime = input._0;
		var isOn = input._1;
		var wasOn = state.isOn;
		var previousTime = state.time;

		if (isOn)
		{
			timeoutId = elm_lang$core$Native$Runtime$instance.setTimeout(notifyTicker, msPerFrame);
		}
		else if (wasOn)
		{
			clearTimeout(timeoutId);
		}

		return {
			isOn: isOn,
			time: currentTime,
			delta: (isOn && !wasOn) ? 0 : currentTime - previousTime
		};
	}

	return A2(
		elm_lang$core$Signal$map,
		function(state) { return state.delta; },
		A3(elm_lang$core$Signal$foldp, F2(update), update(input.value, initialState), input)
	);
});


// EVERY

var elm_lang$core$Native$Time$every = function every(t)
{
	var ticker = elm_lang$core$Native$Signal$input('every-' + t, null);
	function tellTime()
	{
		elm_lang$core$Native$Runtime$instance.notify(ticker.id, null);
	}
	var clock = A2(
		elm_lang$core$Signal$map,
		elm_lang$core$Basics$fst,
		elm_lang$core$Signal$timestamp(ticker)
	);
	setInterval(tellTime, t);
	return clock;
}
