import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, Button } from './style';
import { actionCreators } from './store';

const Header = props => {

    const {focused, handleNavSearchFocus, handleNavSearchBlur} = props;

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
                                onFocus={handleNavSearchFocus}
                                onBlur={handleNavSearchBlur}
                            />
                        </CSSTransition>
                        <span 
                            className={focused ? 'focused iconfont' : 'iconfont'}
                        >&#xe62d;</span>
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

const mapStateToProps = state => ({
    focused: state.header.get('focused'),   //因为 state.header 已经变为 immutable ，只能使用 get 函数取值

});

const mapDispatchToProps = dispatch => ({
    handleNavSearchFocus() {
        const action = actionCreators.getNavSearchFocusAction();
        dispatch(action);
    },
    handleNavSearchBlur() {
        const action = actionCreators.getNavSearchBlurAction();
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);