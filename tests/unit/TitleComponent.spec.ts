// ==========================================
//  Title:  NotesComponent.spec.ts
//  Date:   19 August 2022
// ==========================================

//  External Dependency
import { shallowMount } from "@vue/test-utils";

//  Internal Dependency
import TitleComponent from "@/components/TitleComponent/TitleComponent";

describe("TitleComponent.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(TitleComponent, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
