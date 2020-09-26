<template>
	<div class="home">
		<div class="container">
			<h1 class="title">季夏二十一</h1>
			<p class="lead">朝暮与年岁并往，愿与你一同行至天光</p>
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
	background-color: rgba(0, 0, 0, 0.7);
	text-align: center;
	color: #ffffff;
}

.title {
	font-size: 30px;
}

.lead {
	margin-top: 50px;
	font-size: 22px;
}
</style>
