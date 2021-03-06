 //商品类目控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			serviceObject=itemCatService.add( $scope.entity  );//增加 
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
		itemCatService.dele( $scope.selectIds ).success(
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
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}

	//读取父级分类对应的分类集合
	$scope.findByParentId=function (parentId) {
		itemCatService.findByParentId(parentId).success(function (response) {
			$scope.list=response;
        })
    }

    //设置一个变量，记录当前所在分类级别  1、2、3

	$scope.grade=1;

	//设置分类级别方法
	$scope.setGrade=function (value) {
		$scope.grade=value;
    }

    //设置导航条方法
	$scope.selectList=function (p_entity) {
		//判断当前分类级别如果等于1，二级分类、三级分类导航条无数据
		if($scope.grade==1){
			$scope.entity_1=null;
			$scope.entity_2=null;
		}
		//判断当前分类等于2，二级分类有数据，三级分类无数据
		if($scope.grade==2){
            $scope.entity_1=p_entity;
            $scope.entity_2=null;
		}
		//判断当前分类等于3，二级分类有数据，三级分类有数据
		if($scope.grade==3){
            $scope.entity_2=p_entity;
		}

		//根据父级分类id，获取分类数据集合
		$scope.findByParentId(p_entity.id);
    }
    
});	