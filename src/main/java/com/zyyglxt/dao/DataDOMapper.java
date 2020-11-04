package com.zyyglxt.dao;

import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DataDOMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_culpro_data
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int deleteByPrimaryKey(DataDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_culpro_data
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int insert(DataDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_culpro_data
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int insertSelective(DataDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_culpro_data
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    //DataDO selectByPrimaryKey(DataDOKey key);
    DataDO selectByPrimaryKey(@Param("key")DataDOKey key, @Param("dataType") String dataType);

    List<DataDO> selectByAllInf(String dataType);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_culpro_data
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKeySelective(DataDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_culpro_data
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKeyWithBLOBs(DataDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_culpro_data
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKey(DataDO record);

    List<DataDO> selectAll();

    List<DataDO> searchDataDO(String keyWord);
}