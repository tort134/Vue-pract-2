Vue.component('note-component', {
    template: `
        <div class="note"></div>
        <h3>{{ note.name }}}</h3> 
        <ul>
            <li>
                <input type="checkbox">
                <span>{{ item.text }}}</span>
                
            </li>
<!--            <div>Complete: {{ note.complate }}}</div>-->
        </ul>
    `
})

new Vue({
    el: '#app',
    data(){
        return{
            note: [],
            newNoteName: '',
            newNoteItems: ['', '', ''],

        }
    },

    created(){

    },

    computed: {

    },

    methods: {

    }
})
