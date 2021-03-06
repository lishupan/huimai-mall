package com.huimai.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 分页结果封装类
 */
public class PageResult implements Serializable {

    //总记录数
    private long total;

    //当前页分页数据集合
    private List rows;

    public PageResult() {
    }

    public PageResult(long total, List rows) {
        this.total = total;
        this.rows = rows;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }
}
