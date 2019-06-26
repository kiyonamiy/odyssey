import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { 
    HeaderWrapper, 
    Logo, 
    Nav, 
    NavItem, 
    SearchWrapper, 
    NavSearch, 
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition, 
    Button,
} from './style';


class Header extends Component {

    constructor(props) {
        super(props);
        this.getSearchInfo = this.getSearchInfo.bind(this);
    }

    render() {
        const { focused, list, handleNavSearchFocus, handleNavSearchBlur } = this.props;
        return (
            <Fragment>
                <HeaderWrapper>
                    <Logo />
                    <Nav>
                        <NavItem className="left active">首页</NavItem>
                        <NavItem className="left">下载App</NavItem>
                        <NavItem className="right">登录</NavItem>
                        <NavItem className="right">
                            <span className="iconfont">&#xe636;</span>
                        </NavItem>
                        <SearchWrapper>
                            <CSSTransition
                                in={focused}     /** 控制入场退场的开关 */
                                timeout={200}               /** 动画时长(但好像还是内部的时长控制) */
                                classNames="slide"
                            >
                                <NavSearch 
                                    className={focused ? 'focused' : ''}
                                    onFocus={()=> {handleNavSearchFocus(list)}}
                                    onBlur={handleNavSearchBlur}
                                />
                            </CSSTransition>
                            <span 
                                className={focused ? 'focused iconfont' : 'iconfont'}
                            >&#xe62d;</span>
                            {this.getSearchInfo()}
                        </SearchWrapper>
                    </Nav>
                    <Addition>
                        <Button className="writting">
                            <span className="iconfont">&#xe616;</span>
                            写文章
                        </Button>
                        <Button className="reg">注册</Button>
                    </Addition>
                </HeaderWrapper>
            </Fragment>
        );
    }

    getSearchInfo() {
        const { focused, mouseIn, list, page, totalPage, handleSearchInfoOnMouseEnter, handelSearchInfoOnMouseLeave, handleSearchInfoSwitchClick } = this.props;
        const nativeList = list.toJS();     //因为此时的 list 为 immutable 无法直接通过 list[i] 取值
        const pageList = [];

        if(nativeList.length) {
            for(let i = page * 10; i < (page + 1) * 10 && nativeList[i] !== undefined; i ++) {
                pageList.push(
                    <SearchInfoItem key={nativeList[i]}>{nativeList[i]}</SearchInfoItem>
                )
            }
        }

        if(focused || mouseIn) {
            return (
                <SearchInfo 
                    onMouseEnter={handleSearchInfoOnMouseEnter}
                    onMouseLeave={handelSearchInfoOnMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={()=>{handleSearchInfoSwitchClick(page, totalPage)}}>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    //focused: state.get('header').get('focused'),   //因为已经变为 immutable ，只能使用 get 函数取值
    focused: state.getIn(['header', 'focused']),      //另一个 API ，二者等价
    mouseIn: state.getIn(['header', 'mouseIn']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
});

const mapDispatchToProps = dispatch => ({
    handleNavSearchFocus(list) {
        if(list.size === 0) {
            dispatch(actionCreators.getGetSearchInfoListAction());
        } 
        dispatch(actionCreators.getNavSearchFocusAction());
    },
    handleNavSearchBlur() {
        dispatch(actionCreators.getNavSearchBlurAction());
    },
    handleSearchInfoOnMouseEnter() {
        dispatch(actionCreators.getSearchInfoMouseEnterAction());
    },
    handelSearchInfoOnMouseLeave() {
        dispatch(actionCreators.getSearchInfoMouseLeaveAction());
    },
    handleSearchInfoSwitchClick(page, totalPage) {
        page += 1;
        if(page >= totalPage) {
            page = 0;
        }
        dispatch(actionCreators.getSearchInfoSwitchClickAction(page));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);