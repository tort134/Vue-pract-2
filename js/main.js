Vue.component('note-component', {
    props: ['note', 'editable'],

    computed: {
        progress(){
            const completed = this.note.items.filter(i => i.completed).length
            return (completed / this.note.items.length) * 100
        }
    },

    template: `
        <div class="note">
            <h3>{{ note.name }}</h3>
            <ul>
                <li v-for="(item, index) in note.items" :key="item.id">
                    <input type="checkbox"
                           v-model="item.completed"
                           :disabled="!editable || note.column == 3"
                    >
                    <span>{{ item.text }}</span>
                </li>
                <div v-if="note.completeDate">Complete: {{ note.completeDate }}</div>
            </ul>
        </div>
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
        this.loadNotes();
    },

    computed: {
        firstNoteColumn(){
            return this.note.filter(note => note.column == 1).slice(0,3);
        },

        secondNoteColumn(){
            return this.note.filter(note => note.column == 2).slice(0, 5);
        },

        thirdNoteColumn(){
            return this.note.filter(note => note.column ==3);
        },

        ifSecondColumnFull(){
            return this.secondNoteColumn.length >= 5;
        },

        anyFirstColumnOver50Procent(){
            return this.note.filter(note => note.column == 1).some(note => {
                const completed = note.items.filter(i => i.completed).length;
                return completed / note.items.length > 0.5;
            })
        },

        ifFirstColumnBlocked(){
            return this.ifSecondColumnFull && this.anyFirstColumnOver50Procent;
        }
    },

    methods: {
        addItem(){
            if(this.newNoteItems.length < 5){
                this.newNoteItems.push('');
            }
        },

        removeItem(){
            if(this.newNoteItems.length >3){
                this.newNoteItems.pop();
            }
        },

        createNote(){
            if(!this.newNoteName.trim() || this.newNoteItems.some(i => !i.trim())){
                alert('Fill all fields');

                return;
            }

            this.note.push({
                id: Date.now(),
                name: this.newNoteName,
                items: this.newNoteItems.map(text => ({text, completed: false})),
                column: 1,
                completeDate: null
            });

            this.newNoteName = '';
            this.newNoteItems= ['', '', ''];
        },

        saveNotes(){
            localStorage.setItem('note', JSON.stringify(this.note))
        },

        loadNotes(){
            const savedNotes = localStorage.getItem('note');

            if(savedNotes){
                this.note = JSON.parse(savedNotes);
            }
        }

    },

    watch:{
        note:{
            handler(note){
                note.forEach(note => {
                    const completed = note.items.filter(i => i.completed).length;
                    const total = note.items.length;
                    const progress = completed / total;

                    if(note.column == 1 && progress > 0.5){
                        if(this.secondNoteColumn.length < 5){
                            note.column = 2;
                        }
                    }

                    else if(note.column === 2){
                        if(progress < 0.5){
                            note.column = 1;
                        }

                        else if(progress === 1){
                            note.column = 3;

                            if(!note.completedDate){
                                note.completedDate = new Date().toLocaleString();
                            }
                        }
                    }
                });
                this.saveNotes();
            },
            deep: true 
        }
    }
})