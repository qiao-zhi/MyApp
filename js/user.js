	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				style:'circle',
				callback: pulldownRefresh
			},
			up: {
				auto:true,
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	
	var downPage = 1,upPage=1;//标记下拉、上滑动的页号
	
	var count = 0;
	function pullupRefresh() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');
			var newCount = cells.length>0?0:0;//首次加载20条，满屏
			for (var i = cells.length, len = i + newCount; i < len; i++) {
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
				table.appendChild(li);
			}
		}, 1500);
	}

	function addData() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for(var i = cells.length, len = i + 5; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
			//下拉刷新，新纪录插到最前面；
			table.insertBefore(li, table.firstChild);
		}
	}
	/**
	 * 下拉刷新具体业务实现
	 */
	function pulldownRefresh() {
		setTimeout(function() {
			addData();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			mui.toast("为你推荐了5篇文章");
		}, 1500);
	}