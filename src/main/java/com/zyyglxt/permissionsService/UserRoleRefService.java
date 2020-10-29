package com.zyyglxt.permissionsService;

import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dataobject.UserRoleRefDOKey;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:51
 * @Version 1.0
 */
public interface UserRoleRefService {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int deleteByPrimaryKey(UserRoleRefDOKey key);


    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int insertSelective(UserRoleRefDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKeySelective(UserRoleRefDO record);

}
