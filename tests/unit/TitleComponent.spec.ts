import { shallowMount } from "@vue/test-utils";
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
