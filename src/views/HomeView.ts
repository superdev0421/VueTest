import { Options, Vue } from "vue-class-component";
import TitleComponent from "@/components/TitleComponent/TitleComponent.vue";
import NotesContainer from "@/components/NotesComponent/NotesComponent.vue";
import { isTemplateNode } from "@vue/compiler-core";

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
  notes: Array<itemDetail> = [
    {
      title: "title1",
      content: "content1",
      itemKey: "1",
      status: "showing",
    },
    {
      title: "title2",
      content: "content2",
      itemKey: "2",
      status: "showing",
    },
    {
      title: "title3",
      content: "content3",
      itemKey: "3",
      status: "showing",
    },
    {
      title: "title4",
      content: "content4",
      itemKey: "4",
      status: "showing",
    },
    {
      title: "title5",
      content: "content5",
      itemKey: "5",
      status: "showing",
    },
  ];

  onDeleteItem = (itemKey: string) => {
    const newNotes = this.notes.filter((item: itemDetail) => {
      console.log(item.itemKey, itemKey);
      return item.itemKey !== itemKey;
    });
    this.notes = newNotes;
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
    console.log("onConfirmUpdateItem", itemKey, valueTitle, valueContent);
    this.notes.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.title = valueTitle;
        item.content = valueContent;
        item.status = "showing";
      }
    });
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
      itemKey: "NewItem",
      status: "creating",
    };
    this.notes.unshift(newNode);
  };

  onDiscardCreateItem = (itemKey: string) => {
    if (this.notes[0].status === "creating") this.notes.shift();
  };

  onConfirmCreateItem = (
    itemKey: string,
    valueTitle: string,
    valueContent: string
  ) => {
    if (this.notes[0].status === "creating") {
      this.notes[0].title = valueTitle;
      this.notes[0].content = valueContent;
      this.notes[0].status = "showing";
    }
  };
}
