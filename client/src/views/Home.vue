<template>
	<div class="home">
		<div class="container">
			<h1 class="title">欢迎登陆</h1>
			<p class="lead">后台资金管理系统</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
}
</script>

<style scoped>
.home {
	width: 100%;
	height: 100%;
	background: url(../assets/showcase.png) no-repeat center;
	background-size: 100% 100%;
}

.container {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding-top: 100px;
	background-color: rgba(0, 0, 0, 0.3);
	text-align: center;
	color: #ffffff;
}

.title {
	padding-top: 30px;
	padding-bottom: 30px;
	font-size: 40px;
}

.lead {
	margin-top: 50px;
	font-size: 30px;
}
</style>
