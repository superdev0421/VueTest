import { Options, Vue } from "vue-class-component";
import TitleComponent from "@/components/TitleComponent/TitleComponent.vue";
import NotesContainer from "@/components/NotesComponent/NotesComponent.vue";
import { uuid } from "vue-uuid";

interface itemDetail {
  title: string;
  content: string;
  itemKey: string;
  status: string;
}

@Options({
  components: {
    TitleComponent,
    NotesContainer,
  },
})
export default class HomeView extends Vue {
  notes: Array<itemDetail> = [];

  beforeMount() {
    const data = localStorage.getItem("notesData");
    if (data === null) {
      this.notes = [];
    } else this.notes = JSON.parse(data);
  }

  updateLocalStorage = (newNotes: Array<itemDetail>) => {
    const data = localStorage.getItem("notesData");
    if (data !== null) {
      localStorage.removeItem("notesData");
    }
    localStorage.setItem("notesData", JSON.stringify(newNotes));
  };

  onDeleteItem = (itemKey: string) => {
    const newNotes = this.notes.filter((item: itemDetail) => {
      return item.itemKey !== itemKey;
    });
    this.notes = newNotes;
    this.updateLocalStorage(this.notes);
  };

  onUpdateItem = (itemKey: string) => {
    if (
      this.notes.filter((item) => {
        return item.status === "editing";
      }).length >= 1
    ) {
      alert("Only one item can be updated at once.");
      return;
    }
    this.notes.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.status = "editing";
      }
      return item;
    });
  };

  onDiscardUpdateItem = (itemKey: string) => {
    this.notes.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.status = "showing";
      }
      return item;
    });
  };

  onConfirmUpdateItem = (
    itemKey: string,
    valueTitle: string,
    valueContent: string
  ) => {
    this.notes.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.title = valueTitle;
        item.content = valueContent;
        item.status = "showing";
      }
    });
    this.updateLocalStorage(this.notes);
  };

  onCreateItem = () => {
    if (
      this.notes.filter((item) => {
        return item.status === "creating";
      }).length > 0
    ) {
      alert("Only one item can be created at once.");
      return;
    }
    const newNode: itemDetail = {
      title: "",
      content: "",
      itemKey: uuid.v4(),
      status: "creating",
    };
    this.notes.unshift(newNode);
  };

  onDiscardCreateItem = () => {
    if (this.notes[0].status === "creating") this.notes.shift();
  };

  onConfirmCreateItem = (
    itemKey: string,
    valueTitle: string,
    valueContent: string
  ) => {
    if (
      this.notes[0].status === "creating" &&
      this.notes[0].itemKey === itemKey
    ) {
      this.notes[0].title = valueTitle;
      this.notes[0].content = valueContent;
      this.notes[0].status = "showing";
    }
    this.updateLocalStorage(this.notes);
  };
}
