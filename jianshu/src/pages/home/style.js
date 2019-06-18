import styled from 'styled-components';

export const HomeWrapper = styled.div`
    overflow: hidden;           //触发 bfc
    margin: 0 auto;
    width: 960px;
    // background: green;      //!!!中文冒号：和英文冒号: ？？？！！！
`;

export const HomeLeft = styled.div`
    float: left;
    margin-left: 15px;
    margin-top: 30px;
    width: 625px;
    .banner-img {
        border-radius: 8px;
        width: 625px;
        height: 270px;
        margin-bottom: 35px;
    }
`;

export const HomeRight = styled.div`
    float: right;
    margin-top: 30px;
    width: 240px;
`;