import React from './react/index'
import ReactDom from './react-dom'
const ele = (
    <div className='active' title='123'>
        <span>hello,</span>
        <span>react</span>
    </div>
);
function Home(){
    return (
        <div className='active' title='123'>
            hello,<span>12345</span>
        </div>
    )
}
const title='title';

class Home1 extends React.Component{
    render(){
        return (
            <div>12345</div>
        )
    }
}
console.log(<Home title={title}/>)//attr是对象{title:title}，tag是函数function Home，children无值

// ReactDom.render('reactDom',document.querySelector('#root'))
// ReactDom.render(ele,document.querySelector('#root'))
ReactDom.render(<Home title={title}/>,document.querySelector('#root'))
ReactDom.render(<Home1 title={title}/>,document.querySelector('#root1'))