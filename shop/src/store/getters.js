export const sex = state => {
    return state.userInfo.sex == 0 ? '保密' : (state.userInfo.sex == 1 ? '男' : '女')
}

export const userType = state => {
    return state.userInfo.sex == 3 ? '所有者' : (state.userInfo.sex == 2 ? '管理员' : '普通用户')
}

export const avatar = state => {
    return state.userInfo.avatar ? state.userInfo.avatar : require('../assets/img/avatar.png')
}