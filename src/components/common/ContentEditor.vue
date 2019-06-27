<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="clearfix mb10">
                    <div class="pull-left">
                        <ul class="list-inline">
                            <li title="Kalın">
                                <button :class="{ 'btn-primary': isBold}" @click.prevent="apply($event, 'bold')" :disabled="htmlMode" class="btn btn-default  pull-left">
                                    <i class="fa fa-bold"></i>
                                </button>
                            </li>
                            <li title="İtalik">
                                <button :class="{ 'btn-primary': isItalic}" @click.prevent="apply($event, 'italic')" :disabled="htmlMode" class="btn btn-default  pull-left">
                                    <i class="fa fa-italic"></i>
                                </button>
                            </li>
                            <li title="Altı Çizgili">
                                <button :class="{ 'btn-primary': isUnderline}" @click.prevent="apply($event, 'underline')" :disabled="htmlMode" class="btn btn-default pull-left">
                                    <i class="fa fa-underline"></i>
                                </button>
                            </li>
                            <li title="Link Ekle">
                                <button :class="{ 'btn-primary': isLink}" @click.prevent="apply($event, 'createLink')" :disabled="htmlMode" class="btn btn-default pull-left">
                                    <i class="fa fa-link"></i>
                                </button>
                            </li>
                        </ul>

                    </div>
                    <div class="pull-right">
                        <button @click="changeContentType"
                                type="button"
                                v-bind:class="{'btn-default': !htmlMode, 'btn-primary': htmlMode}"
                                class="btn btn-default">
                            Kaynak
                        </button>
                    </div>

                </div>
                <div v-show="!htmlMode" class="edit-area" contenteditable="true" v-html="content" @blur="onBlurEditArea"></div>
                <textarea v-show="htmlMode" class="edit-text-area form-control" @blur="onBlurEditTextArea">{{content}}</textarea>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        props: ["content", 'pastePlainText'],
        data () {
            return {
                isBold: false,
                isUnderline: false,
                isItalic: false,
                isLink: false,
                oldContent: '',
                htmlMode: false,
                selectors: {
                    textArea: null,
                    editArea: null,
                },
            }
        },
        computed: {},
        updated(){
            this.oldContent = this.content;
        },
        mounted(){
            this.selectors.textArea = $(this.$el).find('.edit-text-area');
            this.selectors.editArea = $(this.$el).find('.edit-area');

            // For Paste as Plain Text
            if(this.pasteAsPlainText) {
                this.$el.querySelector('[contenteditable=true]').addEventListener('paste',(e) => {
                    // cancel paste
                    e.preventDefault();

                    // get text representation of clipboard
                    let text = e.clipboardData.getData("text/plain");

                    // insert text manually
                    document.execCommand("insertHTML", false, text);
                });
            }

            document.addEventListener('selectionchange',(e) => {
                let actElement = $(e.target.activeElement);

                if(actElement.is('.edit-area') || actElement.is('.edit-area *')){
                    this.setActiveButtons();
                }

            });
        },
        methods: {
            resetActiveButtons(){
                this.isBold = false;
                this.isUnderline = false;
                this.isItalic = false;
                this.isLink = false;
            },
            getSelectedTag(){
                let selection = window.getSelection();
                let selected = selection.focusNode ? selection.focusNode.parentNode : null;


                if(!selected) return null;

                return selected;

            },
            setActiveButtons(){
                this.resetActiveButtons();

                let tags = ['b','strong','u','i','em', 'a'];
                let selected = this.getSelectedTag();

                if(!selected) return;

                let parent = selected.tagName !== 'DIV' ? $(selected) : null;

                if(!parent) return;

                let tagName = parent.prop('tagName').toLowerCase();

                tags = tags.filter(tag => tag == tagName || parent.parents(tag).length > 0);

                this.isBold = tags.indexOf('b') != -1;
                this.isUnderline = tags.indexOf('u') != -1;
                this.isLink = tags.indexOf('a') != -1;
                this.isItalic = tags.indexOf('i') != -1;
            },

            apply(e, type) {
                let selected = this.getSelectedTag();
                if(!selected) return;

                let selectedTagName = selected.tagName;

                if(type == 'createLink') {
                    let link;
                    let confirmMsg = "Lütfen bir link giriniz. (Silmek için boş bırakın)";

                    if(selectedTagName == 'A')
                        link = prompt(confirmMsg, selected.getAttribute('href') || 'http://');
                    else
                        link = prompt(confirmMsg, "http://");


                    if(link && link !== "http://" && link.substr(0, 7) == 'http://')
                        document.execCommand(type, false, link);
                    else if(link == '')
                        document.execCommand("unlink", false);


                } else {
                    document.execCommand(type);
                }

                this.resetActiveButtons();
                this.onBlurEditArea();
            },
            onBlurEditArea(){
                let html = this.selectors.editArea.html();
                this.selectors.textArea.val(html);

                if(this.oldContent !== html) {
                    this.$emit('onChangeContent', {content: html});
                }

                this.resetActiveButtons();
            },
            onBlurEditTextArea(){
                let html = this.selectors.textArea.val();
                this.selectors.editArea.html(html);


                if(this.oldContent !== html) {
                    this.$emit('onChangeContent', {content: html});
                }

                this.oldContent = html;
            },
            changeContentType(){
                this.htmlMode = !this.htmlMode;
            },
        }
    }
</script>

<style lang="scss" scoped>

    .edit-area {
        border: 1px dashed gray;
        padding: 10px;
        height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;


    }

    textarea {
        height: 400px;
    }
</style>
