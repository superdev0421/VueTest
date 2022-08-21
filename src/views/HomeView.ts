/*
==========================================
 Title:  HomeView.ts
 Date:   18 August 2022
==========================================
*/

// External Dependency
import { Options, Vue } from "vue-class-component";
import { uuid } from "vue-uuid";

// Internal Dependency
import TitleComponent from "@/components/TitleComponent/TitleComponent.vue";
import NotesContainer from "@/components/NotesComponent/NotesComponent.vue";

// Interface of props
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

  //  LifeCycle: beforeMount
  beforeMount() {
    //  Get Data from LocalStorage
    const data = localStorage.getItem("notesData");

    if (data === null) {
      //  if there is no items in LocalStorage, initialize notes as empty array.
      this.notes = [];
    } else {
      //  if there is, initialize notes with that value
      this.notes = JSON.parse(data);
    }
  }

  //  Update LocalStorage Item with New Data
  updateLocalStorage = (newNotes: Array<itemDetail>) => {
    //  Get Existing Data
    const data = localStorage.getItem("notesData");

    if (data !== null) {
      //  If there is Data, Remove it.
      localStorage.removeItem("notesData");
    }

    //  Set new data to the LocalStorage
    localStorage.setItem("notesData", JSON.stringify(newNotes));
  };

  //  EventHandler of onClick event of Delete Button in each Item
  onDeleteItem = (itemKey: string) => {
    //  Delete item and get new Array
    const newNotes = this.notes.filter((item: itemDetail) => {
      return item.itemKey !== itemKey;
    });

    //  Set new Array to notes and store it to LocalStorage
    this.notes = newNotes;
    this.updateLocalStorage(this.notes);
  };

  //  EventHandler of onClick event of Update Button in each Item
  onUpdateItem = (itemKey: string) => {
    if (
      this.notes.filter((item) => {
        return item.status === "creating" || item.status === "editing";
      }).length >= 1
    ) {
      //  If there is updating item, alert is and ignore it
      alert("Only one item can be updated at once.");
      return;
    }

    //  Change the status of requested item
    this.notes.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.status = "editing";
      }
      return item;
    });
  };

  //  EventHandler of onClick event of Discard Button in Item of updating status
  onDiscardUpdateItem = (itemKey: string) => {
    //  Change the status of item
    this.notes.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.status = "showing";
      }
      return item;
    });
  };

  //  EventHandler of onClick event of Confirm Button in Item of updating status
  onConfirmUpdateItem = (
    itemKey: string,
    valueTitle: string,
    valueContent: string
  ) => {
    // Validation
    if (valueTitle === "") {
      alert("You have to input the title of the note.");
      return;
    } else if (valueContent === "") {
      alert("You have to input the content of the note.");
      return;
    }

    //  Update Data of item
    this.notes.forEach((item) => {
      if (item.itemKey === itemKey) {
        item.title = valueTitle;
        item.content = valueContent;
        item.status = "showing";
      }
    });

    //  Store data to LocalStorage
    this.updateLocalStorage(this.notes);
  };

  //  EventHandler of onClick event of Create Button
  onCreateItem = () => {
    if (
      this.notes.filter((item) => {
        return item.status === "creating" || item.status === "editing";
      }).length > 0
    ) {
      //  If there are some changing item, alert it and ignore the request
      alert("Only one item can be created at once.");
      return;
    }

    //  Create new note and insert it to the notes array
    const newNode: itemDetail = {
      title: "",
      content: "",
      itemKey: uuid.v4(),
      status: "creating",
    };
    this.notes.unshift(newNode);
  };

  //  EventHandler of onClick event of Discard Button of Creating status
  onDiscardCreateItem = () => {
    //  Delete the first item
    if (this.notes[0].status === "creating") {
      this.notes.shift();
    }
  };

  //  EventHandler of onClick event of Confirm Button of Creating status
  onConfirmCreateItem = (
    itemKey: string,
    valueTitle: string,
    valueContent: string
  ) => {
    //  Validation
    if (valueTitle === "") {
      alert("You have to input the title of note.");
      return;
    } else if (valueContent === "") {
      alert("You have to input the content of note.");
      return;
    }

    if (
      this.notes[0].status === "creating" &&
      this.notes[0].itemKey === itemKey
    ) {
      //  Update the data of creating itme.
      this.notes[0].title = valueTitle;
      this.notes[0].content = valueContent;
      this.notes[0].status = "showing";
    }

    //  Store data to LocalStorage
    this.updateLocalStorage(this.notes);
  };
}
