# TS常见报错

### window对象报错

错误
```javascript
loation.href = ...
```

正确
```javascript
window.loation.href = ...
```


错误(window未定义)
```javascript
window.location.href = ....
```

正确
```javascript
(<any>window).loation.href = ...
```

### react生命周期报错(eslint)
```javascript
class extends React.Component<any, any> {
  componentWillUnmount() {}
  
  componentDidMount() {}
  
  componentDidUpdate() {}
  
  render() { ... }
}
```
从上倒下顺序依次应为 didmount, didupdate, willunmount

### react class组件属性需要隔行

错误
```javascript
class ...{
  mounted = false 
  init = false
  state = { ... }
}
```

正确
```javascript
class ...{
  mounted = false 
  
  init = false
  
  state = { ... }
}
```

### 单行注释

```javascript
class ...{
  mounted = false     //这是会报错注释

  init = false // 这是正确的注释（前后空格）
}
```
