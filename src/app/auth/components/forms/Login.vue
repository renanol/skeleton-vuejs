<template>
  <div id="login">
    <md-toolbar class="center-xs" style="background: #FFCA02;">

    </md-toolbar>

    <md-subheader class="center-xs" style="background: #000;"></md-subheader>

    <div class="column is-half is-offset-one-quarter">
      <form v-on:submit="">
        <md-input-container>
          <label>E-mail</label>
          <md-input v-model="user.login"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Senha</label>
          <md-input type="password" v-model="user.password"></md-input>
        </md-input-container>
        <md-button type="submit" class="md-raised md-primary">Entrar</md-button>
      </form>
    </div>

    <md-subheader class="center-xs" style="background: #000;"></md-subheader>
  </div>
</template>
<script>
/* global FB */

import { mapActions } from 'vuex';
import { isEmpty } from 'lodash';

export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      user: {
        login: '',
        password: '',
      },
      alert: {
        show: false,
        duration: 3000,
      },
    };
  },
  created() {
  },
  computed: {
    isValid() {
      const user = this.user;
      return !isEmpty(user.login) && !isEmpty(user.password);
    },
  },
  methods: {
    ...mapActions(['attemptLogin']),
    doLogin() {
      this.buttonLoading = true;
      this.$httpDG.post('/users/auth', {
        login: this.user.login,
        password: btoa(this.user.password),
      })
      .then(({ data }) => {
        this.$store.dispatch('setUser', data);
        this.$store.dispatch('setToken', data.token);

        if (isEmpty(data.user_phrase)) {
          this.$router.push({ name: 'secreteAnswer.main', params: { id: data.id } });
        } else {
          this.$router.push({ name: 'task.main' });
        }

        this.buttonLoading = false;
      })
      .catch(() => {
        this.$message.error('Email ou senha inválido!');
        this.buttonLoading = false;
      });
    },
    recoverPassword() {
      this.$httpDG.post('/users/recover_password', {
        login: this.user.login,
      })
      .then((response) => {
        if (response.status === 204) {
          this.modalRecoverPassword = false;
          this.$message({
            message: 'Ok, Recuperação de senha enviado com sucesso =)!.',
            type: 'success',
          });
        } else if (response.status === 200) {
          this.userPhrase = response.data.user_phrase.name;
          this.changeBoxRecoverPassword = true;
        }
      })
      .catch(() => {
        this.$message.error('Erro, Email ou Fractal ID inválido =(');
      });
    },
    resetPassword() {
      if (this.newPassword !== this.newPasswordConfirm) {
        this.$message.error('Erro, As senhas são diferentes!');
        return;
      }
      this.$httpDG.post('/users/reset_password', {
        fractal_id: this.user.login,
        secret_answer: this.secretAnswer,
        password: this.newPasswordConfirm,
      })
      .then(({ data }) => {
        this.$store.dispatch('setUser', data);
        this.$store.dispatch('setToken', data.token);
        this.$router.push({ name: 'task.main' });
      })
      .catch(() => {
        this.$message.error('Erro, A frase secreta está incorreta!');
      });
    },
  },
};
</script>

<style scoped>
</style>
