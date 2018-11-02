/**
 * Created by zhangshaoqiang on 2018/11/1.
 */
/**
 * Created by zhangshaoqiang on 2018/10/27.
 */
export default{
    API_URL:'/api/agent/',
    JWTKEY:sessionStorage.userdata?JSON.parse(sessionStorage.userdata).jwt_token:'', //jwt参数
    EMAILE:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, //邮箱验证
    MOBILE:/^1[3|4|5|7|8][0-9]{9}$/, //手机号验证
    IDCARD:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证验证
    ENABLE:[
        {name: '禁用',id:'0'},
        {name: '启用',id:'1'},
    ],
    SORT_BY:[
        {name: '最新',id:'1'},
        {name: '价格低到高',id:'2'},
        {name: '价格高到低',id:'3'},
    ], //排序
    AGENTKEY:[ //代理商列表排序
        {name: '最新',id:'1'},
        {name: '收入降序',id:'2'},
        {name: '收入升序',id:'3'},
        {name: '收客降序',id:'4'},
        {name: '收客升序',id:'5'},
    ],
}