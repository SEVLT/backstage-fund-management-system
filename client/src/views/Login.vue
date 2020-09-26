<template>
	<div class="login">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">后台资金管理系统</span>
				<el-form
					:model="loginUser"
					:rules="rules"
					ref="loginForm"
					label-width="80px"
					class="loginForm"
				>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="loginUser.email" placeholder="请输入 email"></el-input>
					</el-form-item>

					<el-form-item label="密码" prop="password">
						<el-input
							type="password"
							v-model="loginUser.password"
							placeholder="请输入密码"
						></el-input>
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							class="submit_btn"
							@click="submitForm('loginForm')"
							>登陆
						</el-button>
					</el-form-item>

					<el-form-item>
						<div class="tiparea">
							<p>
								还没有账号？现在
								<router-link to="/register">注册</router-link>
							</p>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'login',
	components: {},
	data() {
		return {
			loginUser: {
				email: '',
				password: '',
			},
			// 表单验证
			rules: {
				email: [
					{
						type: 'email',
						required: true,
						message: '邮箱格式不正确！',
						trigger: 'blur',
					},
				],
				password: [
					{
						required: true,
						message: '密码不能为空！',
						trigger: 'blur',
					},
					{
						min: 6,
						max: 30,
						message: '长度需在 6 到 30 个字符之间',
						trigger: 'blur',
					},
				],
			},
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$axios.post('/api/users/login', this.loginUser).then((res) => {
						// 拿到token
						// console.log(res)
						const { token } = res.data
						// 存储到本地 localstorage
						localStorage.setItem('eleToken', token)

						this.$router.push('/index')

						// 注册成功
						this.$message({
							message: '登陆成功',
							type: 'success',
						})
						// 注册成功后跳转到登陆页面
						this.$router.push('/index')
					})
				}
			})
		},
	},
}
</script>

<style scoped>
.login {
	position: relative;
	width: 100%;
	height: 100%;
	background: url(../assets/bg.jpg) no-repeat center center;
	background-size: 100% 100%;
}

.form_container {
	width: 370px;
	height: 210px;
	position: absolute;
	top: 10%;
	left: 34%;
	padding: 25px;
	border-radius: 5px;
	text-align: center;
}

.form_container .manage_tip .title {
	font-family: 'Microsoft YaHei';
	font-weight: bold;
	font-size: 26px;
	color: #fff;
}

.loginForm {
	margin-top: 20px;
	background-color: #ffffff;
	padding: 20px 40px 20px 20px;
	border-radius: 5px;
	box-shadow: 0px 5px 10px #cccccc;
}

.submit_btn {
	width: 100%;
}

.tiparea {
	text-align: right;
	font-size: 12px;
	color: #333;
}

.tiparea p a {
	color: #409eff;
}
</style>
