<template>
    <div class="capsule-container" :style="{ width: width + 'px', height: height + 'px' }">
        <div class="capsule" :style="{ width: width + 'px' }">
            <slot></slot>
        </div>
        <button v-show="showPrev" class="capsule-prev">&lt;</button>
        <button v-show="showNext" class="capsule-next">&gt;</button>
    </div>
</template>

<script>

    /*

    Using:

    <capsule :width="700" :height="70">
        <div v-for="n in 20" class="item">
            {{n}}
        </div>
    </capsule>

    */

    export default {
        props: {
            width: Number,
            height: Number,
        },
        data() {
            return {
                el: null,
                interval: null,
                showPrev: false,
                showNext: false,

                observer: null
            }
        },
        computed: {},
        created() {
        },
        mounted() {

            this.el = $(this.$el);

            this.capsule = this.el.find('.capsule');

            $(window).on('resize', () => {

            });

            this.capsule.scroll(() => {
                this.calculate();
            });

            this.el.find('.capsule-prev, .capsule-next').mouseout(() => {
                clearInterval(this.interval);
            });

            this.el.find('.capsule-prev').mouseover(() => {
                this.increaseTranslate(-15);
            });

            this.el.find('.capsule-next').mouseover(() => {
                this.increaseTranslate(15);
            });

            this.calculate();

            this.observer = new MutationObserver(function(mutations) {
                this.calculate();
            }.bind(this));

            // Setup the observer
            this.observer.observe(
                this.capsule[0],
                { attributes: true, childList: true, characterData: true, subtree: true }
            );


        },
        beforeDestroy: function() {
            this.observer.disconnect();
        },
        methods: {
            increaseTranslate(value) {
                this.interval = setInterval(() => {
                    this.capsule.scrollLeft(this.capsule.scrollLeft() + value);
                }, 20)

            },
            calculate(){
                let capsule = this.capsule[0];

                let scrollLeft = capsule.scrollLeft;
                let scrollWidth = capsule.scrollWidth;

                this.showPrev = scrollLeft > 0;
                this.showNext = scrollWidth > this.width && scrollLeft != (scrollWidth - this.width);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .capsule-container {
        position: relative;
    }

    .capsule {
        position: absolute;

        div {
            display: table-cell;
            min-width: 100px;
            width: 100px;
            border: 2px solid #d1d1d1;
        }
    }


    .capsule-prev, .capsule-next {
        position: absolute;
        z-index: 11;
        opacity: .4;
        top: 15px;
    }

    .capsule-prev {
        left: 0;
    }

    .capsule-next {
        right: 0;
    }

</style>
