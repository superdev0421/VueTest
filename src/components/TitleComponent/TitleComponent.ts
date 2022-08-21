/*
==========================================
 Title:  TitleComponent.ts
 Date:   18 August 2022
==========================================
 */

// External Dependency
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class TitleComponent extends Vue {
  msg!: string;
}
