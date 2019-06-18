import React, { Component } from 'react';
import {
    ListItem,
    ListInfo
} from './style';

export default class List extends Component {
    render() {
        return (
            <ListItem>
                <ListInfo>
                    <h3>无论将来跟谁结婚，都请记住这些忠告</h3>
                    <p>无论将来跟谁结婚，都请记住这些忠告： 1. 结婚是两个家庭的结合，如果父母反对，这段婚姻就要三思三思再三思。 盲目随意放弃想来也不太可能，要分析...</p>
                </ListInfo>
                <a href="/">
                </a>
            </ListItem>
        )
    }
}