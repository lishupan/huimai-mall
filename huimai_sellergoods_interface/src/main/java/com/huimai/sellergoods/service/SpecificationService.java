package com.huimai.sellergoods.service;

import com.huimai.entity.PageResult;
import com.huimai.group.Specification;
import com.huimai.pojo.TbSpecification;

import java.util.List;
import java.util.Map;

/**
 * 规格服务层接口
 * @author Administrator
 *
 */
public interface SpecificationService {

	/**
	 * 返回全部列表
	 * @return
	 */
	public List<TbSpecification> findAll();
	
	
	/**
	 * 返回分页列表
	 * @return
	 */
	public PageResult findPage(int pageNum, int pageSize);


	/**
	 * 增加
	*/
	public void add(Specification specification);


	/**
	 * 修改
	 */
	public void update(Specification specification);


	/**
	 * 根据ID获取实体
	 * @param id
	 * @return
	 */
	public Specification findOne(Long id);


	/**
	 * 批量删除
	 * @param ids
	 */
	public void delete(Long[] ids);

	/**
	 * 分页
	 * @param pageNum 当前页 码
	 * @param pageSize 每页记录数
	 * @return
	 */
	public PageResult findPage(TbSpecification specification, int pageNum, int pageSize);


	//读取规格下拉菜单数据
	public List<Map> selectOptionList();
}
