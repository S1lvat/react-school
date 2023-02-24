import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Aluno from '../Pages/Aluno';
import Alunos from '../Pages/Alunos';
import Register from '../Pages/Register';
import Fotos from '../Pages/Fotos';
import Login from '../Pages/Login';
import Page404 from '../Pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} />
      <MyRoute path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute path="/aluno/:id/delete" component={Aluno} isClosed />
      <MyRoute path="/aluno/" component={Aluno} isClosed />
      <MyRoute path="/fotos/:id" component={Fotos} isClosed />
      <MyRoute path="/register" component={Register} />
      <MyRoute path="/login" component={Login} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
