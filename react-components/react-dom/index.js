import Component from '../react/component'

const ReactDom = {
    render
}

function render(vnode,container){
    return container.append(_render(vnode));
}
function _render(vnode){
    if(vnode == undefined || vnode ==='null' || typeof vnode == 'boolean') return;
    if(typeof vnode == 'string'){
        return document.createTextNode(vnode);
    }else if(typeof vnode.tag == 'function'){
        //1. 创建组件
        const comp = createComponent(vnode.tag,vnode.attrs);

        //2. 设置组件属性
        setComponentProps(comp,vnode.attrs);

        //3. 组件渲染的节点对象返回
        console.log(comp.base)
        return comp.base;
    }else if(typeof vnode == 'object'){
        let {tag,attrs,children} = vnode;
        const dom = document.createElement(tag);
        if(attrs){
            for(let key in attrs){
                const value = attrs[key];
                setAttribute(dom,key,value)
            }
        }
        children.forEach((child)=>{
            render(child,dom)
        })
        return dom;
    }

}
function setComponentProps(comp,props){
    //设置属性
    comp.props = props;
    // 渲染组件
    renderComponent(comp)
}
function renderComponent(comp){
    const renderer = comp.render(); // 返回的jsx对象
    comp.base = _render(renderer)// 将jsx转化为dom
}

function createComponent(comp,props){
    let inst;

    // 如果是类定义的组件 则创建实例 返回
    if(comp.prototype && comp.prototype.render){
        inst = new comp(props);
    }else{
        // 如果是函数组件，将函数组件转化为类组件 方便后面统一管理处理
        // comp是函数本身 返回一个jsx对象
        inst = new Component(props);
        // 修改this指向
        inst.constructor = comp;
        //定义render函数
        inst.render = function(){
            return this.constructor(props);
        }
    }
    return inst;
}

function setAttribute(dom,key,value){
    if(key == 'className'){
        key = 'class';
    }

    //事件onClick onBlur
    if(/on\w+/.test(key)){
        key = key.toLowerCase();
        dom[key] = value || ''
    }else if(key == 'style'){
        if(!value || typeof value =='string'){
            dom.style.cssText = value || '';
        }else if(value && typeof value == 'object'){
            for(let k in value){
                if(typeof value[key] == 'number'){
                    dom.style[k] = value + 'px';
                }else{
                    dom.style[k] = value;
                }
            }
        }
    }else{
        if(key in dom){
            dom[key] = value || ''
        }
        if(value){
            dom.setAttribute(key,value)
        }else{
            dom.removeAttribute(key);
        }
    }
}
export default ReactDom;