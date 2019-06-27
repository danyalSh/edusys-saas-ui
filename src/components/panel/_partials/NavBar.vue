<template>
  <div class="nav-container">
    <div class="sidebar-header-top clearfix">
      <div class="logo">
        <img :src="appInfo.logoPath" alt>
      </div>
      <div class="sidebar-close-btn">
        <a @click.prevent="toggleMenu" href>
          <i class="fa fa-times"></i>
        </a>
      </div>
    </div>

    <div class="sidebar-date">{{fullDate}}</div>

    <div class="mt20 scrollpane">
      <ul class="nav">
        <li v-for="(parent,index) in items" :class="{active: parent.isActive}">
          <a @click.prevent="goRoute(parent)" href>
            <span class="nav-icon">
              <i :class="'icon fa ' + parent.icon"></i>
            </span>
            <span class="title">{{parent.title | upper}}</span>
            <i
              v-if="!parent.hideChildrenInMenu && parent.children && parent.children.length"
              :class="{ 'fa-chevron-down': parent.isActive, 'fa-chevron-right': !parent.isActive}"
              class="arrow fa"
            ></i>
          </a>

          <ul class="sub">
            <li v-for="(child, index) in parent.children" :class="{active: child.isActive}">
              <a @click.prevent="goRoute(child)" href :class="{'active': child.isActive}">
                <span class="title">{{child.title}}</span>
                <i
                  v-if="!child.hideChildrenInMenu && child.children && child.children.length"
                  :class="{ 'fa-chevron-down': child.isActive, 'fa-chevron-right': !child.isActive}"
                  class="arrow fa"
                ></i>
              </a>

              <ul v-if="!child.hideChildrenInMenu" class="sub">
                <li v-for="(sub, index) in child.children">
                  <a @click.prevent="goRoute(sub)" href :class="{'active': sub.isActive}">
                    <span class="title">{{sub.title}}</span>
                  </a>
                </li>
              </ul>
              <!-- level 2 -->
            </li>
          </ul>
          <!-- level 1 -->
        </li>
      </ul>
      <!-- level 0 -->
      <footer-bar/>
    </div>
  </div>
</template>

<script>
import store from "src/services/store";
import { pages } from "src/services/pages";
import locales from "src/locales";

import FooterBar from "../_partials/FooterBar";

export default {
  components: {
    FooterBar
  },
  data() {
    return {
      state: store.state,
      appInfo: store.state.appInfo,
      items: pages,
      prevRoute: null,
      $scrollPane: null
    };
  },
  computed: {
    fullDate() {
      return moment().format("DD MMMM YYYY dddd | HH:mm");
    }
  },
  watch: {
    $route(to, from) {
      this.setActivePage(to);
    }
  },
  mounted() {
    this.setActivePage(this.$route);

    this.$body = $("body");

    $(".nav").on("click", () => {
      this.$nextTick(() => {
        this.initScrollPane();
      });
    });

    this.$nextTick(() => {
      this.initScrollPane();
    });

    $(window).on("resize", () => {
      this.initScrollPane();
    });
  },
  methods: {
    initScrollPane() {
      let h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );

      if (this.$scrollPane) {
        let api = this.$scrollPane.data("jsp");

        this.$scrollPane.css("height", h - 120);

        let throttleTimeout;

        if (!throttleTimeout) {
          throttleTimeout = setTimeout(function() {
            api.reinitialise();
            throttleTimeout = null;
          }, 50);
        }
      } else {
        this.$scrollPane = $(".scrollpane");
        this.$scrollPane.css("height", h - 120).jScrollPane();
      }
    },
    goRoute(route) {
      if (route.noClick) {
        route.isActive = !route.isActive;
      } else {
        this.$router.push({ name: route.name });
      }
      this.$forceUpdate();
    },
    toggleMenu() {
      this.state.isOpenSidebar = !this.state.isOpenSidebar;
      this.$body.toggleClass("sidebar-pull-visible");
    },
    setActivePage(to) {
      let routeName = to.name;

      for (let parent of pages) {
        parent.isActive = false;

        if (parent.name == routeName) {
          store.state.page.isActive = false;

          store.state.page = parent;

          store.state.page.isActive = true;
        } else if (parent.children && parent.children.length) {
          for (let child of parent.children) {
            child.isActive = false;

            if (child.name == routeName) {
              store.state.page.isActive = false;

              store.state.page = child;

              parent.isActive = true;
              store.state.page.isActive = true;
            } else if (child.children && child.children.length) {
              for (let sub of child.children) {
                sub.isActive = false;

                if (sub.name == routeName) {
                  store.state.page.isActive = false;

                  store.state.page = sub;

                  parent.isActive = true;
                  child.isActive = true;
                  store.state.page.isActive = true;
                }
              }
            }
          }
        }
      }

      document.title =
        store.state.page.title + " - " + store.state.config.siteName;
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
