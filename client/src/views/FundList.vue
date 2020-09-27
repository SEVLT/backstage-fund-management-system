<template>
	<div class="fillContainer">
		<div>
			<el-form :inline="true" ref="add_data">
				<!-- 筛选按钮 -->
				<el-form-item label="按照时间筛选：" :model="search_data">
					<el-date-picker
						v-model="search_data.startTime"
						type="datetime"
						placeholder="选择开始时间"
						align="right"
					>
					</el-date-picker>
					<span>&nbsp;&nbsp;--&nbsp;&nbsp;</span>
					<el-date-picker
						v-model="search_data.endTime"
						type="datetime"
						placeholder="选择结束时间"
						align="right"
					>
					</el-date-picker>
				</el-form-item>
				<!-- 筛选按钮 -->
				<el-form-item>
					<el-button type="primary" size="mini" icon="search" @click="handleSearch()"
						>筛选</el-button
					>
				</el-form-item>
				<!-- 添加按钮 -->
				<el-form-item class="btnRight">
					<el-button
						type="primary"
						size="mini"
						icon="view"
						@click="handleAdd()"
						v-if="identity"
						>添加
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table_container">
			<el-table
				v-if="tableData.length > 0"
				:data="tableData"
				style="width: 100%"
				max-height="450px"
				border
			>
				<el-table-column label="序号" type="index" width="70" align="center">
				</el-table-column>

				<el-table-column prop="date" label="创建时间" width="250" align="center">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{ scope.row.date }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="type" label="收支类型" width="150" align="center">
				</el-table-column>

				<el-table-column prop="describe" label="收支描述" width="180" align="center">
				</el-table-column>

				<el-table-column prop="income" label="收入" width="150" align="center">
					<template slot-scope="scope">
						<span style="color: #00d053">{{ scope.row.income }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="expend" label="支出" width="150" align="center">
					<template slot-scope="scope">
						<span style="color: #f56767">{{ scope.row.expend }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="cash" label="账户现金" width="150" align="center">
					<template slot-scope="scope">
						<span style="color: #4db3ff">{{ scope.row.cash }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="remark" label="备注" width="220" align="center">
				</el-table-column>

				<el-table-column
					prop="operation"
					label="操作"
					align="center"
					width="170"
					v-if="identity"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							icon="edit"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑
						</el-button>

						<el-button
							size="mini"
							type="danger"
							icon="delete"
							@click="handleDelete(scope.$index, scope.row)"
							>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页功能 -->
			<el-row>
				<el-col :span="24">
					<div class="pagination">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page.sync="paginations.page_index"
							:page-sizes="paginations.page_sizes"
							:page-size="paginations.page_size"
							:layout="paginations.layout"
							:total="paginations.total"
						>
						</el-pagination>
					</div>
				</el-col>
			</el-row>
		</div>

		<DiaLog :dialog="dialog" :formData="formData" @update="getProfile"></DiaLog>
	</div>
</template>

<script>
import DiaLog from '../components/DiaLog'

export default {
	name: 'fund-list',
	data() {
		return {
			search_data: {
				startTime: '',
				endTime: '',
			},
			filterTableData: {},
			// 分页
			paginations: {
				page_index: 1, // 当前位于页数
				total: 0, // 总数
				page_size: 5, // 每页显示条数
				page_sizes: [5, 10, 15, 30], // 每页选择条数选择
				layout: 'total, sizes, prev, pager, next, jumper', // 翻页属性
			},
			// 存放表格数据
			tableData: [],
			// 存放所有当时数据
			allTabData: [],
			dialog: {
				show: false,
				title: '',
				option: 'edit',
			},
			formData: {
				type: '',
				describe: '',
				income: '',
				expend: '',
				cash: '',
				remark: '',
				id: '',
			},
		}
	},
	computed: {
		user() {
			// 获取用户信息
			return this.$store.getters.user
		},
		// 设置用户权限
		identity() {
			if (this.$store.getters.user.identity == 'manager') {
				return true
			} else {
				return false
			}
		},
	},
	components: {
		DiaLog,
	},
	methods: {
		// 获取表格数据
		getProfile() {
			this.$axios
				.get('api/profiles')
				.then((res) => {
					// console.log(res)
					// 将 axios 请求的数据存放在 tableData 中
					// this.tableData = res.data
					this.allTabData = res.data
					// 存储所有数据用于过滤用
					this.filterTableData = res.data
					// 设置分页数据
					this.setPaginations()
				})
				.catch((err) => {
					console.log(err)
				})
		},
		handleEdit(index, row) {
			// console.log(index, row);
			// console.log(this.dialog);
			this.dialog = {
				show: true,
				title: '编辑信息',
				option: 'edit',
			}
			this.formData = {
				type: row.type,
				describe: row.describe,
				income: row.income,
				expend: row.expend,
				cash: row.cash,
				remark: row.remark,
				id: row._id,
			}
		},
		handleDelete(index, row) {
			// console.log(index, row);
			this.$axios
				.delete(`api/profiles/delete/${row._id}`)
				.then((res) => {
					// 添加成功
					this.$message({
						message: '删除成功',
						type: 'success',
					})
					// 隐藏 dialog
					// this.dialog.show = false
					// 删除后更新
					this.getProfile()
				})
				.catch((err) => {
					this.$message({
						message: '删除失败',
						type: 'error',
					})
					// this.dialog.show = false
				})
		},
		handleAdd() {
			this.dialog = {
				show: true,
				title: '添加信息',
				option: 'add',
			}
			this.formData = {
				type: '',
				describe: '',
				income: '',
				expend: '',
				cash: '',
				remark: '',
				id: '',
			}
		},
		// 改变每页展示数目
		handleSizeChange(page_size) {
			this.paginations.page_index = 1
			this.paginations.page_size = page_size
			this.tableData = this.allTabData.filter((item, index) => {
				return index < page_size
			})
		},
		// 改变当前页数
		handleCurrentChange(page) {
			// 获取当前页面第一个数据的 index
			let index = this.paginations.page_size * (page - 1)
			// 获取数据总数
			let nums = this.paginations.page_size * page
			let tables = []
			for (let i = index; i < nums; i++) {
				if (this.allTabData[i]) {
					tables.push(this.allTabData[i])
				}
				this.tableData = tables
			}
		},
		setPaginations() {
			// 分页属性设置 所有当前总条数
			this.paginations.total = this.allTabData.length
			// 设置当前总页数
			this.paginations.page_index = 1
			// 设置默认显示条数，初始化5
			this.paginations.page_size = 5
			// 设置默认的分页数据
			this.tableData = this.allTabData.filter((item, index) => {
				return index < this.paginations.page_size
			})
		},
		// 筛选按钮
		handleSearch() {
			if (!this.search_data.startTime || !this.search_data.endTime) {
				this.$message({
					type: 'warning',
					message: '请选择时间',
				})
				this.getProfile()
				return
			}
			// 获取开始时间和结束时间
			const sTime = this.search_data.startTime.getTime()
			const eTime = this.search_data.endTime.getTime()

			// 根据时间筛选过滤
			this.allTabData = this.filterTableData.filter((item) => {
				// 格式化时间
				let date = new Date(item.date)
				let time = date.getTime()
				return time >= sTime && time < eTime
			})

			// 筛选完成后重新对数据分页
			this.setPaginations()
		},
	},
	created() {
		this.getProfile()
	},
}
</script>

<style scoped>
.fillContainer {
	width: 100%;
	height: 100%;
	padding: 15px;
	box-sizing: border-box;
}

.btnRight {
	float: right;
}

.pagination {
	float: right;
	margin-top: 15px;
}
</style>
