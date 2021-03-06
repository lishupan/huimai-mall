 //商品控制层 
app.controller('goodsController' ,function($scope,$controller   ,goodsService,itemCatService){
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

    //定义商品状态数组
    $scope.status=['未审核','审核通过','审核未通过','关闭'];

	//定义一个数组，存储全部的分类名称
	$scope.itemCatList=[];

	//定义一个读取全部分类数据方法
	$scope.getAllItemCat=function () {
		itemCatService.findAll().success(function (response) {
			for(var i=0;i<response.length;i++){
			$scope.itemCatList[response[i].id]=response[i].name;
			}
        })
    }
    
    //修改状态
	$scope.updateStatus=function (status) {
		goodsService.updateStatus($scope.selectIds,status).success(function (response) {
			if(response.success){
				alert(response.message);
				//清理要审核的id数组
				$scope.selectIds=[];
				//刷新待审核列表
				$scope.reloadList();
			}else {
				alert(response.message);
			}
        })
    }
    
});	