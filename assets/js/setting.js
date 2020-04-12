$(function(){
    var cw = window.screen.availWidth;//document.documentElement.clientWidth;
    if(cw<1200){
      //  if(cw<375){
            document.documentElement.style.fontSize = cw*50/320 +'px';//cw*(window.devicePixelRatio||1) / + 'px';
        // }else{
        //     document.documentElement.style.fontSize = '50px';
        // }
      //  alert(cw+','+window.devicePixelRatio)       
        
    }else{
        document.documentElement.style.fontSize = cw * 100 / 1920 + 'px';
    }

    prealoader();
    toggleNav()
    AOS.init({
        duration: 1200,
      })
})
/**|
 * 预加载动画
 */
function prealoader() {
    if($('.preloader').length){
        // $('.preloader').delay(2000).fadeOut(500);
         $('.preloader').fadeOut(500);
    }
}
/**
 * 导航点击
 */
function toggleNav(){
    var navBtn = $(".page-nav-btn"),
    pageNavXs = $(".page-nav-xs");
    if(navBtn.length>0){
        navBtn.click(function(){
            if(pageNavXs.is(":hidden")){
                pageNavXs.slideDown();
            }else{
                pageNavXs.slideUp();
            }
        })
    }
}
$.ajaxGetList = function(url,data,totalSize,pageSize,isInit,callback){
	this.ajaxFunc = function(pageNum){
		$.ajax({
        	url:url+"?pageNum="+pageNum,
        	type:"get",
        	dataType:"json",
        	data:data,
        	success:function(result){
        		if(result.msg=='ok'){
        			 callback(eval('('+result.list+')'));            		
        		}else{
        			alert("没有更多啦(^v^)");
        		}
        		
        	},error:function(){
        		alert("系统错误");
        	}
        });
	};
	var _that = this;
	this.init = function(){
		_that.ajaxFunc(0);
		$('.list-pagi').pagination({
	        totalData:totalSize,
	        showData:pageSize,
	        coping:true,
	        prevContent:'<span class="iconfont icon-angle-left"></span>',
	        nextContent:'<span class="iconfont icon-angle-right"></span>',
	        callback:function(api){
	            console.log(api.getCurrent());//当前页码
	            var nowPage = api.getCurrent();
	            //ajax数据回传
	            _that.ajaxFunc(nowPage-1);
	        }
	    });
	};
	var pageNum = 0;
	this.skipNextPage = function(){
		_that.ajaxFunc(0);
		var pageTotal = Math.ceil(totalSize/pageSize);
		$(".next-btn").on('click',function(){
			++pageNum;
			if(pageNum<pageTotal){
				_that.ajaxFunc(pageNum);
			}else{
				$(this).html("~没有下一页了~");
			}
			
		});
	};
	if(isInit){
		this.init();
	}else{
		this.skipNextPage();
	}
	
};
