

var elm_lang$core$Native$Mouse$position = function()
{
	var position = elm_lang$core$Native$Signal.input(
		'Mouse.position',
		elm_lang$core$Native$Utils$Tuple2(0, 0)
	);

	elm_lang$core$Native$Runtime$instance.addListener(
		[position.id],
		elm_lang$core$Native$Runtime$instance.rootNode,
		'mousemove',
		function move(e)
		{
			elm_lang$core$Native$Runtime$instance.notify(position.id, elm_lang$core$Native$Utils$getXY(e));
		}
	);

	return position;
}();


var elm_lang$core$Native$Mouse$isDown = function()
{
	var isDown = elm_lang$core$Native$Signal.input('Mouse.isDown', false);

	elm_lang$core$Native$Runtime$instance.addListener(
		[isDown.id],
		elm_lang$core$Native$Runtime$instance.rootNode,
		'mousedown',
		function down()
		{
			elm_lang$core$Native$Runtime$instance.notify(isDown.id, true);
		}
	);

	elm_lang$core$Native$Runtime$instance.addListener(
		[isDown.id],
		elm_lang$core$Native$Runtime$instance.rootNode,
		'mouseup',
		function up()
		{
			elm_lang$core$Native$Runtime$instance.notify(isDown.id, false);
		}
	);

	return isDown
}();


var elm_lang$core$Native$Mouse$clicks = function()
{
	var clicks = elm_lang$core$Native$Signal.input('Mouse.clicks', elm_lang$core$Native$Utils$Tuple0);

	elm_lang$core$Native$Runtime$instance.addListener(
		[clicks.id],
		elm_lang$core$Native$Runtime$instance.rootNode,
		'click',
		function click()
		{
			elm_lang$core$Native$Runtime$instance.notify(clicks.id, elm_lang$core$Native$Utils$Tuple0);
		}
	);

	return clicks;
}();