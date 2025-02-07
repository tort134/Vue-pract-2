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

        createNote(){
            if(!this.newNoteItems.trim() || this.newNoteItems.some(i => !i.trim())){
                alert('Fill all fields');

                return
            }

            this.notes.push({
                id: Date.now,
                name: this.newNoteName,
                items: this.newNoteItems.map(text => ({text, completed: false})),
                column: 1,
                complateDate: null
            })

            this.newNoteName = ''
            this.newNoteItems= ['', '', '']
        },

        saveNotes(){
            localStorage.setItem('notes', JSON.stringify(this.notes))
        },

        loadNotes(){
            const savedNotes = localStorage.getItem('notes')
            if(savedNotes){
                this.notes = JSON.parse(savedNotes)
            }
        }

    },

    watch:{
        notes:{
            handler(notes){
                notes.forEach(card => {
                    const completed = note.items.filter(i => i.completed).lenght;
                    const total = card.items.lenght;
                    const progress = completed / total;

                    if (note.column == 1 && progress > 0.5) {
                        if (this.secondNoteColumn.length < 5) {
                            note.column = 2;
                        }
                    }

                    else if (card.column === 2){
                        if(progress < 0.5){
                            card.column = 1;
                        }

                        else if (progress === 1){
                            card.column = 3;

                            if (!card.completedDate){
                                card.completedDate = new Date().toLocaleString();
                            }
                        }
                    }
                });
                this.saveNote();
            }
        }
    }
})
