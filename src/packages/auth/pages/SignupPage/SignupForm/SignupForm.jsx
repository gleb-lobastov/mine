import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export default function SignupForm({ formikProps }) {
  const {
    setFieldValue,
    handleSubmit,
    values: { email, alias, password, passwordConfirm },
  } = formikProps;

  return (
    <Grid container={true} spacing={3} alignItems="center">
      <Grid item={true} xs={6}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="signup-page-email">Email</InputLabel>
          <Input
            id="signup-page-email"
            fullWidth={true}
            value={email}
            onChange={event =>
              setFieldValue('email', event.currentTarget.value)
            }
          />
        </FormControl>
      </Grid>
      <Grid item={true} xs={6}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="signup-page-alias">
            Алиас (будет в ссылке на страницу)
          </InputLabel>
          <Input
            fullWidth={true}
            id="signup-page-alias"
            value={alias}
            onChange={event =>
              setFieldValue('alias', event.currentTarget.value)
            }
          />
        </FormControl>
      </Grid>
      <Grid item={true} xs={6}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="signup-page-password">Пароль</InputLabel>
          <Input
            fullWidth={true}
            type="password"
            id="signup-page-password"
            value={password}
            onChange={event =>
              setFieldValue('password', event.currentTarget.value)
            }
          />
        </FormControl>
      </Grid>
      <Grid item={true} xs={6}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="signup-page-password-confirm">
            Подтверждение пароля
          </InputLabel>
          <Input
            fullWidth={true}
            id="signup-page-password-confirm"
            type="password"
            value={passwordConfirm}
            onChange={event =>
              setFieldValue('passwordConfirm', event.currentTarget.value)
            }
          />
        </FormControl>
      </Grid>
      <Grid item={true} xs={12}>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Зарегистрировать пользователя
        </Button>
      </Grid>
    </Grid>
  );
}
