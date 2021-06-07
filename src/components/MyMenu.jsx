import { createNamespacedHelpers } from 'vuex'
let { mapState } = createNamespacedHelpers('user')
export default {
    data() {
        return {
            list: []
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        getMenuList(authList) {
            let menu = []
            let map = {}
            authList.forEach(m => {
                m.children = []
                map[m.id] = m
                if (m.pid == -1) {
                    menu.push(m) // 如果为根，直接放到menu中
                } else {
                    map[m.pid] && map[m.pid].children.push(m)
                }
            })
            return menu
        }
    },
    mounted() {
        this.list = this.getMenuList(this.userInfo.authList)
    },
    render() {
        let renderChildren = (list) => {
            return list.map(child => {
                return child.children.length
                    ? <el-submenu index={child._id}>
                        <template slot="title">
                            <span>{child.name}</span>
                        </template>
                        {renderChildren(child.children)}
                    </el-submenu>
                    : <el-menu-item index={child.path}>{child.name}</el-menu-item>
            })
        }
        return <el-menu background-color="#333" text-color="#fff"
            active-text-color="#ffd04b" class="menu" router={true}>
            {renderChildren(this.list)}
            {/* <el-submenu>
                <template slot="title">
                    <span>用户管理</span>
                </template>
                <el-menu-item>用户权限</el-menu-item>
            </el-submenu>
            <el-menu-item>个人中心</el-menu-item> */}
        </el-menu>
    }
}

// // pid = -1 表示为根节点
// authList = [
//     {
//         id: 1,
//         pid: -1,
//         name: '用户管理'
//     },
//     {
//         id: 2,
//         pid: 1,
//         name: '用户权限'
//         auth: 'userAuth'
//     }
// ]
// // => 格式化成如下格式
// authList = [
//     {
//         id: 1,
//         pid: -1,
//         name: '用户管理',
//         children: [{
//             id: 2,
//             pid: 1,
//             name: '用户权限'
//             auth: 'userAuth'
//         }]
//     },
// ]