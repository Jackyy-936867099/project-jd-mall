<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 动画 -->
        <transition name='sort'>
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item bo"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)" @mouseleave="leaveIndex">
                  <!-- 使用声明式导航会出现卡顿现象 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">京东超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash模块，按需引入
import throttle from "lodash/throttle";
// console.log(throttle)
export default {
  name: "TypeNav",
  mounted() {
    //当组件挂载完毕，如果不是home路由组件将typeNav进行隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        if (state.home.categoryList.length > 15)
          return state.home.categoryList.slice(0, 15);
        return state.home.categoryList;
      },
    }),
  },
  data() {
    return {
      currentIndex: 0,
      show: true,
    };
  },
  methods: {
    // changeIndex(){
    //     this.currentIndex=index
    // },
    //通过导入lodash模块实现节流操作
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    leaveIndex() {
      this.currentIndex = -1;
    },
    goSearch(event) {
      //最好的解决方法：编程式路由导航+事件委派
      //存在的一些问题:事件委派，是把完全不的子节点的是事件委派给父节点
      //点击a标签的时候才会进行路由跳转【怎么能确定点的一定是a标签】
      //存在的哪一个问题：即使能确定点击的是a标签，如何区分是一级二级三级分类标签

      //第一个问题：把子节点中a标签，加上自定义属性data-categoryName，其余的子节点是没有
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //需要加入判断，如果路由跳转的时候带有params参数也需要传递过去
        if(this.$route.params){
            location.params=this.$route.params
        }
        location.query = query;
        this.$router.push(location);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:nth-child(1){
          border-top: #e1251b solid 3px;
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过度动画的样式
    .sort-enter{
        height:0px;
    }
    .sort-enter-to{
        height: 461px;
    }
    .sort-enter-active{
        transition: all .1s linear;
    }
  }
}
</style>