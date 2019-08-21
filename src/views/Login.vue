<template>
  <div class="login-overlay">
    <div class="login-wrapper border border-light">
      <form class="form-signin" @submit.prevent="login">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputUserId" class="sr-only">User Id</label>
        <input
          v-model="userid"
          type="userid"
          id="inputUserId"
          class="form-control"
          placeholder="User Id"
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          v-model="password"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
        />
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../stores";
import { RepositoryFactory } from "../repositories/repositoryFactory";
import { ILoginRepository } from "../repositories/loginRepository";
import { Logger } from "../loggers/logger";

@Component
export default class Login extends Vue {
  private userid: string = "";
  private password: string = "";

  private created() {
    this.$store.commit("reset");
  }

  private async login() {
    try {
      const repos: ILoginRepository = RepositoryFactory.get("Login") as ILoginRepository;
      const res = await repos.save("Login", {
        userId: this.userid,
        password: this.password,
      });
      const jwt: string = res.headers.authorization;
      store.commit("doLogin", { userId: this.userid, jwt });
      this.$router.push("/");
    } catch (err) {
      const status = err.response ? err.response.status : "";
      this.$notify({
        title: `ERROR:${status}`,
        type: "error",
        text: "Login failed",
        duration: 5000,
      });
      Logger.getLogger().error(`${status}: Login failed: ${err}`);
    }
  }
}
</script>

<style lang="css" scoped>
.login-overlay {
  background: #605b56 !important;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.login-wrapper {
  background: #fff;
  width: 65%;
  margin: 5% auto;
  animation: fadein 0.6s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.form-signin {
  max-width: 330px;
  padding: 7% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="userid"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
