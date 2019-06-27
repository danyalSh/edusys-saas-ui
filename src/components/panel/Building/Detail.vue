<template>
  <div class="panel-building-detail-view">
    <div class="panel panel-default">
      <div
        class="panel-heading"
      >{{ isEdit ? $t('lbl.edit-building') : $t('lbl.insert-new-building') }}</div>

      <div class="panel-body pt50">
        <div v-show="loading">
          <h3 class="text-center">{{$t('lbl.loading')}}</h3>
        </div>
        <div v-if="!loading">
          <form @submit.prevent="saveItem" class="form-horizontal">
            <ul class="nav nav-tabs">
              <li class="active">
                <a data-toggle="tab" href="#general">{{ $t('lbl.general') }}</a>
              </li>
              <li>
                <a data-toggle="tab" href="#contact">{{ $t('lbl.contact') }}</a>
              </li>
            </ul>

            <div class="tab-content">
              <div id="general" class="tab-pane fade in active general">
                <div class="mt50">
                  <div class="form-group">
                    <label class="col-sm-2 col-md-2 control-label">Bina Adı:</label>
                    <div class="col-sm-10 col-md-6">
                      <multi-lang-text :value="item.name"></multi-lang-text>
                    </div>
                  </div>
                  <div class="form-group mt40">
                    <label class="col-sm-2 col-md-2 control-label">Açıklama:</label>
                    <div class="col-sm-10 col-md-6">
                      <multi-lang-text :value="item.description" :multiline="true"></multi-lang-text>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 col-md-2 control-label">Kampüs:</label>
                    <div class="col-sm-10 col-md-6">
                      <select v-model="item.campus" :disabled="loadingCampuses" class="btn-block">
                        <option :value="null">Bulunduğu kampüsü seçiniz</option>
                        <option
                          v-for="campus in campuses"
                          :value="campus"
                        >{{campus.name | langtext}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 col-md-2 control-label">Bina No:</label>
                    <div class="col-sm-10 col-md-6">
                      <input
                        v-model="item.doorNumber"
                        type="text"
                        placeholder="Bina numarası giriniz"
                        required
                      >
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 col-md-2 control-label">Kod</label>
                    <div class="col-sm-10 col-md-6">
                      <input v-model="item.code" type="text" placeholder="Kod giriniz" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 col-md-2 control-label">Konum:</label>
                    <div class="col-sm-10 col-md-6">
                      <google-maps :coordinate="item" :height="250"></google-maps>
                    </div>
                  </div>
                </div>
              </div>
              <div id="contact" class="tab-pane fade contact">
                <contact-information :data="item.contactInformation"></contact-information>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
                <hr>
                <button
                  type="submit"
                  :disabled="loadingSave"
                  class="btn btn-primary"
                >{{$t('lbl.save') | upper}}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import store from "src/services/store";
import { BuildingService, BuildingModel } from "src/services/data/building";
import { CampusService } from "src/services/data/campus";
import { clone } from "src/helper";

import MultiLangText from "src/components/common/MultiLangText.vue";
import GoogleMaps from "src/components/common/GoogleMaps";
import ContactInformation from "src/components/panel/_partials/ContactInformation";

import ViewMixin from "../ViewMixin";

export default {
  mixins: [ViewMixin],
  components: {
    MultiLangText,
    GoogleMaps,
    ContactInformation
  },
  data() {
    return {
      state: store.state,
      appInfo: store.state.appInfo,

      loading: false,
      loadingSave: false,
      loadingCampuses: false,

      campuses: [],

      item: clone(BuildingModel)
    };
  },
  created() {
    this.getCampuses();

    this.isEdit = typeof this.$route.params.id != "undefined";

    if (this.isEdit) this.getItem();
  },
  mounted() {},

  methods: {
    getCampuses() {
      this.loadingCampuses = true;

      CampusService.listCampusItems()
        .then(res => {
          this.loadingCampuses = false;

          if (res.code == 200) {
            this.campuses = res.result.set;
          }
        })
        .catch(err => {
          this.loadingCampuses = false;
        });
    },
    getItem() {
      this.loading = true;

      BuildingService.getBuilding(this.$route.params.id)
        .then(res => {
          this.loading = false;

          if (res.code == 200) {
            this.item = res.result.set;

            if (!this.item.name) this.item.name = {};
            if (!this.item.description) this.item.description = {};
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    saveItem() {
      this.loadingSave = true;

      if (this.isEdit) {
        BuildingService.updateBuildingItem(this.item, this.$route.params.id)
          .then(res => {
            this.loadingSave = false;

            if (res.code == 200) {
              toastr.success(res.message);
            }
          })
          .catch(err => {
            this.loadingSave = false;
          });
      } else {
        BuildingService.insertBuildingItem(this.item)
          .then(res => {
            this.loadingSave = false;

            if (res.code == 200) {
              toastr.success(res.message);
            }
          })
          .catch(err => {
            this.loadingSave = false;
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
