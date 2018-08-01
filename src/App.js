import React from 'react';
import styled from 'styled-components';
import './styles/global';
import {
  Button,
  Card,
  CardTitle,
  CardText,
  CardActions,
  CardMenu,
  IconButton,
  Textfield,
} from 'react-mdl';

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});
// const Title = styled.h1`
//   font-size: 32px;
// `;

const App = () => (
  <div>
    <Card shadow={1} style={{ width: '512px', margin: '50px auto' }}>
      <CardTitle
        theme={theme}
        style={{
          color: '#fff',
          background: '#002171',
        }}
      >
        Order Tracking - Acert
      </CardTitle>
      <CardTitle
        theme={theme}
        style={{
          color: '#fff',
          background: '#0d46a0',
        }}
      >
        Sign up
      </CardTitle>
      <CardText>
        <Textfield onChange={() => {}} type="text" label="Nome" style={{ width: '100%' }} />
        <Textfield onChange={() => {}} type="email" label="Email" style={{ width: '100%' }} />
        <Textfield onChange={() => {}} type="password" label="Senha" style={{ width: '100%' }} />
        <Textfield
          onChange={() => {}}
          type="password"
          label="confirm password"
          style={{ width: '100%' }}
        />
      </CardText>
      <CardActions>
        <Button
          href="#text-buttons"
          style={{ textAlign: 'right', display: 'block', marginBottom: '50px' }}
        >
          Termos e Politica de Privacidade
        </Button>
        <Button
          raised
          colored
          style={{
            background: '#8bc34a',
            margin: 'auto',
            display: 'block',
            fontSize: '10',
          }}
        >
          Confirme
        </Button>
        <br />
      </CardActions>
      <CardMenu style={{ color: '#fff' }}>
        <IconButton name="share" />
      </CardMenu>
    </Card>

    <Card shadow={1} style={{ width: '512px', margin: '50px auto' }}>
      <CardTitle
        theme={theme}
        style={{
          color: '#fff',
          background: '#002171',
        }}
      >
        Order Tracking - Acert
      </CardTitle>
      <CardTitle
        theme={theme}
        style={{
          color: '#fff',
          background: '#0d46a0',
        }}
      >
        Sign in
      </CardTitle>
      <CardText>
        <Textfield onChange={() => {}} type="email" label="Email" style={{ width: '100%' }} />
        <Textfield onChange={() => {}} type="password" label="Senha" style={{ width: '100%' }} />
      </CardText>
      <CardActions>
        <Button
          raised
          colored
          style={{
            background: '#8bc34a',
            margin: 'auto',
            display: 'block',
            fontSize: '10',
          }}
        >
          Entrar
        </Button>
        <br />
      </CardActions>
      <CardMenu style={{ color: '#fff' }}>
        <IconButton name="share" />
      </CardMenu>
    </Card>

    {/* Success */}
    <Card shadow={1} style={{ width: '512px', margin: '50px auto' }}>
      <CardTitle
        theme={theme}
        style={{
          color: '#fff',
          background: '#002171',
        }}
      >
        Order Tracking - Acert
      </CardTitle>
      <CardText>
        <p
          style={{
            textAlign: 'center',
          }}
        >
          Verifique seu email.
        </p>
        <p
          style={{
            textAlign: 'center',
          }}
        >
          Uma confirmação foi enviada para o email: seuemail@seuemail.com
        </p>
        <Button
          href="#text-buttons"
          style={{ textAlign: 'left', display: 'block', marginBottom: '50px' }}
        >
          Eu nao recebi. Enviar o email novamente.
        </Button>
      </CardText>
      <CardActions>
        <Button raised colored style={{ background: '#8bc34a', margin: 'auto', display: 'block' }}>
          Confirme
        </Button>
        <br />
      </CardActions>
      <CardMenu style={{ color: '#fff' }}>
        <IconButton name="share" />
      </CardMenu>
    </Card>
    {/* Success */}
  </div>
);

export default App;
