import * as React from 'react'

import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConfigProvider, Spin } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'

import { pathInfo } from '@utils/url'
import UserManager from '@src/services/userManager'
import menuConfig from '@conf/menu'
import Login from '@pages/login'
import SwitchTab from '@com/SwitchTab'
import Layout from '../layout'

// {{__IMPORT_REDUX_START__}}
import '@pages/home/redux.ts'
import '@pages/login/redux.ts'
import '@pages/tpl/redux.ts'

// {{__IMPORT_REDUX_END__}}

/**
 * Generate Component with arguments [params]
 * @return {Function}
 */
type RouteChild = {
  path: string,
  component: any
}

class ListRouters extends React.Component<{}> {
  mounted = false

  componentDidMount(): void {
    this.mounted = true
    // 用户登录以后
    UserManager.userInfoDidFetch(() => {
      if (this.mounted) this.setState({})
    })
  }

  componentWillUnmount(): void {
    this.mounted = false
  }

  /**
   * path 生成 routes节点
   * @param item
   */
  pathToRoutes = (item: any): any[] => {
    const results = []
    item.path.forEach((pathChild: string) => {
      if (UserManager.isPermission(item.permission)) {
        results.push(
          <Route
            key={pathChild}
            path={pathChild}
            render={() => <item.component type={pathInfo().second || 'list'} />}
          />,
        )
      }
    })
    return results
  }

  dynamicRoutes = () => {
    const routes: any[] = []
    let group: any
    for (group of menuConfig) {
      if (group.subMenu) {
        // 有二级菜单
        group.subMenu.forEach(item => {
          this.pathToRoutes(item)
            .forEach(c => routes.push(c))
        })
      } else if (group.path && group.path.length > 0) {
        // 只有一级菜单
        this.pathToRoutes(group)
          .forEach(c => routes.push(c))
      }
    }
    routes.push(<Route key="match-all"><NotFound /></Route>)
    return <SwitchTab>{routes}</SwitchTab>
  }

  render() {
    return (
      <React.Suspense
        fallback={(
          <Spin spinning={true}>
            <div style={{ width: '100%', height: '100vh' }} />
          </Spin>
        )}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot" component={Login} />
          <Route exact path="/set-password" component={Login} />

          {this.dynamicRoutes()}
        </Switch>
      </React.Suspense>
    )
  }
}

const NotFound = () => (
  <div className="content404">
    <h1>丰田海南出行</h1>
    <h3>Toyato Mobility Services (Hai Nan) Corporation</h3>
  </div>
)

const routes = (): any =>
  (
    <ConfigProvider locale={zh_CN}>
      <Layout>
        <ListRouters />
      </Layout>
    </ConfigProvider>
  )

export default routes
