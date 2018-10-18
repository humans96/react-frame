import { observer, inject } from "mobx-react";
import React from 'react';
import { hashHistory, Link } from 'react-router';
import { Layout, Menu, Dropdown, Icon, Button, Avatar, Popover } from 'antd';


const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const breadcrumbMapping = {
    '/':[{url:'/',desc:'Dashbord' }],
    '/launch':[ {desc:'监控' }, {url:'/launch',desc:'当前投放' }],
    '/novice':[ {desc:'监控' }, {url:'/novice',desc:'小白营' }],
    '/marketClass':[ {desc:'监控' }, {url:'/marketClass',desc:'当前主营班级' }],
    '/jurisdiction':[ {url:'/jurisdiction',desc:'权限管理' }]
}

// @inject(['dashbord'])
@observer
class Index extends React.Component {

    state = {
        collapsed: false,
        message: '',
        current: null
    }

    componentDidMount() {
        this.setState({
            current: [location.hash.slice(1)],
            message: this.time()
        });
    }

    time() {
        var myDate = new Date();
        let hours = myDate.getHours();
        if(hours < 6) {
            return "凌晨好！";
        }
        else if (hours < 10){return "早上好！"}
        else if (hours < 12){return "上午好！"}
        else if (hours < 14){return "中午好！"}
        else if (hours < 17){return "下午好！"}
        else if (hours < 19){return "傍晚好！"}
        else if (hours < 22){return "晚上好！"}
        else {return "夜里好！"}
    }

    handleClick = (e) => {
        this.setState({
            current: [e.key]
        });
        if(location.hash.slice(1)!=e.key) {
            hashHistory.push(e.key);
        }
    }
    toHome = ()=> {
        this.setState({
            current: ['/']
        });
        hashHistory.push('/');
    }
    loginOut() {
        $.removeCookie('token');
        $.removeCookie('user_name');
        $.removeCookie('user_id');
        hashHistory.push('/login');
    }
    collapse = ( broken ) => { 
        this.setState({
            collapsed: broken
        });
    }
    render() {
        const menuList = (
            <Menu>
                <Menu.Item key="0" onClick={this.loginOut}>
                    退出
                </Menu.Item>
            </Menu>
        );
        return (
        <Layout className='main' style={{height:'100vh', background: '#fff'}}>
            <Sider
            breakpoint="lg"
            onBreakpoint={this.collapse}
            width='240'
            style={{ background: '#343a40' }}
            >
                <div className="logo" onClick={this.toHome}>
                    <div>
                        <img src="images/rocket.svg"/>
                        {!this.state.collapsed ? <span style={{fontSize:'20px'}}>投放系统</span> : null}
                    </div>
                </div>
                
                <Menu theme="dark" mode="inline" inlineCollapsed={this.state.collapsed} inlineIndent={20} defaultOpenKeys={['Monitor', 'statement']} selectedKeys={this.state.current} onClick={this.handleClick}>
                    <Menu.Item key="/">
                        <Icon type="home" theme="filled" />
                        <span>主页</span>
                        {/* <span style={{ float:'right' }}><i onClick={() => this.refreshData()} className="iconfont icon-htmal5icon23" style={{ fontSize:'20px', fontWeight:'100' }}></i></span> */}
                    </Menu.Item>
                    <SubMenu className="secondly-menu" key="Monitor" title={<span><i className="iconfont icon-jiankongkongzhiguanlijianguan" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>{this.state.collapsed ? '': '监控'}</span>}>
                        <Menu.Item key="/launch">
                            <i className="iconfont icon-lendmoney" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>
                            当前投放任务
                        </Menu.Item>
                        <Menu.Item key="/novice"><i className="iconfont icon-students1146686easyiconnet" style={{ fontSize:'17px', marginRight:'8px', marginLeft:'-3px' }}></i>小白营</Menu.Item>
                        <Menu.Item key="/marketClass"><i className="iconfont icon-xuexiaoweishengfuzhi" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>当前主营班级</Menu.Item>
                        {/* <Menu.Item key="4"><i className="iconfont icon-notes" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>数据周报展示</Menu.Item> */}
                    </SubMenu>
                    <Menu.Item key="11">
                        <i className="iconfont icon-baojing" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>
                        {this.state.collapsed ? '': '数据预警'}
                    </Menu.Item>
                    <SubMenu className="secondly-menu" key="statement" title={<span><i className="iconfont icon-notebook" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>{this.state.collapsed ? '': '报表'}</span>}>
                        <Menu.Item key="/monthly">
                            <i className="iconfont icon-benyue" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>
                            月报
                        </Menu.Item>
                        <Menu.Item key="/weekly"><i className="iconfont icon-benzhou" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>周报</Menu.Item>
                        <Menu.Item key="/daily"><i className="iconfont icon-shijianriqi" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>日报</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/jurisdiction">
                        <i className="iconfont icon-quanxianguanli" style={{ fontSize:'20px', marginRight:'8px', marginLeft:'-3px' }}></i>
                        {this.state.collapsed ? '': '权限管理'}
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{minWidth:'600px'}}>
                <Header style={{ background: '#fff', padding: 0, height:'50px',lineHeight:'50px' }}>
                    <Dropdown overlay={menuList} trigger={['click']} placement="bottomCenter">
                        <Button shape="circle" className="avatarButton">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Button>
                    </Dropdown>
                    <div className="message-text">
                        <span className="message">{this.state.message}</span>
                        <span className="name">{$.cookie('user_name')}</span>
                    </div>
                </Header>
                <Content style={{ margin: '0', backgroundColor:'#f4f6f9', padding: 24, overflow:'scroll' }}>
                    <ol className="breadcrumb">
                        <li>
                            <Link key="home" to="/"><Icon type="home" theme="filled" /> Polaris</Link>
                        </li>
                    </ol>
                    {this.props.children}
                </Content>
            </Layout>
        </Layout>
        );
    }
}

export default Index;
