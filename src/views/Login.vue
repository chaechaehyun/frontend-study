<template>
    <div class="">
        <form class="login-form">
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
                type="submit"
                @click="login(userId, userPassword)"
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
            warningMsg: "",
            userId: "",
            userPassword: "",
        };
    },
    methods:{ 
        login(id, password){
            if(id.length == 0 || password.length == 0){
                this.warningMsg = "아이디 또는 비밀번호 값을 입력해주세요."
                // this.userPassword = "";
                return false;
            }
            this.$store.dispatch('FETCH_ACCESS_TOKEN', { id, password })
                .then(() => {
                    if(response.status == 200){
                        console.log("login success");
                        this.$router.push("/");
                    }
                })
                .catch((error) => {
                    console.error('ACCESS_TOKEN ERROR', error);
                    this.resText = "아이디 또는 비밀번호를 확인해주세요";
                    this.userPassword = "";
                    return;
                })
         
        }

    }
};
</script>

<style scoped>
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
}
.warnin-msg{
    color: #ff0000;
    text-align: left;
}
</style>
