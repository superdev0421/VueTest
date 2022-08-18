import { Options, Vue } from "vue-class-component";
import TitleComponent from "@/components/TitleComponent/TitleComponent.vue";
import NotesContainer from "@/components/NotesComponent/NotesComponent.vue";

interface itemDetail {
  title: string, 
  content: string, 
  itemKey: string, 
};

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
      itemKey: "item1",
    },
    {
      title: "title2",
      content: "content2",
      itemKey: "item2",
    },
    {
      title: "title3",
      content: "content3",
      itemKey: "item3",
    },
    {
      title: "title4",
      content: "content4",
      itemKey: "item4",
    },
    {
      title: "title5",
      content: "content5",
      itemKey: "item5",
    },
  ];

  onDeleteItem = (itemKey: string) => {
    console.log(itemKey);
    const newNotes = this.notes.filter((item: itemDetail) => {
      console.log(item.itemKey, itemKey);
       return item.itemKey !== itemKey
    });
    console.log(newNotes);
    this.notes = newNotes;
  }
}
