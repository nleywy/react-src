const ReactDOM = {
    render
}
/*
{
    tag:'div',
    attrs:{
        className:'active',
        title:'123'
    }
    children:[]
}
*/
function render(vnode,container){
    if(vnode == undefined) return;
    if(typeof vnode == 'string'){
        const textNode = document.createTextNode(vnode);
        container.appendChild(textNode)
    }else if(typeof vnode == 'object'){
        const {tag,attrs,children} = vnode;
        const dom = document.createElement(tag);
        if(attrs){
            for(let key in attrs){
                const value = attrs[key];
                setAttribute(dom,key,value);
            }
        }
        //递归渲染子节点
        children.forEach((item)=>{
            render(item,dom);
        })
        container.appendChild(dom)
    }
}
//设置属性 
function setAttribute(dom,key,value){
    if(key == 'className'){
        key = 'class'
    }
    //如果是事件onClick onBlue
    if(/on\w+/.test(key)){
        key = key.toLowerCase();
        dom[key] = value || '';
    }else if(key == 'style'){
        if(!value || typeof value == 'string'){
            dom.style.cssText = value || ''
        }else if(value && typeof value == 'object'){
            for(let key in value){
                if(typeof value[key] == 'number'){
                    dom.style[key] = value[k] + 'px';
                }else{
                    dom.style[key] = value[k];
                }
            }
        }
    }else{
        if(key in dom){
            dom[key] = value ||'';
        }
        if(value){
            dom.setAttribute(key,value)
        }else{
            dom.removeAttribute(key);
        }
    }
}
export default ReactDOM;