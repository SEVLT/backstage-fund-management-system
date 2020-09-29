<template>
	<div class="dialog">
		<el-dialog
			:title="diaLog.title"
			:visible.sync="diaLog.show"
			:close-on-click-modal="false"
			:modal-append-to-body="false"
		>
			<div class="form">
				<el-form
					:model="formData"
					ref="form"
					:rules="form_rules"
					label-width="120px"
					style="margin: 10px; width: auto"
				>
					<el-form-item prop="type" label="收支类型:">
						<el-select v-model="formData.type" placeholder="请选择收支类型">
							<el-option
								v-for="(formtype, index) in format_type_list"
								:key="index"
								:label="formtype"
								:value="formtype"
							>
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item prop="income" label="收入:">
						<el-input type="income" v-model="formData.income"></el-input>
					</el-form-item>

					<el-form-item prop="expend" label="支出:">
						<el-input type="expend" v-model="formData.expend"></el-input>
					</el-form-item>

					<el-form-item prop="cash" label="账户现金:">
						<el-input type="cash" v-model="formData.cash"></el-input>
					</el-form-item>

					<el-form-item label="备注:">
						<el-input
							type="textarea"
							v-model="formData.remark"
							placeholder="可选填"
						></el-input>
					</el-form-item>

					<el-form-item class="text_right">
						<el-button @click="diaLog.show = false">取 消</el-button>
						<el-button type="primary" @click="onSubmit('form')">提 交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'dialog',
	// 父组件 FundList.vue 传值
	props: {
		diaLog: Object,
		formData: Object,
	},
	data() {
		return {
			format_type_list: ['营销', '广告', '充值', '转账', '提现'],
			form_rules: {
				type: [{ required: true, message: '收支类型不能为空', trigger: 'blur' }],
				income: [{ required: true, message: '收支内容不能为空', trigger: 'blur' }],
				expend: [{ required: true, message: '支出内容不能为空', trigger: 'blur' }],
				cash: [{ required: true, message: '账户现金不能为空', trigger: 'blur' }],
			},
		}
	},
	methods: {
		onSubmit(form) {
			this.$refs[form].validate((valid) => {
				if (valid) {
					// 判断点击的是编辑还是添加
					const url = this.diaLog.option === 'add' ? 'add' : `edit/${this.formData.id}`
					this.$axios
						.post(`api/profiles/${url}`, this.formData)
						.then((res) => {
							//添加成功
							this.$message({
								message: '修改成功',
								type: 'success',
							})
							// 隐藏dialog
							this.diaLog.show = false
							// 添加后更新 FundList
							this.$emit('update')
						})
						.catch((err) => {
							this.$message({
								message: '修改失败',
								type: 'error',
							})
							this.diaLog.show = false
						})
				}
			})
		},
	},
}
</script>

<style scoped></style>
