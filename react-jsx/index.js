import React from './react/index'
import ReactDom from './react-dom'
const ele = (
    <div className='active' title='123'>
        <span>hello,</span>
        <span>react</span>
    </div>
);

ReactDom.render('reactDom',document.querySelector('#root'))
ReactDom.render(ele,document.querySelector('#root'))