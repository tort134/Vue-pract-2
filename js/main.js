// Vue.component('note-component', {
//     template: `
//         <div class="note"></div>
//         <h3>{{ note.name }}}</h3>
//         <ul>
//             <li>
//                 <input type="checkbox">
//                 <span>{{ item.text }}}</span>
//
//             </li>
// <!--            <div>Complete: {{ note.complate }}}</div>-->
//         </ul>
//     `
// })

new Vue({
    el: '#app',
    data(){
        return{
            note: [],
            newNoteName: '',
            newNoteItems: ['', '', ''],

        }
    },

    // created(){
    //
    // },

    computed: {
        fristNoteColumn(){
            return this.note.filter(note => note.column == 1).slice(0,3);
        },

        secondNoteColumn(){
            return this.note.filter(note => note.column == 1).slice(0, 5);
        },

        thirdNoteColumn(){
            return this.note.filter(note => note.column ==3);
        },

        ifSecondColumnFull(){
            return this.secondNoteColumn.length >= 5;
        },

        anyFirstColumnOver50Procent(){
            return this.fristNoteColumn.some(card => {
                const completed = card.items.filter(i => i.completed).length;
                return completed / card.items.length > 0.5;
            })
        },

        ifFirstColumnBlocked(){
            return this.ifSecondColumnFull && this.anyFirstColumnOver50Procent;
        }
    },

    methods: {
        addItem(){
            if(this.newNoteItems.length < 5){
                this.newNoteItems.push();
            }
        },

        removeItem(){
            if(this.newNoteItems.length >3){
                this.newNoteItemspop();
            }
        },

    }
})
