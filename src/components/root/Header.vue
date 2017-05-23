<template lang="html">
  <header class="topnavbar-wrapper">
    <nav role="navigation" class="navbar topnavbar">
      <div class="container">
        <div class="navbar-header">
          <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="#" class="navbar-brand">
            <div class="brand-logo">
              <img src="/static/img/logo.png" alt="App Logo" class="img-responsive" />
            </div>
            <div class="brand-logo-collapsed">
              <img src="/static/img/logo.png" alt="App Logo" class="img-responsive" />
            </div>
          </a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <router-link :to="{ name: 'task.main' }" tag="li" exact><a>Tarefas</a></router-link>
            <router-link :to="{ name: 'subject.main' }" tag="li"><a>Disciplinas</a></router-link>
          </ul>
          <ul class="nav navbar-nav navbar-right">
           <li class="dropdown">
             <el-dropdown trigger="click">
               <span class="el-dropdown-link">
                 {{ currentUser.name }}<i class="el-icon-caret-bottom el-icon--right"></i>
               </span>
               <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item><a href="#">Perfil</a></el-dropdown-item>
                 <a href="#" @click="logoutUser"><el-dropdown-item>Sair</el-dropdown-item></a>
               </el-dropdown-menu>
             </el-dropdown>
           </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  created () {
    document.body.className = 'layout-h'
  },
  computed: {
    ...mapGetters(['currentUser', 'isLogged'])
  },
  watch: {
    isLogged (value) { // isLogged changes when the token changes
      if (value === false) {
        this.$router.push({ name: 'auth.main' })
      }
    }
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser () {
      this.logout()
    }
  }
}
</script>

<style lang="css">
</style>
