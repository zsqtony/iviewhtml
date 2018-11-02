/**
 * Created by zhangshaoqiang on 2018/10/19.
 */
export default{
    menuobj:[
        {
            idx:'1',
            children:[
                {
                    title: '线路管理',
                    icon:'ios-apps',
                    num:'1',
                    children:[
                        {
                            title: '我的线路',
                            url: '/line/courselist',
                            num:'1-0'
                        },
                        {
                            title: '发布新线路',
                            url: '/line/addcourse',
                            num:'1-1'
                        }
                    ]
                },
                {
                    title: '平台线路库',
                    icon:'ios-megaphone',
                    num:'2',
                    children:[
                        {
                            title: '平台线路库',
                            num:'2-0',
                            url:'/line/commodity'
                        }
                    ]
                }
            ]
        },{
            idx:'2',
            children:[
                {
                    title: '订单管理',
                    icon:'ios-apps',
                    num:'1',
                    children:[
                        {
                            title: '订单列表',
                            url: '/order/orderlist',
                            num:'1-0'
                        },
                        {
                            title: '出行人列表',
                            url: '/order/travellist',
                            num:'1-1'
                        }
                    ]
                },
            ]
        },{
            idx:'3',
            children:[
                {
                    title: '出团管理',
                    icon: 'ios-apps',
                    num: '1',
                    children:[
                        {
                            title: '开新团',
                            url: '/group/newgroup',
                            num: '1-0'
                        },{
                            title: '出团列表',
                            url: '/group/grouolist',
                            num: '1-1'
                        }
                    ]
                }
            ]
        },{
            idx: '4',
            children:[
                {
                    title: '会员管理',
                    icon:'ios-apps',
                    num:'1',
                    children:[
                        {
                            title: '会员列表',
                            url:'/member/memberlist',
                            num: '1-0'
                        }
                    ]
                }
            ]
        }
    ]
}