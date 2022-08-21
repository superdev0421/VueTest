/*
==========================================
  Title:  NotesComponent.ts
  Date:   18 August 2022
========================================== 
*/

// External Dependencies
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotesComponent",
  props: {
    title: String,
    content: String,
    itemKey: String,
    status: String,
  },
  data() {
    return {
      valueTitle: this.title,
      valueContent: this.content,
    };
  },
  methods: {},
});
