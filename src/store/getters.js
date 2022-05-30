export default {
  /**
   * 目录
   */
  categorys: state => state.category.categorys,
  /**
   * 当前主题
   */
  themeType: state => state.theme.themeTyp,
  /**
   * category选中项
   */
  currentCategory: state => state.app.currentCategory,
  /**
   * category选中项下标
   */
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex(
      item => item.id === getters.currentCategory.id
    )
  }
}
