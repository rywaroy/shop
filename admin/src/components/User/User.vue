<template>
    <div id="user">
        <el-table :data="list" stripe style="width: 100%">
            <el-table-column prop="account" label="账号/手机">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="sex" label="性别">
            </el-table-column>
            <el-table-column prop="created" label="创建时间">
            </el-table-column>
            <el-table-column prop="integral" label="积分">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="disable(scope.row.id,scope.$index)" v-if="scope.row.status == 1">禁用</el-button>
                    <div v-else>已禁用</div>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" :current-page="page" @current-change="changePage">
            </el-pagination>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            page: 1,
            limit: 10,
            total: 0,
            list: []
        }

    },
    mounted() {
        this.getUserList();
    },
    methods: {
        getUserList() {
            this.$http.get('/user/list', {
                params: {
                    page: this.page,
                    limit: this.limit
                }
            }).then(res => {
                this.list = res.data.data.list
                this.total = res.data.data.total
            })
        },
        disable(id, index) {
            this.$http.post('/user/disable', {
                id: id
            }).then(res => {
                this.$message('成功禁用该用户')
                this.list[index].status = 0;
            })
        },
        changePage(num){
            this.page = num;
            this.getUserList()
        }
    }
}
</script>
