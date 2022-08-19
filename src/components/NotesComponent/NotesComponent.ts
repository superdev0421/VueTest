import { defineComponent } from "vue";
// import Task from "../../models/Task";

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
