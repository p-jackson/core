

// PRIMITIVE HELPERS


var elm_lang$core$Native$List$toArray =
	function toArray(list)
	{
		var array = [];
		while (list.ctor !== '[]')
		{
			array.push(list._0);
			list = list._1;
		}
		return array;
	};


var elm_lang$core$Native$List$fromArray =
	function fromArray(array)
	{
		var list = Nil;
		for (var i = array.length; i--; )
		{
			list = Cons(array[i], list);
		}
		return list;
	};


var elm_lang$core$Native$List$range =
	function range(lo, hi)
	{
		var list = Nil;
		if (lo <= hi)
		{
			do
			{
				list = Cons(hi, list);
			}
			while (hi-- > lo);
		}
		return list;
	};


// FOLDS


var elm_lang$core$Native$List$foldr = F3(
	function foldr(f, b, list)
	{
		var arr = elm_lang$core$Native$List$toArray(list);
		var acc = b;
		for (var i = arr.length; i--; )
		{
			acc = A2(f, arr[i], acc);
		}
		return acc;
	}
);


var elm_lang$core$Native$List$take = F2(
	function take(n, list)
	{
		var array = [];
		while (list.ctor !== '[]' && n > 0)
		{
			array.push(list._0);
			list = list._1;
			--n;
		}
		return elm_lang$core$Native$List$fromArray(array);
	}
);


// MAPS


var elm_lang$core$Native$List$map2 = F3(
	function map2(f, xs, ys)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]')
		{
			arr.push(A2(f, xs._0, ys._0));
			xs = xs._1;
			ys = ys._1;
		}
		return elm_lang$core$Native$List$fromArray(arr);
	}
);


var elm_lang$core$Native$List$map3 = F4(
	function map3(f, xs, ys, zs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
		{
			arr.push(A3(f, xs._0, ys._0, zs._0));
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return elm_lang$core$Native$List$fromArray(arr);
	}
);


var elm_lang$core$Native$List$map4 = F5(
	function map4(f, ws, xs, ys, zs)
	{
		var arr = [];
		while (   ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return elm_lang$core$Native$List$fromArray(arr);
	}
);


var elm_lang$core$Native$List$map5 = F6(
	function map5(f, vs, ws, xs, ys, zs)
	{
		var arr = [];
		while (   vs.ctor !== '[]'
			   && ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
			vs = vs._1;
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return elm_lang$core$Native$List$fromArray(arr);
	}
);


// SORTING


var elm_lang$core$Native$List$sortBy = F2(
	function sortBy(toComparable, list)
	{
		return elm_lang$core$Native$List$fromArray(
			elm_lang$core$Native$List$toArray(list).sort(
				function(a, b)
				{
					return elm_lang$core$Native$Utils$cmp(toComparable(a), toComparable(b));
				}
			)
		);
	}
);


var elm_lang$core$Native$List$sortWith = F2(
	function sortWith(compare, list)
	{
		return elm_lang$core$Native$List$fromArray(
			elm_lang$core$Native$List$toArray(list).sort(
				function(a, b)
				{
					var ord = compare(a)(b).ctor;
					return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
				}
			)
		);
	}
);

