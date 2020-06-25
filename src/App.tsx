import React, { Suspense, Fragment, useRef, useState, useEffect } from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from 'react-router-dom';
import moment from 'moment';
import { createHashHistory } from 'history';
import { Button, Typography } from 'antd';
import config from './config';
import hooks from './hooks';
import api from './http';

import Err404 from './views/Err404';
import TreeShow from './components/tree';
import Drawer01 from './components/drawer/drawer01';
import './App.scss';
const history = createHashHistory();
const { Paragraph } = Typography;

function Clock() {
  const [date, setDate] = useState(new Date().valueOf());

  useEffect(() => {
    function tick() {
      setDate(new Date().valueOf());
    }
    const timerID = setInterval(tick, 1000);

    return function clearTick() {
      clearInterval(timerID);
    };
  });

  return (
      <Paragraph copyable style={{display:"inline-block"}} className="app-margin10">
        {moment(new Date().valueOf()).format('YYYY-MM-DD HH:mm:ss')}
      </Paragraph>
  );
}

function App() {
  const appRef: any = useRef();
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
          <div className="app">
            <header className="app-header">
              <div className="app-header-body">
                <div className="app-header-body-logo">
                  <Button
                    type="primary"
                    onClick={() => {
                      appRef.current.showDrawer();
                    }}
                  >
                    open
                  </Button>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    lineHeight: '60px',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    className="app-margin10"
                    onClick={() => {
                      history.push('/home');
                    }}
                  >
                    主页
                  </Button>
                  <Button
                    className="app-margin10"
                    onClick={() => {
                      history.push('/add');
                    }}
                  >
                    添加
                  </Button>
                  <Button
                    className="app-margin10"
                    onClick={() => {
                      history.push('/edit');
                    }}
                  >
                    编辑
                  </Button>
                  <Clock />
                </div>
              </div>
            </header>
            <div className="app-body">
              <Drawer01 ref={appRef} childen={<TreeShow />} />
              <div className="app-body-main">
                <div className="app-body-main-content">
                  <Suspense fallback={<span className="page-spin"></span>}>
                    <Switch>
                      {config.routers.map((route, i) => {
                        return <Route key={i} {...route} />;
                      })}
                      <Redirect path="/" to={{ pathname: '/home' }} />
                      <Route component={Err404} />
                    </Switch>
                  </Suspense>
                </div>
                <footer className="app-footer">
                  <h1>ndzy</h1>
                </footer>
              </div>
            </div>
          </div>
        </Fragment>
      </Switch>
    </HashRouter>
  );
}

export default App;
