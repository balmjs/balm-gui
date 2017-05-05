export default {
  install(Vue){
    Vue.prototype.$terminal = new Vue({
      data(){
        return {
          show: false,
          textArr: [],
        }
      },
      el: document.createElement('div'),
      template: `<transition name="terminal">
                    <div class="ui-terminal">
                      <div class="container" v-show="show">
                        <i class="close-btn material-icons" @click="close">clear</i>
                        <div class="wrap">
                          <div class="text-list">
                            <div class="item" v-for="text in textArr">{{text}}</div>
                          </div>
                        </div>
                      </div>
                    </div>   
                  </transition>`,
      methods: {
        insertText(text){
          this.textArr.push(text);
          this.$nextTick(function () {
            let container = this.$el.querySelector('.wrap'), list = this.$el.querySelector('.text-list');
            container.scrollTop = parseInt(getComputedStyle(list).height, 10);
          });
        },
        close(){
          this.show = false;
        },
        open(){
          this.show = true;
        },
        toggle(){
          this.show = !this.show;
        },
        clearTerminal(){
          this.textArr = [];
        }
      },
      mounted(){
        this.$el.className = 'ui-terminal';
        document.body.appendChild(this.$el);
      }
    });
  }
}
