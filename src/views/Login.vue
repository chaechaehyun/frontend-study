<template>
    <div class="">
        <div class="btn-area">
            <button
                type="text"
                :style="showLoginForm ? 'display:none' : ''"
                @click="showLoginForm = true"
            >
                로그인
            </button>
        </div>
        <form 
            v-show="showLoginForm"
            class="login-form"
        >
            <p>LOGIN TEST</p>
            <input
                v-model="userId"
                type="text"
                placeholder="아이디를 입력해주세요"
            >
            <input
                v-model="userPassword"
                type="password"
                placeholder="비밀번호를 입력해주세요"
            >
            <p class="warnin-msg">
                {{ warningMsg }}
            </p>
            <button
                id="loginBtn"
                type="submit"
                @click.self.prevent="login(userId, userPassword)"
            >
                로그인
            </button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            userId: "",
            userPassword: "",
            warningMsg: "",

            showLoginForm: false,
        };
    },
    methods: {
        login(id, password) {
            if (id.length == 0 || password.length == 0) {
                this.warningMsg = "아이디 또는 비밀번호 값을 입력해주세요.";
                this.userPassword = "";
                return;
            }
            let formdata = new URLSearchParams();
            formdata.append('username', id);
            formdata.append('password', password);
            console.log(formdata);
            this.$store.dispatch('FETCH_LOGIN', formdata)
                .then(() => {
                    console.log("login success");
                    this.$router.push("/main-list");
                })
                .catch((error) => {
                    console.error('loginByIdAsync response error', error);
                    console.log(error.response.data.msg);
                    this.warningMsg = "아이디 또는 비밀번호를 확인해주세요";
                });
               
        },
    },
};
</script>

<style scoped>
.btn-area{
    margin: 30px 0;
    text-align: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
  margin: 0 auto;
  padding: 50px 0;
}
input {
  display: block;
  margin-top: 10px;
  padding: 6px 12px;
}
button {
  padding: 6px 12px;
  margin-top: 10px;
}
.warnin-msg {
  color: #ff0000;
  text-align: left;
}

</style>
 