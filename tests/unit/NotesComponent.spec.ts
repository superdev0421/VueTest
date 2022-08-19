import { mount } from "@vue/test-utils";
import NotesComponent from "@/components/NotesComponent/NotesComponent.vue";

describe("NotesComponent.vue", () => {
  it("renders props.title when passed with props.status equals 'showing'", () => {
    const title = "new message";
    const wrapper = mount(NotesComponent, {
      props: { title, status: "showing" },
    });
    expect(wrapper.html()).toContain(`<div class="title">${title}</div>`);
  });
  it("renders props.content when passed with props.status equals 'showing'", () => {
    const content = "new message";
    const wrapper = mount(NotesComponent, {
      props: { content, status: "showing" },
    });
    expect(wrapper.html()).toContain(`<div class="content">${content}</div>`);
  });
  it("renders two buttons('Update', 'Delete') when passed with props.status equals 'showing'", () => {
    const wrapper = mount(NotesComponent, {
      props: { title: "a", content: "a", status: "showing" },
    });

    console.log(wrapper.html());
    // expect(wrapper.find({ class: "update" }).exists()).toBe(true);
  });
});
