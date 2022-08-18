import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class TitleComponent extends Vue {
  msg!: string;
}
