<template>
    <div class="file-upload">
        <label>
            <div v-if="loading" class="loading-state">
                <span v-if="loading">
                    {{$t('text.uploading-file')}}...
                </span>
            </div>
            <div v-if="!loading && !file" class="no-file-state">
                <div class="pt20">
                    <img src="/static/img/panel/icon-folderupload.svg"
                         class="icon-folder-upload"
                         alt="">
                    <p>{{$t('text.drag-file-or-click')}}</p>
                </div>
                <input @change="onFileChange" type="file" class="hidden mb10 mt10" :disabled="loading">
            </div>
            <div v-if="!loading && file" class="has-file-state">
                <img v-if="isImage(file)" :src="file" alt="" />
                <a v-else :href="file" target="_blank">{{file}}</a>
            </div>
        </label>
        <button v-if="file" @click="deleteFile" type="button" class="btn btn-danger btn-xs btn-delete">
            <i class="fa fa-times"></i>
        </button>

    </div>
</template>

<script>

    import {
        AppService
    } from 'src/services/data/app'

    export default {
        props: ["path", "endpoint", "params"],
        data() {
            return {
                loading: false,
                file: null,
            }
        },
        created(){
          this.file = this.path;
        },
        mounted() {
            let divFileUpload = document.querySelector('.file-upload');

            divFileUpload.addEventListener('dragover', (e) => {
                e.stopPropagation();
                e.preventDefault();
            });

            divFileUpload.addEventListener('drop', (e) => {
                e.stopPropagation();
                e.preventDefault();

                this.createFile(e.dataTransfer.files[0]);
            });
        },
        methods: {
            isImage(filename){
                return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filename);
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;

                if (!files.length)
                    return;

                this.createFile(files[0]);

            },
            createFile(file) {
                this.file = file;

                if (file.length > 5242880) {
                    toastr.warning(this.$i18n.t('text.file-size-not-be-larger') + " 5 MB");
                    return;
                }

                this.uploadFile();
            },

            uploadFile() {

                this.loading = true;

                let formData = new FormData();

                formData.append('file', this.file);

                if(this.params) {
                    let paramsKeys = Object.keys(this.params);

                    paramsKeys.map(key => {
                        formData.append(key, this.params[key]);
                    });
                }


                this.endpoint(formData).then((res) => {
                    this.loading = false

                    if (res.code == '200.0000') {
                        this.file = res.result.set;
                        this.$emit('onchange', {
                            file: this.file
                        });
                    }

                }).catch(res => {
                    this.loading = false
                });


            },
            deleteFile(e) {
                e.preventDefault();

                if(!this.file) {
                    this.$el.querySelector('[type=file]').value = null;
                }

                this.file = null;

                this.$emit('onchange', {
                    file: null
                });
            }
        }
    }
</script>

<style lang="scss" scoped>


    .file-upload {
        position: relative;

        label {
            position: relative;
            text-align: center;
            width: 100%;
            border-radius: 3px;
            border: solid 1px #e4e9f0;
            font-size: 13px;
            letter-spacing: 0.2px;
            color: #345366;

            .loading-state, .no-file-state,  .has-file-state {
                height: 120px;
            }

            .loading-state {
                line-height: 120px;
            }

            .no-file-state {

                p {
                    margin-top: 10px;
                    opacity: 0.3;
                }

            }

            .has-file-state {
                img {
                    height: 50px;
                    margin-top: 20px;
                }

                a {
                    display: block;
                    line-height: 60px;
                }


            }



        }

        .btn-delete {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
</style>
