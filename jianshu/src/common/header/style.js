import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

/* 就是一个 div 标签，带了样式 */
export const HeaderWrapper = styled.div`
    position: relative;
    height: 56px;
    border-bottom: 1px solid #f0f0f0;   /* Header 底下的一条细线 */
`;

export const Logo = styled.a.attrs({    /*设置属性，使其指向首页 */
    href: '/'
})`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100px;
    height: 56px;
    background: url(${logoPic});    /*多行文本嵌入变量的语法 \$\{\} */
    background-size: contain;       /* 图片太大或太小时，使其正好放入位置 */
`;

export const Nav = styled.div`
    width: 960px;
    height: 100%;               /* 若是不写，则是自适应，根据标签内容大小显示；若标签内无内容，则 height=0 不显示 */
    padding-right: 70px;
    box-sizing: border-box;     /*使其右边空出 70px, 防止和右边的登录写文章按钮重叠 */
    margin: 0 auto;             /* topbottom leftright 0上下填满 auto水平居中 */
`;

export const NavItem = styled.div`
    line-height: 56px;  /*设置行高，不会改变字体大小，文字相对于line-height上下居中。此时line-height和height高度一致，所以相对于父元素上下居中*/
    padding: 0 15px;
    font-size: 17px;
    color: #333;
    padding-right: 70px;
    box-sizing: border-box;

    /* !!!如果 NavItem 组件**自身**的 className=left 或 className=right 的时候，执行对应的样式 */
    &.left {
        float: left;
    }
    &.right {
        float: right;
        color: #969696;
    }
    &.active {
        color: #ea6f5a;
    }
`;

export const SearchWrapper = styled.div`
    position: relative;
    float: left;

    /* !!!设置 SearchWrapper 底下的**子组件** 类为 iconfont （父组件为 &.）*/
    .iconfont {
        position: absolute;     /* !!!具体原理是 position: absolute; 的元素会相对于第一个设置了 position: relative;!!! */
        bottom: 5px;
        right: 5px;
        width: 30px;
        line-height: 30px;
        border-radius: 15px;
        text-align: center;     /* 规定元素中的文本的水平对齐方式 */

        &.focused {
            background: #777;
            color: #fff;
        }
    }
`;

export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})`
    width: 160px;               /* 这个属性定义元素!!!内容区!!!的宽度，在内容区外面可以增加内边距、边框和外边距。 */
    height: 38px;
    padding: 0 30px 0 20px;
    margin-top: 9px;            /* 整体高度=56px ， height=38px ， 为了其居中显示， (56-38) / 2 = 9px */
    margin-left: 20px;
    border: none;
    box-sizing: border-box;     /* 为元素指定的任何内边距和边框都将在!!!已设定的宽度和高度内!!!进行绘制。此时宽度是 160px，内边距左右 20px，所以内容宽度变为120px。如果有多的部分被隐藏*/
    outline: none;              /*（轮廓）是绘制于元素周围的一条线，位于 边框边缘 的外围，可起到突出元素的作用。不会占据空间。可设置 color style width */
    border-radius: 19px;        /* 圆角，高度的一半 */
    background: #eee;
    font-size: 14px;
    color: #666;

    &::placeholder {            /* !!!对其属性做出改变 */
        color: #999;
    }

    &.focused {
        width: 240px
    }

    &.slide-enter {
        //width: 160px;
        transition: all .2s ease-out;   /* 与外层 timeout 保持一致 */
    }
    &.slide-enter-active {
        width: 240px;
    }
    &.slide-exit {
        transition: all .2s ease-out;
    }
`;

export const SearchInfo = styled.div`
    position: absolute;
    left: 0;
    top: 56px;
    width: 240px;
    padding: 0 20px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
`;

export const SearchInfoTitle = styled.div`
    margin-top: 20px;
    margin-bottom: 15px;
    line-height: 20px;
    font-size: 14px;
    color: #969696;
`;

export const SearchInfoSwitch = styled.span`
    float: right;
    font-size: 13px;
    cursor: pointer;
`;

export const SearchInfoList = styled.div`
    overflow: hidden;
`;

export const SearchInfoItem = styled.a`
    display: block;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 0 5px;
    line-height: 20px;
    font-size: 12px;
    color: #787878;
`;

export const Addition = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;

export const Button = styled.div`
    float: right;
    margin-top: 9px;
    margin-right: 20px;
    padding: 0 20px;
    line-height: 38px;
    border-radius:  19px;
    border: 1px solid #ec6149;
    font-size: 14px;

    &.reg {
        color: #ec6149;
    }
    &.writting {
        color: #fff;
        background: #ec6149;
    }
`;

