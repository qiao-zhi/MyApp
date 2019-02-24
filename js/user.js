	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {//下拉刷新未实现
				style:'circle',
				callback: pulldownRefresh
			},
			up: {//上拉刷新实现
				auto:true,
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	
	var downPage = 0,upPage=0;//标记下拉、上滑动的页号
	var count = 0;
	
	function pullupRefresh() {
		setTimeout(function() {//将主要代码有个延迟是为了有个缓冲的过程，当然可以不延迟，显示效果不太好
			upPage++;
			mui.post(appServerAddressPrefix+"/mobile/user/getUsers.html",{"pageNum":upPage},function(res){
				//1.添加数据
				addData(res.list,res.isFirstPage);
				
				//2.刷新数据,如果是最后一页停止加载加载事件
				/*if(res.isLastPage){//刷新数据，如果是最后一页就停止上滑刷新事件
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);	
				}else{
					mui('#pullrefresh').pullRefresh().endPullupToRefresh();
				}*/
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(res.isLastPage);
			},'json');
		}, 1500);
	}

	function addData(datas,isfirstpage) {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for(var i = cells.length, len = i + datas.length; i < len; i++) {
			var li = document.createElement('li');
			var user = datas[i-cells.length];
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right">'+user.username +'  '+user.sex+ '</a>';
			//下拉刷新，新纪录插到最前面；
			table.insertBefore(li, table.firstChild);
		}
		if(!isfirstpage){//如果不是第一页就提示加载 了数据
			mui.toast("为你加载了"+datas.length+"条数据！");
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