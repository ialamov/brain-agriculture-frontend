import { Actions, Card, Footer, Form, Header, LoginBackground } from './Login.styles'
import TextField from '../../components/atoms/TextFields/TextFields'
import Button from '../../components/atoms/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail, minLen } from '../../utils/validators';
import { useNavigate } from 'react-router-dom';
import { signIn, hydrate } from '../../store/auth/thunks';
import { register } from '../../service/authApi';

const Login = () => {
  
    const dispatch = useDispatch<any>();
    const status = useSelector((s: any) => s.auth.status) as 'idle'|'loading'|'authenticated'|'error';
    const authError = useSelector((s: any) => s.auth.error) as string|undefined;
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isRegister = useRef(false);
  
    const emailError = email && !isEmail(email) ? 'E-mail inválido' : undefined;
    const passError = password && !minLen(password, 8) ? 'Mínimo 8 caracteres' : undefined;

    useEffect(() => {
      dispatch(hydrate());
    }, [dispatch]);

    useEffect(() => {
      if (status === 'authenticated') {
        navigate('/home', { replace: true });
      }
    }, [status, navigate]);

    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!emailError && !passError) {
        if (isRegister.current) {
          const response = await register({email, password});
          if (response.message === 'User created') {
            window.alert('Usuário criado com sucesso');
            await dispatch(signIn(email, password));
          } else {
            window.alert('Erro ao criar usuário');
          }
        } else {
          await dispatch(signIn(email, password));
        }
      }
    }
    
  return (
    <LoginBackground>
      <Card role="region" aria-label="Authentication Panel">
        <Header>
          <h1>Entrar</h1>
          <p>Acesse o painel Brain Agriculture</p>
        </Header>

        <Form onSubmit={onSubmit} noValidate>
          <TextField
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError}
            autoComplete="email"
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={passError}
            autoComplete="current-password"
          />

          {authError && <div role="alert" style={{color:'#D9534F'}}>{authError}</div>}

          <Actions>
            <Button type="submit" disabled={Boolean(emailError || passError) || status==='loading'} aria-label="Entrar" onClick={() => isRegister.current = false}>
              Entrar
            </Button>
            <Button type="button" variant="secondary" onClick={()=>{ setEmail(''); setPassword(''); }}>
              Limpar
            </Button>
            <Button
              type="submit"
              disabled={Boolean(emailError || passError) || status === 'loading'}
              variant="third"
              onClick={() => isRegister.current = true }
            >
              Cadastrar
            </Button>
          </Actions>
        </Form>

        <Footer>© {new Date().getFullYear()} Brain Agriculture</Footer>
      </Card>
    </LoginBackground>
  )
}

export default Login;
