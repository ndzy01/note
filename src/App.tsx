import React, { Suspense, Fragment,useState } from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from 'react-router-dom';
import { createHashHistory } from 'history'
import {Button} from 'antd'
import config from './config';
import hooks from './hooks';
import api from './http';

import Err404 from './views/Err404'
import TreeShow from './components/tree'
import './App.scss';
const history = createHashHistory()


function App() {
  const [isExpend,setIsExpend]=useState(true)
  const setLogo = (url: string) => {
    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  hooks.useSetLogo(() => {
    api('/layout/getLogo', 'GET').then((res: any) => {
      setLogo(res.data.data.url);
    });
  });
 
  return (
    <HashRouter>
      <Switch>
        <Fragment>
          <section className="app">
            <header className="app-header">
              <section className="app-header-body">
                <section className="app-header-body-logo" >
                <Button type="primary" onClick={
              () => {
                setIsExpend(!isExpend)
              }
            }>{isExpend?"收起":"展开"}</Button>
                </section>
                <section style={{
                  flex: "auto",
                  lineHeight:"60px",
                  textAlign:"center"
                }}> 
                  <Button className="app-margin10" onClick={
              () => {
                history.push("/home")
              }
            }>主页
                     
            </Button>  
                     <Button className="app-margin10" onClick={
              () => {
                history.push("/add")
              }
            }>添加</Button>  
                     <Button className="app-margin10" onClick={
              () => {
                history.push("/edit")
              }
            }>编辑</Button>  
            </section>
             
              </section>
            </header>
            <section className="app-body">
              <aside className={isExpend ? "app-body-aside-expend" : "app-body-aside-collapse"}>
              <TreeShow
     
    />
              </aside>
              <section className="app-body-main">
                <section className="app-body-main-content">
                  <Suspense fallback={<span className="page-spin"></span>}>
                    <Switch>
                      {config.routers.map((route, i) => {
                        return <Route key={i} {...route} />;
                      })}
                      <Redirect path="/" to={{ pathname: '/home' }} />
                      <Route component={Err404} />
                    </Switch>
                  </Suspense>
                </section>
                <footer className="app-footer">
                  <h1>ndzy</h1>
                </footer>
              </section>
            </section>
          </section>
        </Fragment>
      </Switch>
    </HashRouter>
  );
}

export default App;
